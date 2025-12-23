import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

export async function GET() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
  const scope = process.env.GOOGLE_OAUTH_SCOPES || 'https://www.googleapis.com/auth/spreadsheets';

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ error: 'Missing OAuth environment variables' }, { status: 500 });
  }

  const client = new OAuth2Client(clientId, clientSecret, redirectUri);

  const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [scope],
  });

  return NextResponse.redirect(url);
}


