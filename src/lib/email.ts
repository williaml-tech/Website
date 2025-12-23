import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

type GmailOAuth = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  refreshToken: string;
};

export async function sendGmailPlain(params: {
  to: string;
  from: string;
  subject: string;
  plain: string;
  oauth: GmailOAuth;
  replyTo?: string;
}): Promise<string | undefined> {
  const { to, from, subject, plain, oauth } = params;

  const oAuth = new OAuth2Client(oauth.clientId, oauth.clientSecret, oauth.redirectUri);
  oAuth.setCredentials({ refresh_token: oauth.refreshToken });
  const gmail = google.gmail({ version: 'v1', auth: oAuth });

  const dateHeader = new Date().toUTCString();
  const lines = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    params.replyTo ? `Reply-To: ${params.replyTo}` : undefined,
    `Date: ${dateHeader}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    plain,
  ].filter(Boolean) as string[];

  const raw = Buffer.from(lines.join('\r\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
  return res.data.id ?? undefined;
}

export async function sendGmailMultipartRelated(params: {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
  oauth: GmailOAuth;
  replyTo?: string;
  inlinePngBase64?: { cid: string; filename: string; base64: string };
}): Promise<string | undefined> {
  const { to, from, subject, html, text, oauth, replyTo, inlinePngBase64 } = params;
  const oAuth = new OAuth2Client(oauth.clientId, oauth.clientSecret, oauth.redirectUri);
  oAuth.setCredentials({ refresh_token: oauth.refreshToken });
  const gmail = google.gmail({ version: 'v1', auth: oAuth });

  const relatedBoundary = `----=_Rel_${Date.now()}`;
  const alternativeBoundary = `----=_Alt_${Date.now()}`;
  const dateHeader = new Date().toUTCString();

  const head = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    replyTo ? `Reply-To: ${replyTo}` : undefined,
    `Date: ${dateHeader}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/related; boundary="${relatedBoundary}"`,
    '',
  ].filter(Boolean) as string[];

  const altStart = [
    `--${relatedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
    '',
  ];

  const textPart = [
    `--${alternativeBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    text || 'New submission',
  ];

  const htmlPart = [
    `--${alternativeBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    '',
    html,
    `--${alternativeBoundary}--`,
  ];

  const inlinePart = inlinePngBase64 ? [
    `--${relatedBoundary}`,
    'Content-Type: image/png; name="' + inlinePngBase64.filename + '"',
    'Content-Transfer-Encoding: base64',
    `Content-ID: <${inlinePngBase64.cid}>`,
    'Content-Disposition: inline; filename="' + inlinePngBase64.filename + '"',
    '',
    inlinePngBase64.base64,
  ] : [];

  const end = [
    `--${relatedBoundary}--`,
  ];

  const mime = [
    ...head,
    ...altStart,
    ...textPart,
    ...htmlPart,
    ...inlinePart,
    ...end,
  ].join('\r\n');

  const raw = Buffer.from(mime)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
  return res.data.id ?? undefined;
}


