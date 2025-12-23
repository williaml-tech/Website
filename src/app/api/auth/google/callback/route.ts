import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const googleError = req.nextUrl.searchParams.get('error');
  const origin = req.nextUrl.origin;

  if (googleError) {
    const url = new URL(origin);
    url.searchParams.set('oauth_error', googleError);
    return NextResponse.redirect(url.toString());
  }
  if (!code) {
    const url = new URL(origin);
    url.searchParams.set('error', 'missing_code');
    return NextResponse.redirect(url.toString());
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    const url = new URL(origin);
    url.searchParams.set('error', 'missing_env');
    return NextResponse.redirect(url.toString());
  }

  const client = new OAuth2Client(clientId, clientSecret, redirectUri);

  try {
    const { tokens } = await client.getToken(code);

    // TODO: Persist tokens.refresh_token securely on the server side
    // For now, we just set a short-lived cookie for demo (do not use in production)
    const res = NextResponse.redirect(origin);
    if (tokens.refresh_token) {
      res.cookies.set('gs_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }
    return res;
  } catch (e: unknown) {
    const err = e as { response?: { data?: { error?: string } }, message?: string } | undefined;
    console.error('OAuth callback token exchange failed:', err?.response?.data || err?.message || e);
    const msg = err?.response?.data?.error || err?.message || 'token_exchange_failed';
    const url = new URL(origin);
    url.searchParams.set('oauth_error', msg);
    return NextResponse.redirect(url.toString());
  }
}


