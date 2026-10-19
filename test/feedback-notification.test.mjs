import assert from 'node:assert/strict';
import test from 'node:test';
import { handler } from '../netlify/functions/feedback-notification.mjs';

const baseEnv = {
  RESEND_API_KEY: 're_test_key',
  FEEDBACK_NOTIFICATION_EMAIL: 'owner@example.com',
  SUPABASE_FEEDBACK_WEBHOOK_SECRET: 'webhook-secret',
  RESEND_FROM_EMAIL: 'Marga <feedback@example.com>'
};

const webhook = (record = {}) => ({
  headers: { 'x-supabase-webhook-secret': 'webhook-secret' },
  body: JSON.stringify({
    type: 'INSERT',
    schema: 'public',
    table: 'feedback',
    record: {
      id: 42,
      subject: 'A <subject>',
      message: 'Line one\n<script>alert(1)</script>',
      name: 'A user',
      email: 'user@example.com',
      created_at: '2026-10-19T12:00:00.000Z',
      ...record
    }
  })
});

function withEnv(values, callback) {
  const old = { ...process.env };
  Object.assign(process.env, baseEnv, values);
  return Promise.resolve(callback()).finally(() => {
    process.env = old;
  });
}

test('rejects missing or incorrect webhook secrets', async () => {
  await withEnv({}, async () => {
    const missing = await handler({ headers: {}, body: '{}' });
    assert.equal(missing.statusCode, 401);
    const incorrect = await handler({ headers: { 'x-supabase-webhook-secret': 'wrong' }, body: '{}' });
    assert.equal(incorrect.statusCode, 401);
  });
});

test('rejects requests when server configuration is incomplete', async () => {
  await withEnv({ RESEND_FROM_EMAIL: undefined }, async () => {
    const result = await handler(webhook());
    assert.equal(result.statusCode, 500);
  });
});

test('rejects malformed and non-feedback events', async () => {
  await withEnv({}, async () => {
    assert.equal((await handler({ ...webhook(), body: '{' })).statusCode, 400);
    const event = JSON.parse(webhook().body);
    event.type = 'UPDATE';
    assert.equal((await handler({ ...webhook(), body: JSON.stringify(event) })).statusCode, 400);
  });
});

test('sends an escaped notification and an idempotency key', async () => {
  const oldFetch = globalThis.fetch;
  let request;
  globalThis.fetch = async (_url, options) => {
    request = options;
    return { ok: true, status: 200 };
  };

  await withEnv({}, async () => {
    const result = await handler(webhook());
    assert.equal(result.statusCode, 200);
    assert.equal(request.headers['Idempotency-Key'], 'marga-feedback-42');
    const body = JSON.parse(request.body);
    assert.match(body.html, /&lt;subject&gt;/);
    assert.doesNotMatch(body.html, /<script>/);
    assert.equal(body.to[0], 'owner@example.com');
  });
  globalThis.fetch = oldFetch;
});

test('returns a provider error without exposing provider details', async () => {
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, status: 400 });
  await withEnv({}, async () => {
    const result = await handler(webhook());
    assert.equal(result.statusCode, 502);
    assert.deepEqual(JSON.parse(result.body), { error: 'Email provider rejected the notification.' });
  });
  globalThis.fetch = oldFetch;
});
