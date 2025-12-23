function absoluteUrl(path: string): string {
  try {
    // Highest priority: explicit full URL override for logo
    const explicit = process.env.EMAIL_LOGO_URL;
    if (explicit) return explicit;

    // Next, try configured site URL envs
    let base = process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;

    // On Vercel, VERCEL_URL is like `your-app.vercel.app` (no protocol)
    if (!base && process.env.VERCEL_URL) {
      const host = process.env.VERCEL_URL;
      base = /^https?:\/\//i.test(host) ? host : `https://${host}`;
    }

    if (base) return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
  } catch {}
  // Fallback: return the path as-is (may work locally if client resolves it)
  return path;
}

export function renderIntakeEmail(params: {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  concerns: string;
  enquiries?: string;
  isFirstTime: boolean;
  durationMinutes?: number;
  depositRequired: boolean;
  logoCid?: string;
}): string {
  const {
    firstName, lastName, dateOfBirth, email, phone, concerns,
    enquiries, isFirstTime, durationMinutes, depositRequired, logoCid
  } = params;

  // Brand styling (beige background, black text)
  const brandBg = '#fff7e6';
  const brandBgAlt = '#fff3d7';
  const cardBg = '#fffdf5';
  const text = '#111111';
  const muted = '#444444';
  const gold = '#c9a227';
  const border = '#e5decf';

  const defaultLogoUrl = absoluteUrl('/logo.png');
  const explicitLogo = process.env.EMAIL_LOGO_URL;
  const logo = logoCid ? `cid:${logoCid}` : (explicitLogo ? explicitLogo : defaultLogoUrl);

  const enquiriesBlock = enquiries && enquiries.trim().length > 0
    ? `<tr><td colspan="2" style="padding:12px; color:${text}; border-top:1px solid ${border};"><div style="border:1px solid ${border}; border-radius:8px; background:${cardBg}; padding:12px;"><div style="font-weight:600; margin-bottom:6px; color:${gold}">Enquiries</div><div style="white-space:pre-wrap; line-height:1.6; color:${muted}">${enquiries}</div></div></td></tr>`
    : '';

  return `
  <div style="margin:0; padding:0; background:${brandBg};">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, ${brandBg} 0%, ${brandBgAlt} 100%);">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background:${cardBg}; border:1px solid ${border}; border-radius:14px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
            <tr>
              <td align="center" style="padding:24px 24px 8px 24px;">
                <img src="${logo}" alt="Klinikka" width="140" height="auto" style="display:block; margin:0 auto 8px;" />
                <div style="color:${gold}; letter-spacing:2px; font-size:12px; text-transform:uppercase; margin-top:6px;">New Appoinement</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:1px solid ${border}; border-bottom:1px solid ${border}; border-collapse:separate;">
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border}; width:40%;">First Name</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${firstName}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Last Name</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Date of Birth</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Email</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Phone</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border}; vertical-align:top;">Concerns</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600; white-space:pre-wrap;">${concerns}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">First Visit</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${isFirstTime ? 'YES' : 'NO'}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Duration (minutes)</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${durationMinutes ?? ''}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Deposit Required</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${depositRequired ? 'YES' : 'NO'}</td>
                  </tr>
                  ${enquiriesBlock}
                </table>
              </td>
            </tr>
          </table>
          
          <!-- Footer -->
          <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin-top:16px;">
            <tr>
              <td style="padding:12px 8px; text-align:center; color:#475569; font-size:12px; line-height:1.6;">
                <div style="color:#334155; font-weight:600; letter-spacing:0.3px;">Klinikka</div>
                <div style="color:#64748b;">Level 10 / 503 - 505 Kent St, Sydney, NSW, 2000</div>
                <div style="color:#64748b;">Phone: (02) 9955 8181<a href="https://www.klinikka.com.au/" style="color:#2563eb; text-decoration:none;">klinikka.com.au</a></div>
                <div style="margin-top:8px; color:#94a3b8;">You received this email because a New Appointment form was submitted.</div>
                <div style="color:#94a3b8;">© ${new Date().getFullYear()} Klinikka. All rights reserved.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}

export function renderBookingEmail(params: {
  customerName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  concern: string;
  message?: string;
  appointmentId: string;
  logoCid?: string;
}): string {
  const {
    customerName, email, phone, appointmentDate, appointmentTime,
    concern, message, appointmentId, logoCid
  } = params;

  // Brand styling (beige background, black text)
  const brandBg = '#fff7e6';
  const brandBgAlt = '#fff3d7';
  const cardBg = '#fffdf5';
  const text = '#111111';
  const muted = '#444444';
  const gold = '#c9a227';
  const border = '#e5decf';

  const defaultLogoUrl = absoluteUrl('/logo.png');
  const explicitLogo = process.env.EMAIL_LOGO_URL;
  const logo = logoCid ? `cid:${logoCid}` : (explicitLogo ? explicitLogo : defaultLogoUrl);

  // Format date for display
  let formattedDate = appointmentDate;
  try {
    const date = new Date(appointmentDate);
    if (!isNaN(date.getTime())) {
      formattedDate = date.toLocaleDateString('en-AU', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  } catch {}

  const messageBlock = message && message.trim().length > 0
    ? `<tr><td colspan="2" style="padding:12px; color:${text}; border-top:1px solid ${border};"><div style="border:1px solid ${border}; border-radius:8px; background:${cardBg}; padding:12px;"><div style="font-weight:600; margin-bottom:6px; color:${gold}">Additional Message</div><div style="white-space:pre-wrap; line-height:1.6; color:${muted}">${message}</div></div></td></tr>`
    : '';

  return `
  <div style="margin:0; padding:0; background:${brandBg};">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, ${brandBg} 0%, ${brandBgAlt} 100%);">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background:${cardBg}; border:1px solid ${border}; border-radius:14px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
            <tr>
              <td align="center" style="padding:24px 24px 8px 24px;">
                <img src="${logo}" alt="Klinikka" width="140" height="auto" style="display:block; margin:0 auto 8px;" />
                <div style="color:${gold}; letter-spacing:2px; font-size:12px; text-transform:uppercase; margin-top:6px;">New Appointment Booking</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px 24px;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:1px solid ${border}; border-bottom:1px solid ${border}; border-collapse:separate;">
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border}; width:40%;">Appointment ID</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${appointmentId}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Customer Name</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Email</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Phone</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Appointment Date</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border};">Appointment Time</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600;">${appointmentTime}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px; color:${muted}; border-bottom:1px solid ${border}; vertical-align:top;">Concern</td>
                    <td style="padding:12px; color:${text}; border-bottom:1px solid ${border}; font-weight:600; white-space:pre-wrap;">${concern}</td>
                  </tr>
                  ${messageBlock}
                </table>
              </td>
            </tr>
          </table>
          
          <!-- Footer -->
          <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin-top:16px;">
            <tr>
              <td style="padding:12px 8px; text-align:center; color:#475569; font-size:12px; line-height:1.6;">
                <div style="color:#334155; font-weight:600; letter-spacing:0.3px;">Klinikka</div>
                <div style="color:#64748b;">Level 10 / 503 - 505 Kent St, Sydney, NSW, 2000</div>
                <div style="color:#64748b;">Phone: (02) 9955 8181<a href="https://www.klinikka.com.au/" style="color:#2563eb; text-decoration:none;">klinikka.com.au</a></div>
                <div style="margin-top:8px; color:#94a3b8;">You received this email because a new appointment was booked.</div>
                <div style="color:#94a3b8;">© ${new Date().getFullYear()} Klinikka. All rights reserved.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
}


