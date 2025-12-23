import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { renderIntakeEmail, renderBookingEmail } from '@/lib/emailTemplate';
import Holidays from 'date-holidays';

// OAuth 2.0 Client configuration
const getOAuthClient = () => {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing OAuth client environment variables');
  }
  return new OAuth2Client(clientId, clientSecret, redirectUri);
};

// Initialize Google Sheets API (prioritize Cookie, fallback to environment variables)
const initializeSheets = async () => {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get('gs_refresh_token')?.value;
  const envToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const refreshToken = cookieToken || envToken;
  if (!refreshToken) {
    throw new Error('Missing refresh token. Authorize via /api/auth/google/start or set GOOGLE_OAUTH_REFRESH_TOKEN');
  }
  const oAuth = getOAuthClient();
  oAuth.setCredentials({ refresh_token: refreshToken });
  return google.sheets({ version: 'v4', auth: oAuth });
};

// Get spreadsheet ID
const getSpreadsheetId = () => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID environment variable');
  }
  return spreadsheetId;
};

// Normalize boolean availability values
const normalizeIsTrue = (val: unknown): boolean => {
  if (typeof val === 'boolean') return val;
  if (val == null) return false;
  const s = String(val).trim().toUpperCase();
  return s === 'TRUE' || s === 'YES' || s === 'Y' || s === '1';
};

// Normalize various date representations to YYYY-MM-DD (zero-padded)
const normalizeDateStr = (val: unknown): string => {
  if (!val) return '';
  let s = String(val).trim();
  // Unify separators
  s = s.replace(/\./g, '-').replace(/\//g, '-');
  const parts = s.split('-').map(p => p.trim());
  if (parts.length !== 3) return s;
  // Could be DD-MM-YYYY or YYYY-MM-DD
  let y: number, m: number, d: number;
  if (parts[0].length === 4) {
    // YYYY-M-D
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10);
    d = parseInt(parts[2], 10);
  } else if (parts[2].length === 4) {
    // D-M-YYYY or DD-MM-YYYY
    y = parseInt(parts[2], 10);
    m = parseInt(parts[1], 10);
    d = parseInt(parts[0], 10);
  } else {
    // Fallback: keep original
    return s;
  }
  if (!y || !m || !d) return s;
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};

