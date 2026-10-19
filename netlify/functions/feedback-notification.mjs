import { timingSafeEqual } from 'node:crypto';

const WEBHOOK_SECRET_HEADER = 'x-supabase-webhook-secret';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function response(statusCode, body) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body)
  };
}

function hasMatchingSecret(received, expected) {
  if (!received || !expected) return false;
  const receivedBytes = Buffer.from(received);
  const expectedBytes = Buffer.from(expected);
  return (
    receivedBytes.length === expectedBytes.length &&
    timingSafeEqual(receivedBytes, expectedBytes)
  );
}

function getHeader(headers, name) {
  if (!headers || typeof headers !== 'object') return '';
  const wanted = name.toLowerCase();
  const key = Object.keys(headers).find((headerName) => headerName.toLowerCase() === wanted);
  return key ? headers[key] : '';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function optionalString(record, key) {
  return typeof record[key] === 'string' && record[key].trim() ? record[key].trim() : '';
}

function validateEvent(event) {
  if (!event || typeof event !== 'object' || Array.isArray(event)) {
    return 'Request body must be a JSON object.';
  }
  if (event.type !== 'INSERT' || event.schema !== 'public' || event.table !== 'feedback') {
    return 'Unsupported webhook event.';
  }
  if (!event.record || typeof event.record !== 'object' || Array.isArray(event.record)) {
    return 'Webhook record is missing or invalid.';
  }
  if (!optionalString(event.record, 'subject') || !optionalString(event.record, 'message')) {
    return 'Webhook record must include subject and message.';
  }
  return null;
}

function buildEmail(record) {
  const subject = optionalString(record, 'subject');
  const message = optionalString(record, 'message');
  const name = optionalString(record, 'name') || 'Not provided';
  const email = optionalString(record, 'email') || 'Not provided';
  const timestamp = optionalString(record, 'created_at') || 'Not provided';

  const rows = [
    ['Subject', subject],
    ['Name', name],
    ['Email', email],
    ['Submitted at', timestamp]
  ]
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`)
    .join('');

  return {
    subject: `New Marga feedback: ${subject}`,
    html: `<h2>New feedback received</h2>${rows}<hr><p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>`
  };
}

function getRecordId(record) {
  if (typeof record.id === 'string' && record.id.trim()) return record.id.trim();
  if (typeof record.id === 'number' && Number.isFinite(record.id)) return String(record.id);
  return '';
}

export async function handler(event) {
  const {
    RESEND_API_KEY,
    FEEDBACK_NOTIFICATION_EMAIL,
    SUPABASE_FEEDBACK_WEBHOOK_SECRET,
    RESEND_FROM_EMAIL
  } = process.env;

  if (!RESEND_API_KEY || !FEEDBACK_NOTIFICATION_EMAIL || !SUPABASE_FEEDBACK_WEBHOOK_SECRET || !RESEND_FROM_EMAIL) {
    console.error('Feedback notification configuration is incomplete.');
    return response(500, { error: 'Server configuration error.' });
  }

  const receivedSecret = getHeader(event.headers, WEBHOOK_SECRET_HEADER);
  if (!hasMatchingSecret(receivedSecret, SUPABASE_FEEDBACK_WEBHOOK_SECRET)) {
    return response(401, { error: 'Unauthorized.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '');
  } catch {
    return response(400, { error: 'Request body must be valid JSON.' });
  }

  const validationError = validateEvent(payload);
  if (validationError) return response(400, { error: validationError });

  const email = buildEmail(payload.record);
  const headers = {
    Authorization: `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  };
  const recordId = getRecordId(payload.record);
  if (recordId) headers['Idempotency-Key'] = `marga-feedback-${recordId}`;

  let resendResponse;
  try {
    resendResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [FEEDBACK_NOTIFICATION_EMAIL],
        subject: email.subject,
        html: email.html
      })
    });
  } catch {
    console.error('Resend request failed before receiving a response.');
    return response(502, { error: 'Email provider unavailable.' });
  }

  if (!resendResponse.ok) {
    console.error(`Resend rejected feedback notification with status ${resendResponse.status}.`);
    return response(502, { error: 'Email provider rejected the notification.' });
  }

  return response(200, { ok: true });
}

export { buildEmail, escapeHtml, getHeader, hasMatchingSecret, validateEvent };