// Check if a date is an Australian public holiday
const isAustralianHoliday = (date: Date): boolean => {
  try {
    const hd = new Holidays('AU');
    const holidays = hd.getHolidays(date.getFullYear());
    const dateStr = normalizeDateStr(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    
    for (const holiday of holidays) {
      const holidayDate = new Date(holiday.date);
      const holidayStr = normalizeDateStr(`${holidayDate.getFullYear()}-${holidayDate.getMonth() + 1}-${holidayDate.getDate()}`);
      if (holidayStr === dateStr) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error checking Australian holidays:', error);
    return false;
  }
};

// Check if date is Monday to Saturday (0 = Sunday, 6 = Saturday)
const isWeekday = (date: Date): boolean => {
  const day = date.getDay();
  return day >= 1 && day <= 6; // Monday (1) to Saturday (6)
};

// Unified slot availability checker - single source of truth
interface SlotData {
  date: string;
  timeSlot: string;
  isAvailable: boolean;
  maxCapacity: number;
  currentBookings: number;
}

const isSlotAvailable = (slot: SlotData, minBookingTime: Date): boolean => {
  // 1. Must be available (is_available = TRUE) - CRITICAL CHECK FIRST
  if (!slot.isAvailable) {
    console.log(`[isSlotAvailable] REJECTED: is_available=FALSE for ${slot.date} ${slot.timeSlot}`);
    return false;
  }
  
  // 2. Must have valid capacity and bookings
  if (!Number.isFinite(slot.maxCapacity) || slot.maxCapacity <= 0) {
    console.log(`[isSlotAvailable] REJECTED: invalid maxCapacity=${slot.maxCapacity} for ${slot.date} ${slot.timeSlot}`);
    return false;
  }
  if (!Number.isFinite(slot.currentBookings) || slot.currentBookings < 0) {
    console.log(`[isSlotAvailable] REJECTED: invalid currentBookings=${slot.currentBookings} for ${slot.date} ${slot.timeSlot}`);
    return false;
  }
  
  // 3. Must have space (current_bookings < max_capacity) - CRITICAL CHECK
  if (slot.currentBookings >= slot.maxCapacity) {
    console.log(`[isSlotAvailable] REJECTED: no space (${slot.currentBookings} >= ${slot.maxCapacity}) for ${slot.date} ${slot.timeSlot}`);
    return false;
  }
  
  // 4. Parse time slot to get start time
  const cleanedTime = slot.timeSlot.replace(/[\u00A0\s]+/g, ' ').trim().replace(/[–—−﹣－]/g, '-');
  const [start] = cleanedTime.includes('-') ? cleanedTime.split('-') : [cleanedTime];
  const [startHour, startMin] = start.split(':').map(Number);
  
  // 5. Must be within operating hours (10:00 to 18:00)
  if (!Number.isFinite(startHour) || !Number.isFinite(startMin)) return false;
  if (startHour < 10 || startHour >= 18) return false;
  
  // 6. Must be at least 24 hours from now
  const slotDateTime = new Date(slot.date);
  slotDateTime.setHours(startHour, startMin, 0, 0);
  if (slotDateTime < minBookingTime) return false;
  
  return true;
};

// Parse and normalize slot data from Google Sheets row
const parseSlotRow = (row: unknown[]): SlotData | null => {
  if (!row || row.length < 5) return null;
  
  const date = normalizeDateStr(row[0]);
  if (!date) return null;
  
  const timeSlot = String(row[1] || '').trim();
  const isAvailableRaw = row[2];
  const isAvailable = normalizeIsTrue(isAvailableRaw);
  const maxCapacityRaw = String(row[3] || '').trim();
  const currentBookingsRaw = String(row[4] || '').trim();
  const maxCapacity = parseInt(maxCapacityRaw, 10);
  const currentBookings = parseInt(currentBookingsRaw, 10);
  
  // Debug: Log problematic slots
  if (date === '2025-11-10' && (timeSlot.includes('10:00') || timeSlot.includes('10:30'))) {
    console.log(`[parseSlotRow] Parsed slot: date=${date}, time=${timeSlot}, isAvailableRaw=${isAvailableRaw} (${typeof isAvailableRaw}), isAvailable=${isAvailable}, maxCapacity=${maxCapacity} (raw: ${maxCapacityRaw}), currentBookings=${currentBookings} (raw: ${currentBookingsRaw})`);
  }
  
  return { date, timeSlot, isAvailable, maxCapacity, currentBookings };
};

// Get available dates for the next N weeks (Monday to Saturday, excluding holidays)
async function getAvailableDates(weeks: number = 4) {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'time_slots!A:E',
    });

    const rows = response.data.values || [];
    console.log(`[getAvailableDates] Reading from time_slots table: ${rows.length} total rows (including header)`);
    
    // Debug: Log raw rows for 2025-11-10
    const rawTestRows = rows.filter((row, idx) => idx > 0 && String(row[0] || '').includes('2025-11-10'));
    if (rawTestRows.length > 0) {
      console.log(`[getAvailableDates] Raw rows for 2025-11-10 from Google Sheets:`, rawTestRows.map((row, idx) => ({
        rowIndex: idx + 2,
        date: row[0],
        time: row[1],
        isAvailable: row[2],
        maxCapacity: row[3],
        currentBookings: row[4]
      })));
    }
    
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Parse and filter available slots using unified function
    const parsedSlots = rows
      .slice(1) // Skip header
      .map(parseSlotRow)
      .filter((slot): slot is SlotData => slot !== null);
    
    console.log(`[getAvailableDates] Parsed ${parsedSlots.length} slots from ${rows.length - 1} rows`);
    
    // Debug: Log parsed slots for 2025-11-10
    const testDateSlots = parsedSlots.filter(s => s.date === '2025-11-10');
    if (testDateSlots.length > 0) {
      console.log(`[getAvailableDates] Found ${testDateSlots.length} parsed slots for 2025-11-10:`, testDateSlots.map(s => ({
        time: s.timeSlot,
        isAvailable: s.isAvailable,
        maxCapacity: s.maxCapacity,
        currentBookings: s.currentBookings,
        hasSpace: s.currentBookings < s.maxCapacity
      })));
    }
    
    const availableSlots = parsedSlots.filter(slot => isSlotAvailable(slot, minBookingTime));
    
    // Debug: Log filtered slots for 2025-11-10
    const testDateAvailable = availableSlots.filter(s => s.date === '2025-11-10');
    if (testDateAvailable.length > 0) {
      console.log(`[getAvailableDates] After filtering, ${testDateAvailable.length} available slots for 2025-11-10:`, testDateAvailable.map(s => s.timeSlot));
    } else if (testDateSlots.length > 0) {
      console.log(`[getAvailableDates] ⚠️ All ${testDateSlots.length} slots for 2025-11-10 were filtered out`);
    }

    // Count unique slots per date (using date + start time as composite key to handle duplicates)
    // This ensures that even if Google Sheets has duplicate rows, we only count each unique time slot once per date
    const dateMap = availableSlots.reduce((acc, slot) => {
      const cleanedTime = slot.timeSlot.replace(/[\u00A0\s]+/g, ' ').trim().replace(/[–—−﹣－]/g, '-');
      const [start] = cleanedTime.includes('-') ? cleanedTime.split('-') : [cleanedTime];
      
      if (!acc[slot.date]) {
        acc[slot.date] = new Set<string>();
      }
      // Use Set to automatically handle duplicates - same date + time will only be added once
      acc[slot.date].add(start);
      return acc;
    }, {} as Record<string, Set<string>>);
    
    // Debug: Log if we found duplicates
    const totalSlotsBeforeDedup = availableSlots.length;
    const totalSlotsAfterDedup = Object.values(dateMap).reduce((sum, set) => sum + set.size, 0);
    if (totalSlotsBeforeDedup > totalSlotsAfterDedup) {
      console.log(`[getAvailableDates] ⚠️ Found ${totalSlotsBeforeDedup - totalSlotsAfterDedup} duplicate slots in Google Sheets data`);
    }

    // Generate dates for the next N weeks
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (weeks * 7));

    const availableDates: Array<{ date: string; hasSlots: boolean; slotCount: number }> = [];
    const currentDate = new Date(today);
    
    while (currentDate <= endDate) {
      if (isWeekday(currentDate) && !isAustralianHoliday(currentDate)) {
        const dateTime = new Date(currentDate);
        dateTime.setHours(10, 0, 0, 0);
        
        if (dateTime >= minBookingTime) {
          const dateStr = normalizeDateStr(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
          const uniqueSlots = dateMap[dateStr];
          const slotCount = uniqueSlots ? uniqueSlots.size : 0;
          
          // Debug: Log final count for 2025-11-10
          if (dateStr === '2025-11-10') {
            console.log(`[getAvailableDates] Final result for ${dateStr}: slotCount=${slotCount}, uniqueSlots in map:`, uniqueSlots ? Array.from(uniqueSlots) : 'none');
          }
          
          availableDates.push({
            date: dateStr,
            hasSlots: slotCount > 0,
            slotCount,
          });
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      success: true,
      dates: availableDates,
      total: availableDates.length,
    };
  } catch (error) {
    console.error('Error getting available dates:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Check available time slots
async function checkAvailability(date: string) {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    // Read time slot data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'time_slots!A:E', // Assume time slot data is in time_slots worksheet
    });

    const rows = response.data.values || [];
    const availableSlots = [];
    const debugInfo = []; // Debug information

    // Normalize input date (supports YYYY-MM-DD and YYYY/MM/DD formats)
    const normalizedDate = normalizeDateStr(date);

    // Skip header row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 5) continue;

      // Normalize row date format
      const rowDate = normalizeDateStr(row[0]);

      const timeSlot = row[1];
      const isAvailableRaw = row[2];
      const isAvailable = normalizeIsTrue(isAvailableRaw);
      const maxCapacity = parseInt(row[3]) || 1;
      const currentBookings = parseInt(row[4]) || 0;
      const hasSpace = currentBookings < maxCapacity;

      // Collect debug info for first 5 rows or matching dates
      if (i <= 5 || rowDate === normalizedDate) {
        debugInfo.push({
          row: i + 1,
          rawDate: row[0],
          normalizedDate: rowDate,
          timeSlot: timeSlot,
          isAvailableRaw: isAvailableRaw,
          isAvailable: isAvailable,
          maxCapacity: maxCapacity,
          currentBookings: currentBookings,
          matchesDate: rowDate === normalizedDate,
          hasSpace: hasSpace
        });
      }

      // Check date match and availability
      if (rowDate === normalizedDate && isAvailable && hasSpace) {
        availableSlots.push(timeSlot);
      }
    }

    // trimmed debug log

    return {
      success: true,
      available_slots: availableSlots,
      date: date,
      total_slots: availableSlots.length,
      debug: debugInfo // Include debug information
    };

  } catch (error) {
    console.error('Error checking availability:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    };
  }
}

// Monthly aggregated availability
async function monthAvailability(year: number, month: number) {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

  const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'time_slots!A:E',
    });

    const rows = response.data.values || [];
    const map: Record<string, { count: number; hasSlots: boolean }> = {};

  for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length < 5) continue;
      const rowDate = normalizeDateStr(row[0]);
      if (!rowDate) continue;
      const d = new Date(rowDate);
      if (isNaN(d.getTime())) continue;
      const yy = d.getFullYear();
      const mm = d.getMonth() + 1;
      if (yy !== year || mm !== month) continue;

    const isAvailableRaw = row[2];
    const isAvailable = normalizeIsTrue(isAvailableRaw);
      const maxCapacity = parseInt(row[3]) || 1;
      const currentBookings = parseInt(row[4]) || 0;
      const hasSpace = isAvailable && currentBookings < maxCapacity;

      if (!map[rowDate]) map[rowDate] = { count: 0, hasSlots: false };
      if (hasSpace) {
        map[rowDate].count += 1;
        map[rowDate].hasSlots = true;
      }
    }

    const list = Object.entries(map).map(([date, agg]) => ({ date, hasSlots: agg.hasSlots, count: agg.count }));

    return { success: true, year, month, days: list };
  } catch (error) {
    console.error('Error month availability:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Daily available time slots (structured)
async function dayAvailability(date: string) {
  try {
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const normalizedDate = normalizeDateStr(date);
    const appointmentDate = new Date(normalizedDate);
    appointmentDate.setHours(10, 0, 0, 0);
    
    if (appointmentDate < minBookingTime) {
      return {
        success: false,
        error: 'Appointments must be booked at least 24 hours in advance.',
        slots: [],
        available_slots: []
      };
    }

    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'time_slots!A:E',
    });

    const rows = response.data.values || [];
    console.log(`[dayAvailability] Reading from time_slots table: ${rows.length} total rows (including header)`);
    
    // Debug: Log ALL raw rows that might match the date
    const rawMatchingRows = rows
      .slice(1)
      .map((row, idx) => ({ rowIndex: idx + 2, row, rawDate: String(row[0] || ''), normalizedDate: normalizeDateStr(row[0]) }))
      .filter(r => r.normalizedDate === normalizedDate || r.rawDate.includes('2025-11-10') || r.rawDate.includes('10/11/2025'));
    
    if (rawMatchingRows.length > 0) {
      console.log(`[dayAvailability] Raw rows that might match ${normalizedDate}:`, rawMatchingRows.map(r => ({
        rowIndex: r.rowIndex,
        rawDate: r.rawDate,
        normalizedDate: r.normalizedDate,
        time: r.row[1],
        isAvailable: r.row[2],
        maxCapacity: r.row[3],
        currentBookings: r.row[4],
        matches: r.normalizedDate === normalizedDate
      })));
    }

    // Parse all slots first
    const parsedSlots = rows
      .slice(1) // Skip header
      .map(parseSlotRow)
      .filter((slot): slot is SlotData => slot !== null)
      .filter(slot => slot.date === normalizedDate);
    
    console.log(`[dayAvailability] Parsed ${parsedSlots.length} slots matching date ${normalizedDate} from ${rows.length - 1} total rows`);
    
    // Debug: Log parsed slots for the requested date
    if (parsedSlots.length > 0) {
      console.log(`[dayAvailability] Found ${parsedSlots.length} parsed slots for ${normalizedDate}:`, parsedSlots.map(s => ({
        time: s.timeSlot,
        isAvailable: s.isAvailable,
        maxCapacity: s.maxCapacity,
        currentBookings: s.currentBookings,
        hasSpace: s.currentBookings < s.maxCapacity
      })));
    } else {
      console.log(`[dayAvailability] ⚠️ No parsed slots found for ${normalizedDate}! Check date format matching.`);
    }
    
    // Filter using unified function - THIS IS THE KEY FILTER
    const availableSlots = parsedSlots
      .filter(slot => isSlotAvailable(slot, minBookingTime))
      .map(slot => {
        const cleanedTime = slot.timeSlot.replace(/[\u00A0\s]+/g, ' ').trim().replace(/[–—−﹣－]/g, '-');
        const [start, end] = cleanedTime.includes('-') ? cleanedTime.split('-') : [cleanedTime, ''];
        return { start, end, value: start };
      })
      .filter((slot, index, self) => {
        // Remove duplicates by start time - ensure each time slot appears only once
        // This handles duplicate rows in Google Sheets
        const firstIndex = self.findIndex(s => s.start === slot.start);
        if (index !== firstIndex) {
          console.log(`[dayAvailability] Removing duplicate slot: ${slot.start} (found at index ${index}, first at ${firstIndex})`);
        }
        return index === firstIndex;
      })
      .sort((a, b) => {
        const [aHour, aMin] = a.start.split(':').map(Number);
        const [bHour, bMin] = b.start.split(':').map(Number);
        return aHour !== bHour ? aHour - bHour : aMin - bMin;
      });
    
    // Debug: Log final result
    console.log(`[dayAvailability] After filtering, ${availableSlots.length} available slots for ${normalizedDate}:`, availableSlots.map(s => s.value));
    if (parsedSlots.length > availableSlots.length) {
      console.log(`[dayAvailability] Filtered out ${parsedSlots.length - availableSlots.length} slots`);
    }

    const available_slots = availableSlots.map(s => `${s.start}${s.end ? '-' + s.end : ''}`);
    return { success: true, slots: availableSlots, available_slots };
  } catch (error) {
    console.error('Error day availability:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Book appointment
async function bookAppointment(data: Record<string, unknown>) {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    // Validate required fields
    const requiredFields = ['customer_name', 'customer_email', 'customer_phone', 'appointment_date', 'appointment_time', 'concern'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return {
          success: false,
          error: `Missing required field: ${field}`
        };
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof data.customer_email !== 'string' || !emailRegex.test(data.customer_email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    // Validate 24-hour advance booking requirement
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
    const appointmentDateStr = String(data.appointment_date || '').trim();
    const appointmentTimeStr = String(data.appointment_time || '').trim();
    const normalizedDate = normalizeDateStr(appointmentDateStr);
    const appointmentDateTime = new Date(normalizedDate);
    
    // Parse time (HH:MM format)
    const [hours, minutes] = appointmentTimeStr.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      appointmentDateTime.setHours(hours, minutes, 0, 0);
    } else {
      appointmentDateTime.setHours(10, 0, 0, 0); // Default to earliest slot if time parsing fails
    }
    
    if (appointmentDateTime < minBookingTime) {
      return {
        success: false,
        error: 'Appointments must be booked at least 24 hours in advance. Please select a later date and time.'
      };
    }

    // First check if time slot still has space (prevent race conditions)
    const timeSlotsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'time_slots!A:E',
    });

    const timeSlotsRows = timeSlotsResponse.data.values || [];
    let timeSlotRowIndex = -1;

    // Normalize appointment date and time
    const normalizedAppointmentDate = normalizeDateStr(String(data.appointment_date || '').trim());
    const normalizedAppointmentTime = String(data.appointment_time || '').trim().replace(/[\u00A0\s]+/g, ' ');

    for (let i = 1; i < timeSlotsRows.length; i++) {
      const row = timeSlotsRows[i];
      if (row.length < 5) continue;
      
      // Normalize row date and time to match
      const rowDate = normalizeDateStr(row[0]);
      let rowTime = String(row[1] || '').replace(/[\u00A0\s]+/g, ' ').trim();
      rowTime = rowTime.replace(/[–—−﹣－]/g, '-');

      if (rowDate === normalizedAppointmentDate && rowTime === normalizedAppointmentTime) {
        timeSlotRowIndex = i + 1; // Google Sheets uses 1-based indexing
        break;
      }
    }

    // trimmed debug log

    // Check if time slot exists
    if (timeSlotRowIndex === -1) {
      return {
        success: false,
        error: 'Time slot not found'
      };
    }

    // Check if there is still space
    const currentBookings = parseInt(timeSlotsRows[timeSlotRowIndex - 1][4]) || 0;
    const maxCapacity = parseInt(timeSlotsRows[timeSlotRowIndex - 1][3]) || 1;

    if (currentBookings >= maxCapacity) {
      return {
        success: false,
        error: 'This time slot is no longer available. Please select another time.'
      };
    }

    // Ensure bookings worksheet exists
    await ensureWorksheet(sheets, spreadsheetId, 'bookings', [
      'appointment_id',
      'customer_name',
      'customer_email',
      'customer_phone',
      'appointment_date',
      'appointment_time',
      'status',
      'concern',
      'message',
      'created_at',
      'updated_at'
    ]);

    // Generate unique appointment ID
    const appointmentId = 'APT_' + Math.random().toString(36).substr(2, 8).toUpperCase();

    // Add appointment to bookings worksheet (new table, separate from old appointments)
    const appointmentRow = [
      appointmentId,
      data.customer_name,
      data.customer_email,
      data.customer_phone,
      data.appointment_date,
      data.appointment_time,
      'pending',
      data.concern,
      data.message || '',
      new Date().toISOString(),
      new Date().toISOString()
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'bookings!A:K',
      valueInputOption: 'RAW',
      requestBody: {
        values: [appointmentRow]
      }
    });

    // Update booking count
    const newCount = currentBookings + 1;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `time_slots!E${timeSlotRowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[newCount]]
      }
    });

    // If reaching max capacity, set is_available to FALSE
    if (newCount >= maxCapacity) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `time_slots!C${timeSlotRowIndex}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['FALSE']]
        }
      });
    }

    // Send notification email via Gmail API
    // In Vercel, we need to await this to ensure it completes before the function ends
    let emailSent = false;
    let emailError: string | undefined;
    
    try {
      const gmailClientId = process.env.GMAIL_CLIENT_ID;
      const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
      const gmailRedirectUri = process.env.GMAIL_OAUTH_REDIRECT_URI || process.env.GMAIL_REDIRECT_URI;
      const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;
      const gmailUser = process.env.GMAIL_USER;
      const mailTo = process.env.SMTP_TO || 'info@winda.com.au';
      const mailFrom = process.env.SMTP_FROM || (gmailUser || 'no-reply@klinikka.local');

      // Check if all required env vars are present
      const hasAllEnvVars = !!(gmailClientId && gmailClientSecret && gmailRedirectUri && gmailRefreshToken && gmailUser);
      
      if (!hasAllEnvVars) {
        const missingVars = [];
        if (!gmailClientId) missingVars.push('GMAIL_CLIENT_ID');
        if (!gmailClientSecret) missingVars.push('GMAIL_CLIENT_SECRET');
        if (!gmailRedirectUri) missingVars.push('GMAIL_REDIRECT_URI or GMAIL_OAUTH_REDIRECT_URI');
        if (!gmailRefreshToken) missingVars.push('GMAIL_REFRESH_TOKEN');
        if (!gmailUser) missingVars.push('GMAIL_USER');
        console.warn(`[Email] Missing environment variables: ${missingVars.join(', ')}. Email will not be sent.`);
      } else {
        try {
          const oauth2Client = new google.auth.OAuth2(
            gmailClientId,
            gmailClientSecret,
            gmailRedirectUri
          );
          oauth2Client.setCredentials({ refresh_token: gmailRefreshToken });

          const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

          const subject = `[Klinikka] New Appointment Booking - ${appointmentId}`;
          const relatedBoundary = `----=_Rel_${Date.now()}`;
          const alternativeBoundary = `----=_Alt_${Date.now()}`;
          let logoCid: string | undefined = 'logo@klinikka';

          // Inline image attachment as CID (attempt to load it first)
          // In Vercel, we can't reliably read from filesystem, so we'll skip logo if it fails
          let logoBase64 = '';
          try {
            const path = await import('path');
            const fs = await import('fs/promises');
            const publicDir = path.join(process.cwd(), 'public');
            const logoPath = path.join(publicDir, 'logo.png');
            const buf = await fs.readFile(logoPath);
            logoBase64 = buf.toString('base64');
            console.log(`[Email] Logo loaded successfully (${logoBase64.length} bytes)`);
          } catch (logoErr) {
            console.warn(`[Email] Could not load logo.png: ${logoErr instanceof Error ? logoErr.message : String(logoErr)}. Email will be sent without logo.`);
            logoCid = undefined;
          }

          if (!logoBase64) {
            logoCid = undefined;
          }

          // Render HTML email
          const html = renderBookingEmail({
            customerName: String(data.customer_name || ''),
            email: String(data.customer_email || ''),
            phone: String(data.customer_phone || ''),
            appointmentDate: String(data.appointment_date || ''),
            appointmentTime: String(data.appointment_time || ''),
            concern: String(data.concern || ''),
            message: String(data.message || ''),
            appointmentId: appointmentId,
            logoCid,
          });

          const lines = [
            `From: ${mailFrom}`,
            `To: ${mailTo}`,
            `Subject: ${subject}`,
            'MIME-Version: 1.0',
            `Content-Type: multipart/related; boundary="${relatedBoundary}"`,
            '',
            `--${relatedBoundary}`,
            `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
            '',
            `--${alternativeBoundary}`,
            'Content-Type: text/plain; charset="UTF-8"',
            '',
            'New Appointment Booking',
            `Appointment ID: ${appointmentId}`,
            `Customer Name: ${String(data.customer_name || '')}`,
            `Email: ${String(data.customer_email || '')}`,
            `Phone: ${String(data.customer_phone || '')}`,
            `Appointment Date: ${String(data.appointment_date || '')}`,
            `Appointment Time: ${String(data.appointment_time || '')}`,
            `Concern: ${String(data.concern || '')}`,
            ...(data.message ? [`Message: ${String(data.message || '')}`] : []),
            `--${alternativeBoundary}`,
            'Content-Type: text/html; charset="UTF-8"',
            '',
            html,
            `--${alternativeBoundary}--`,
          ];

          const mimeParts = logoBase64
            ? [
                ...lines,
                `--${relatedBoundary}`,
                'Content-Type: image/png; name="logo.png"',
                'Content-Transfer-Encoding: base64',
                `Content-ID: <${logoCid}>`,
                'Content-Disposition: inline; filename="logo.png"',
                '',
                logoBase64,
                `--${relatedBoundary}--`,
              ]
            : [
                ...lines,
                `--${relatedBoundary}--`,
              ];

          const raw = Buffer.from(mimeParts.join('\r\n'))
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

          console.log(`[Email] Attempting to send email for appointment ${appointmentId} to ${mailTo}...`);
          const sendResult = await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw },
          });
          
          emailSent = true;
          console.log(`[Email] ✅ Email sent successfully for appointment ${appointmentId}. Message ID: ${sendResult.data.id || 'N/A'}`);
        } catch (mailErr) {
          emailError = mailErr instanceof Error ? mailErr.message : String(mailErr);
          console.error(`[Email] ❌ Failed to send email for appointment ${appointmentId}:`, {
            error: emailError,
            stack: mailErr instanceof Error ? mailErr.stack : undefined,
            appointmentId,
            mailTo,
            mailFrom
          });
        }
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err);
      console.error(`[Email] ❌ Unexpected error in email sending process:`, emailError);
    }
    
    // Log email status (but don't fail the appointment booking if email fails)
    if (!emailSent && emailError) {
      console.warn(`[Email] ⚠️ Appointment ${appointmentId} was saved but email notification failed: ${emailError}`);
    }

    return {
      success: true,
      appointment_id: appointmentId,
      message: 'Appointment booked successfully'
    };

  } catch (error) {
    console.error('Error booking appointment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Intake form submission (does not occupy time slot)
async function bookIntake(data: Record<string, unknown>) {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'date_of_birth', 'customer_email', 'customer_phone', 'concerns'];
    for (const field of requiredFields) {
      if (!data[field] || (field === 'concerns' && (!Array.isArray(data.concerns) || data.concerns.length === 0))) {
        return { success: false, error: `Missing required field: ${field}` };
      }
    }

    // Email and Australian phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const auPhoneRegex = /^(\+61|0)[2-478]\d{8}$/;
    if (typeof data.customer_email !== 'string' || !emailRegex.test(String(data.customer_email))) {
      return { success: false, error: 'Invalid email format' };
    }
    if (typeof data.customer_phone !== 'string' || !auPhoneRegex.test(String(data.customer_phone).replace(/\s+/g, ''))) {
      return { success: false, error: 'Invalid AU phone number' };
    }

    // Ensure appointments worksheet exists (for old intake system)
    await ensureWorksheet(sheets, spreadsheetId, 'appointments', [
      'created_at',
      'first_name',
      'last_name',
      'date_of_birth',
      'customer_email',
      'customer_phone',
      'concerns',
      'enquiries',
      'is_first_time',
      'duration_minutes',
      'deposit_required'
    ]);

    const concerns = (data.concerns as unknown[]).map(String).join('; ');
    const duration = typeof data.duration_minutes === 'number' ? data.duration_minutes
      : parseInt(String(data.duration_minutes || ''), 10);
    const depositRequired = Number.isFinite(duration) && duration > 45 ? 'YES' : 'NO';
    const row = [
      new Date().toISOString(),
      String(data.first_name || ''),
      String(data.last_name || ''),
      String(data.date_of_birth || ''),
      String(data.customer_email || ''),
      String(data.customer_phone || ''),
      concerns,
      String(data.enquiries || ''),
      String((data.is_first_time as boolean) ? 'YES' : 'NO'),
      Number.isFinite(duration) ? String(duration) : '',
      depositRequired,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'appointments!A:K',
      valueInputOption: 'RAW',
      requestBody: { values: [row] }
    });

    // Send notification email via Gmail API
    // In Vercel, we need to await this to ensure it completes before the function ends
    let emailSent = false;
    let emailError: string | undefined;
    const referenceId = 'APT_' + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    try {
      const gmailClientId = process.env.GMAIL_CLIENT_ID;
      const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
      const gmailRedirectUri = process.env.GMAIL_OAUTH_REDIRECT_URI || process.env.GMAIL_REDIRECT_URI;
      const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;
      const gmailUser = process.env.GMAIL_USER;
      const mailTo = process.env.SMTP_TO || 'info@winda.com.au';
      const mailFrom = process.env.SMTP_FROM || (gmailUser || 'no-reply@klinikka.local');

      // Check if all required env vars are present
      const hasAllEnvVars = !!(gmailClientId && gmailClientSecret && gmailRedirectUri && gmailRefreshToken && gmailUser);
      
      if (!hasAllEnvVars) {
        const missingVars = [];
        if (!gmailClientId) missingVars.push('GMAIL_CLIENT_ID');
        if (!gmailClientSecret) missingVars.push('GMAIL_CLIENT_SECRET');
        if (!gmailRedirectUri) missingVars.push('GMAIL_REDIRECT_URI or GMAIL_OAUTH_REDIRECT_URI');
        if (!gmailRefreshToken) missingVars.push('GMAIL_REFRESH_TOKEN');
        if (!gmailUser) missingVars.push('GMAIL_USER');
        console.warn(`[Email] Missing environment variables: ${missingVars.join(', ')}. Email will not be sent.`);
      } else {
        try {
          const oauth2Client = new google.auth.OAuth2(
            gmailClientId,
            gmailClientSecret,
            gmailRedirectUri
          );
          oauth2Client.setCredentials({ refresh_token: gmailRefreshToken });

          const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

          const subject = `[Klinikka] New Appointment - ${referenceId}`;
          const relatedBoundary = `----=_Rel_${Date.now()}`;
          const alternativeBoundary = `----=_Alt_${Date.now()}`;
          let logoCid: string | undefined = 'logo@klinikka';
          const concernsStr = Array.isArray(data.concerns) ? (data.concerns as unknown[]).map(String).join('; ') : String(data.concerns || '');

          // Inline image attachment as CID (attempt to load it first)
          // In Vercel, we can't reliably read from filesystem, so we'll skip logo if it fails
          let logoBase64 = '';
          try {
            const path = await import('path');
            const fs = await import('fs/promises');
            const publicDir = path.join(process.cwd(), 'public');
            const logoPath = path.join(publicDir, 'logo.png');
            const buf = await fs.readFile(logoPath);
            logoBase64 = buf.toString('base64');
            console.log(`[Email] Logo loaded successfully (${logoBase64.length} bytes)`);
          } catch (logoErr) {
            console.warn(`[Email] Could not load logo.png: ${logoErr instanceof Error ? logoErr.message : String(logoErr)}. Email will be sent without logo.`);
            logoCid = undefined;
          }

          if (!logoBase64) {
            logoCid = undefined;
          }

          // Now render HTML, passing logoCid only if CID is available
          const html = renderIntakeEmail({
            firstName: String(data.first_name || ''),
            lastName: String(data.last_name || ''),
            dateOfBirth: String(data.date_of_birth || ''),
            email: String(data.customer_email || ''),
            phone: String(data.customer_phone || ''),
            concerns: concernsStr,
            enquiries: String(data.enquiries || ''),
            isFirstTime: !!data.is_first_time,
            durationMinutes: Number.isFinite(duration) ? duration : undefined,
            depositRequired: depositRequired === 'YES',
            logoCid,
          });

          const lines = [
            `From: ${mailFrom}`,
            `To: ${mailTo}`,
            `Subject: ${subject}`,
            'MIME-Version: 1.0',
            `Content-Type: multipart/related; boundary="${relatedBoundary}"`,
            '',
            `--${relatedBoundary}`,
            `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
            '',
            `--${alternativeBoundary}`,
            'Content-Type: text/plain; charset="UTF-8"',
            '',
            'New Intake Submitted',
            `First Name: ${String(data.first_name || '')}`,
            `Last Name: ${String(data.last_name || '')}`,
            `Date of Birth: ${String(data.date_of_birth || '')}`,
            `Email: ${String(data.customer_email || '')}`,
            `Phone: ${String(data.customer_phone || '')}`,
            `Concerns: ${concernsStr}`,
            `First Time: ${!!data.is_first_time ? 'YES' : 'NO'}`,
            `Duration (min): ${Number.isFinite(duration) ? String(duration) : ''}`,
            `Deposit Required: ${depositRequired}`,
            '',
            `Enquiries:`,
            `${String(data.enquiries || '')}`,
            `--${alternativeBoundary}`,
            'Content-Type: text/html; charset="UTF-8"',
            '',
            html,
            `--${alternativeBoundary}--`,
          ];

          const mimeParts = logoBase64
            ? [
                ...lines,
                `--${relatedBoundary}`,
                'Content-Type: image/png; name="logo.png"',
                'Content-Transfer-Encoding: base64',
                `Content-ID: <${logoCid}>`,
                'Content-Disposition: inline; filename="logo.png"',
                '',
                logoBase64,
                `--${relatedBoundary}--`,
              ]
            : [
                ...lines,
                `--${relatedBoundary}--`,
              ];

          const raw = Buffer.from(mimeParts.join('\r\n'))
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

          console.log(`[Email] Attempting to send intake email (${referenceId}) to ${mailTo}...`);
          const sendResult = await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw },
          });
          
          emailSent = true;
          console.log(`[Email] ✅ Email sent successfully for intake ${referenceId}. Message ID: ${sendResult.data.id || 'N/A'}`);
        } catch (mailErr) {
          emailError = mailErr instanceof Error ? mailErr.message : String(mailErr);
          console.error(`[Email] ❌ Failed to send email for intake ${referenceId}:`, {
            error: emailError,
            stack: mailErr instanceof Error ? mailErr.stack : undefined,
            referenceId,
            mailTo,
            mailFrom
          });
        }
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err);
      console.error(`[Email] ❌ Unexpected error in email sending process:`, emailError);
    }
    
    // Log email status (but don't fail the intake submission if email fails)
    if (!emailSent && emailError) {
      console.warn(`[Email] ⚠️ Intake ${referenceId} was saved but email notification failed: ${emailError}`);
    }

    return { success: true, message: 'Intake submitted successfully', deposit_required: depositRequired === 'YES' };
  } catch (error) {
    console.error('Error bookIntake:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Cancel appointment (from new bookings table)
async function cancelAppointment(appointmentId: string) {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    // Ensure bookings worksheet exists
    await ensureWorksheet(sheets, spreadsheetId, 'bookings', [
      'appointment_id',
      'customer_name',
      'customer_email',
      'customer_phone',
      'appointment_date',
      'appointment_time',
      'status',
      'concern',
      'message',
      'created_at',
      'updated_at'
    ]);

    // Find appointment in bookings table (new table)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'bookings!A:K',
    });

    const rows = response.data.values || [];
    let appointmentRowIndex = -1;
    let appointmentData = null;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === appointmentId) {
        appointmentRowIndex = i + 1; // Google Sheets uses 1-based indexing
        appointmentData = rows[i];
        break;
      }
    }

    if (appointmentRowIndex === -1) {
      return {
        success: false,
        error: 'Appointment not found'
      };
    }

    // Update appointment status to cancelled in bookings table
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `bookings!G${appointmentRowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['cancelled']]
      }
    });

    // Update time slot count (decrease by 1)
    if (appointmentData) {
      const appointmentDate = appointmentData[4];
      const appointmentTime = appointmentData[5];

      const timeSlotsResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'time_slots!A:E',
      });

      const timeSlotsRows = timeSlotsResponse.data.values || [];
      const normalizedAppointmentDate = String(appointmentDate || '').trim();
      const normalizedAppointmentTime = String(appointmentTime || '').trim();

      for (let i = 1; i < timeSlotsRows.length; i++) {
        const row = timeSlotsRows[i];
        const rowDate = String(row[0] || '').trim();
        const rowTime = String(row[1] || '').trim();

        if (rowDate === normalizedAppointmentDate && rowTime === normalizedAppointmentTime) {
          const currentCount = parseInt(row[4]) || 0;
          const maxCapacity = parseInt(row[3]) || 1;
          const newCount = Math.max(0, currentCount - 1);

    // Update booking count
    await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `time_slots!E${i + 1}`,
            valueInputOption: 'RAW',
            requestBody: {
              values: [[newCount]]
            }
          });

          // If below max capacity after cancellation, set is_available to TRUE
          if (currentCount >= maxCapacity && newCount < maxCapacity) {
            await sheets.spreadsheets.values.update({
              spreadsheetId,
              range: `time_slots!C${i + 1}`,
              valueInputOption: 'RAW',
              requestBody: {
                values: [['TRUE']]
              }
            });
          }
          break;
        }
      }
    }

    return {
      success: true,
      message: 'Appointment cancelled successfully'
    };

  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Check if worksheet exists, create if not
async function ensureWorksheet(sheets: Awaited<ReturnType<typeof initializeSheets>>, spreadsheetId: string, sheetName: string, headers: string[]) {
  try {
    // Try to read the worksheet to check if it exists
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:Z1`,
    });
    // If successful, worksheet exists
    return true;
  } catch (error: unknown) {
    // If error contains "Unable to parse range", worksheet doesn't exist
    if (error instanceof Error && error.message && error.message.includes('Unable to parse range')) {
      try {
        // Create the worksheet
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: sheetName,
                  },
                },
              },
            ],
          },
        });

        // Add headers (calculate column letter: A=1, B=2, etc.)
        const lastCol = headers.length <= 26 
          ? String.fromCharCode(64 + headers.length)
          : String.fromCharCode(64 + Math.floor((headers.length - 1) / 26)) + String.fromCharCode(65 + ((headers.length - 1) % 26));
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetName}!A1:${lastCol}1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        });

        return true;
      } catch (createError) {
        console.error(`Error creating worksheet ${sheetName}:`, createError);
        throw new Error(`Failed to create worksheet ${sheetName}. Please create it manually in Google Sheets.`);
      }
    }
    throw error;
  }
}

// Initialize all required worksheets (create if they don't exist)
async function initializeAllWorksheets() {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    const results: Record<string, { success: boolean; message: string }> = {};

    // Initialize time_slots table
    try {
      await ensureWorksheet(sheets, spreadsheetId, 'time_slots', [
        'date',
        'time_slot',
        'is_available',
        'max_capacity',
        'current_bookings'
      ]);
      results['time_slots'] = { success: true, message: 'time_slots table initialized successfully' };
    } catch (error) {
      results['time_slots'] = { 
        success: false, 
        message: `Failed to initialize time_slots: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }

    // Initialize bookings table (new appointment system)
    try {
      await ensureWorksheet(sheets, spreadsheetId, 'bookings', [
        'appointment_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'appointment_date',
        'appointment_time',
        'status',
        'concern',
        'message',
        'created_at',
        'updated_at'
      ]);
      results['bookings'] = { success: true, message: 'bookings table initialized successfully' };
    } catch (error) {
      results['bookings'] = { 
        success: false, 
        message: `Failed to initialize bookings: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }

    // Initialize appointments table (old intake system)
    try {
      await ensureWorksheet(sheets, spreadsheetId, 'appointments', [
        'created_at',
        'first_name',
        'last_name',
        'date_of_birth',
        'customer_email',
        'customer_phone',
        'concerns',
        'enquiries',
        'is_first_time',
        'duration_minutes',
        'deposit_required'
      ]);
      results['appointments'] = { success: true, message: 'appointments table initialized successfully' };
    } catch (error) {
      results['appointments'] = { 
        success: false, 
        message: `Failed to initialize appointments: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }

    // Initialize contact table
    try {
      await ensureWorksheet(sheets, spreadsheetId, 'contact', [
        'message_id',
        'full_name',
        'email',
        'phone',
        'subject',
        'message',
        'created_at'
      ]);
      results['contact'] = { success: true, message: 'contact table initialized successfully' };
    } catch (error) {
      results['contact'] = { 
        success: false, 
        message: `Failed to initialize contact: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }

    const allSuccess = Object.values(results).every(r => r.success);
    return {
      success: allSuccess,
      message: allSuccess 
        ? 'All tables initialized successfully' 
        : 'Some tables failed to initialize. Check details.',
      results
    };
  } catch (error) {
    console.error('Error initializing worksheets:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      results: {}
    };
  }
}

// Generate time slots automatically for future weeks or specific years
async function generateTimeSlots(
  weeks: number = 4, 
  overwrite: boolean = false, 
  years?: number[],
  startTime: string = '10:00',
  endTime: string = '18:00',
  intervalMinutes: number = 30,
  maxCapacity: number = 1
) {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    // Ensure time_slots worksheet exists with headers
    await ensureWorksheet(sheets, spreadsheetId, 'time_slots', [
      'date',
      'time_slot',
      'is_available',
      'max_capacity',
      'current_bookings'
    ]);

    // Determine date range first (needed for overwrite logic)
    let startDate: Date;
    let endDate: Date;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Start from tomorrow
    
    if (years && years.length > 0) {
      // Generate for specific years
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      const yearStart = new Date(minYear, 0, 1); // January 1st of first year
      const yearEnd = new Date(maxYear, 11, 31); // December 31st of last year
      
      // Start from tomorrow or year start, whichever is later
      startDate = tomorrow > yearStart ? tomorrow : yearStart;
      endDate = yearEnd;
    } else {
      // Generate for weeks (default behavior)
      startDate = new Date(tomorrow);
      endDate = new Date(tomorrow);
      endDate.setDate(tomorrow.getDate() + (weeks * 7) - 1); // -1 because we start from tomorrow
    }

    // If overwrite is true, delete existing slots in the date range first
    if (overwrite) {
      try {
        const existingResponse = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'time_slots!A:E',
        });
        const existingRows = existingResponse.data.values || [];
        
        if (existingRows.length > 1) { // More than just header
          // Find rows to delete (within date range)
          const rowsToDelete: number[] = [];
          const startRow = existingRows[0][0]?.toLowerCase() === 'date' ? 1 : 0;
          
          for (let i = startRow; i < existingRows.length; i++) {
            const row = existingRows[i];
            if (row.length >= 1) {
              const rowDate = normalizeDateStr(row[0]);
              if (rowDate) {
                const dateObj = new Date(rowDate);
                dateObj.setHours(0, 0, 0, 0);
                // Check if date is within range
                if (dateObj >= startDate && dateObj <= endDate) {
                  // Row number in Google Sheets is 1-indexed, and we need to account for header
                  rowsToDelete.push(i + 1);
                }
              }
            }
          }
          
          // Delete rows in reverse order to maintain correct indices
          if (rowsToDelete.length > 0) {
            // Sort in descending order for deletion
            rowsToDelete.sort((a, b) => b - a);
            
            // Get sheet ID for time_slots
            const sheetMetadata = await sheets.spreadsheets.get({
              spreadsheetId,
            });
            const timeSlotsSheet = sheetMetadata.data.sheets?.find(
              sheet => sheet.properties?.title === 'time_slots'
            );
            const sheetId = timeSlotsSheet?.properties?.sheetId;
            
            if (sheetId !== undefined) {
              // Create delete requests with correct sheet ID
              const deleteRequests = rowsToDelete.map(rowNum => ({
                deleteDimension: {
                  range: {
                    sheetId: sheetId,
                    dimension: 'ROWS',
                    startIndex: rowNum - 1, // Convert to 0-indexed
                    endIndex: rowNum // End index is exclusive
                  }
                }
              }));
              
              // Delete in batches (Google Sheets API limit)
              const batchSize = 100;
              for (let i = 0; i < deleteRequests.length; i += batchSize) {
                const batch = deleteRequests.slice(i, i + batchSize);
                await sheets.spreadsheets.batchUpdate({
                  spreadsheetId,
                  requestBody: {
                    requests: batch
                  }
                });
              }
              
              console.log(`[generateTimeSlots] Deleted ${rowsToDelete.length} existing rows for overwrite`);
            } else {
              console.warn('[generateTimeSlots] Could not find time_slots sheet ID');
            }
          }
        }
      } catch (err) {
        console.warn('Could not delete existing slots for overwrite, will continue:', err);
        // Continue anyway - new slots will be added, but may create duplicates
      }
    }

    // Get existing time slots to avoid duplicates (only if not overwriting)
    const existingSlots: Set<string> = new Set();
    if (!overwrite) {
      try {
        const existingResponse = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'time_slots!A:B',
        });
        const existingRows = existingResponse.data.values || [];
        // Skip header row if exists
        const startRow = existingRows.length > 0 && existingRows[0][0]?.toLowerCase() === 'date' ? 1 : 0;
        for (let i = startRow; i < existingRows.length; i++) {
          const row = existingRows[i];
          if (row.length >= 2) {
            const date = normalizeDateStr(row[0]);
            const time = String(row[1] || '').trim();
            if (date && time) {
              existingSlots.add(`${date}|${time}`);
            }
          }
        }
      } catch (err) {
        console.warn('Could not read existing slots, will generate all:', err);
      }
    }

    // Parse start and end times
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    if (!Number.isFinite(startHour) || !Number.isFinite(startMin) || 
        !Number.isFinite(endHour) || !Number.isFinite(endMin)) {
      return {
        success: false,
        error: 'Invalid time format. Use HH:MM format (e.g., 10:00, 18:00)'
      };
    }
    
    if (startHour < 0 || startHour > 23 || startMin < 0 || startMin > 59 ||
        endHour < 0 || endHour > 23 || endMin < 0 || endMin > 59) {
      return {
        success: false,
        error: 'Invalid time values. Hours must be 0-23, minutes must be 0-59'
      };
    }
    
    if (intervalMinutes <= 0 || intervalMinutes > 60 || intervalMinutes % 1 !== 0) {
      return {
        success: false,
        error: 'Invalid interval. Must be a positive integer between 1 and 60 minutes'
      };
    }
    
    if (maxCapacity <= 0 || maxCapacity % 1 !== 0) {
      return {
        success: false,
        error: 'Invalid max capacity. Must be a positive integer'
      };
    }
    
    // Generate time slots based on start time, end time, and interval
    const timeSlots: string[] = [];
    const startTotalMinutes = startHour * 60 + startMin;
    const endTotalMinutes = endHour * 60 + endMin;
    
    for (let totalMinutes = startTotalMinutes; totalMinutes < endTotalMinutes; totalMinutes += intervalMinutes) {
      const hour = Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      timeSlots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }

    const rowsToAdd: string[][] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // Only include Monday to Saturday
      if (isWeekday(currentDate) && !isAustralianHoliday(currentDate)) {
        const dateStr = normalizeDateStr(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
        
        for (const timeSlot of timeSlots) {
          const slotKey = `${dateStr}|${timeSlot}`;
          
          // Skip if already exists (unless overwrite is true)
          if (!overwrite && existingSlots.has(slotKey)) {
            continue;
          }

          // Add row: [date, time_slot, is_available, max_capacity, current_bookings]
          rowsToAdd.push([
            dateStr,
            timeSlot,
            'TRUE',
            String(maxCapacity),
            '0'
          ]);
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (rowsToAdd.length === 0) {
      return {
        success: true,
        message: 'No new time slots to generate (all already exist)',
        generated: 0,
        skipped: existingSlots.size
      };
    }

    // Batch write to Google Sheets (Google Sheets API allows up to 10,000 rows per request)
    const batchSize = 1000;
    let totalAdded = 0;

    for (let i = 0; i < rowsToAdd.length; i += batchSize) {
      const batch = rowsToAdd.slice(i, i + batchSize);
      
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'time_slots!A:E',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: batch
        }
      });
      
      totalAdded += batch.length;
    }

    return {
      success: true,
      message: `Successfully generated ${totalAdded} time slots`,
      generated: totalAdded,
      dateRange: {
        from: normalizeDateStr(`${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`),
        to: normalizeDateStr(`${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`)
      }
    };

  } catch (error) {
    console.error('Error generating time slots:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Submit contact form to Google Sheets: contact!A:G
async function submitContact(data: Record<string, unknown>) {
  try {
    const sheets = await initializeSheets();
    const spreadsheetId = getSpreadsheetId();

    const required = ['full_name', 'email', 'subject', 'message'];
    for (const k of required) {
      if (!data[k] || String(data[k]).trim() === '') {
        return { success: false, error: `Missing required field: ${k}` };
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(data.email))) {
      return { success: false, error: 'Invalid email format' };
    }

    // Ensure contact worksheet exists
    await ensureWorksheet(sheets, spreadsheetId, 'contact', [
      'message_id',
      'full_name',
      'email',
      'phone',
      'subject',
      'message',
      'created_at'
    ]);

    const messageId = 'MSG_' + Math.random().toString(36).slice(2, 10).toUpperCase();
    const row = [
      messageId,
      String(data.full_name || ''),
      String(data.email || ''),
      String(data.phone || ''),
      String(data.subject || ''),
      String(data.message || ''),
      new Date().toISOString(),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'contact!A:G',
      valueInputOption: 'RAW',
      requestBody: { values: [row] }
    });

    return { success: true, message_id: messageId };
  } catch (error) {
    console.error('Error submit contact:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// API route handler
export async function GET() {
  try {
    // Check key OAuth environment variables (without exposing actual values)
    const cookieStore = await cookies();
    const envCheck = {
      GOOGLE_OAUTH_CLIENT_ID: !!process.env.GOOGLE_OAUTH_CLIENT_ID,
      GOOGLE_OAUTH_CLIENT_SECRET: !!process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      GOOGLE_OAUTH_REDIRECT_URI: !!process.env.GOOGLE_OAUTH_REDIRECT_URI,
      GOOGLE_SHEETS_SPREADSHEET_ID: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      HAS_REFRESH_TOKEN_COOKIE: !!cookieStore.get('gs_refresh_token')?.value,
      HAS_REFRESH_TOKEN_ENV: !!process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    };

    return NextResponse.json({
      success: true,
      message: 'Klinik Appointment System API is running',
      timestamp: new Date().toISOString(),
      version: '4.1',
      method: 'OAuth2 Client (User Consent) to Google Sheets',
      environment_check: envCheck
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const action = data.action;

    console.log('Received request:', { action, data: JSON.stringify(data).substring(0, 200) });

    let result;
    switch (action) {
      case 'check_availability':
        result = await checkAvailability(data.date);
        break;
      case 'month_availability':
        result = await monthAvailability(parseInt(data.year), parseInt(data.month));
        break;
      case 'day_availability':
        result = await dayAvailability(String(data.date));
        break;
      case 'get_available_dates':
        result = await getAvailableDates(data.weeks ? parseInt(data.weeks) : 4);
        break;
      case 'book_appointment':
        result = await bookAppointment(data);
        break;
      case 'book_intake':
        result = await bookIntake(data);
        break;
      case 'cancel_appointment':
        result = await cancelAppointment(data.appointment_id);
        break;
      case 'submit_contact':
        result = await submitContact(data);
        break;
      case 'generate_time_slots':
        result = await generateTimeSlots(
          data.weeks ? parseInt(data.weeks) : 4,
          data.overwrite === true,
          data.years ? (Array.isArray(data.years) ? data.years.map((y: unknown) => parseInt(String(y), 10)) : [parseInt(String(data.years), 10)]) : undefined,
          data.startTime || '10:00',
          data.endTime || '18:00',
          data.intervalMinutes ? parseInt(data.intervalMinutes) : 30,
          data.maxCapacity ? parseInt(data.maxCapacity) : 1
        );
        break;
      case 'initialize_tables':
        result = await initializeAllWorksheets();
        break;
      default:
        result = {
          success: false,
          error: 'Invalid action. Supported: check_availability, month_availability, day_availability, get_available_dates, book_appointment, book_intake, cancel_appointment, submit_contact, generate_time_slots, initialize_tables'
        };
    }

    // Set no-cache headers to ensure fresh data
    const response = NextResponse.json(result);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;

  } catch (error: unknown) {
    console.error('API Error:', error);
    const errorResponse = NextResponse.json({
      success: false,
      error: String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
    errorResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    errorResponse.headers.set('Pragma', 'no-cache');
    return errorResponse;
  }
}
