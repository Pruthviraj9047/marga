import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [app, home, serviceWorker] = await Promise.all([
  readFile(new URL('../app.html', import.meta.url), 'utf8'),
  readFile(new URL('../home.js', import.meta.url), 'utf8'),
  readFile(new URL('../service-worker.js', import.meta.url), 'utf8'),
]);

const authBootstrapStart = app.indexOf("window.addEventListener('DOMContentLoaded', async () => {");
const authBootstrapEnd = app.indexOf('</script>', authBootstrapStart);
assert.notEqual(authBootstrapStart, -1, 'auth bootstrap should exist');
assert.notEqual(authBootstrapEnd, -1, 'auth bootstrap should be a complete script');
const authBootstrap = app.slice(authBootstrapStart, authBootstrapEnd);

test('auth listener stays synchronous and defers Supabase work', () => {
  assert.doesNotMatch(authBootstrap, /onAuthStateChange\(async\s/);
  assert.match(authBootstrap, /onAuthStateChange\(\(event, newSession\) =>/);
  assert.match(authBootstrap, /window\.setTimeout\(\(\) => \{[\s\S]*?bootWithSession\(newSession\)/);
});

test('OAuth callback is protected from the initial null session and exchanged once', () => {
  const pendingIndex = authBootstrap.indexOf('let authCallbackPending');
  const listenerIndex = authBootstrap.indexOf('_sb.auth.onAuthStateChange');
  const exchangeIndex = authBootstrap.indexOf('exchangeCodeForSession(authCode)');
  const cleanupIndex = authBootstrap.indexOf('window.history.replaceState({}, document.title, window.location.pathname);', exchangeIndex);

  assert.ok(pendingIndex >= 0 && pendingIndex < listenerIndex, 'callback guard must exist before the listener');
  assert.match(authBootstrap, /if \(!sessionReady && !authCallbackPending && !redirected\) redirectToLogin\(\);/);
  assert.match(authBootstrap, /let authCallbackProcessed = false;/);
  assert.ok(exchangeIndex >= 0, 'PKCE exchange should be present');
  assert.ok(cleanupIndex > exchangeIndex, 'callback URL must be cleaned after exchange');
  assert.equal((authBootstrap.match(/exchangeCodeForSession\(authCode\)/g) || []).length, 2, 'normal and recovery flows should each exchange once');
});

test('logout waits for Supabase signOut and owns the final redirect', () => {
  const logoutStart = app.indexOf('async function logoutUser()');
  const logoutEnd = app.indexOf('\n    function handleLogout()', logoutStart);
  const logout = app.slice(logoutStart, logoutEnd);

  assert.match(logout, /await window\._supabase\.auth\.signOut\(\)/);
  assert.match(logout, /finally \{/);
  assert.match(logout, /window\._userSession = null;/);
  assert.match(logout, /window\.location\.replace\('\/'\);/);
  assert.equal((logout.match(/window\.location\.replace/g) || []).length, 1);
});

test('Google login prevents overlapping PKCE attempts', () => {
  assert.match(home, /var googleAuthInProgress = false;/);
  assert.match(home, /if \(googleAuthInProgress\) return;/);
  assert.match(home, /signInWithOAuth\(\{/);
});

test('all browser clients use the stable Supabase storage key', () => {
  for (const source of [app, home]) {
    assert.match(source, /storageKey:\s*'marga-supabase-auth'/);
    assert.match(source, /flowType:\s*'pkce'/);
    assert.match(source, /storage:\s*window\.localStorage/);
  }
});

test('service worker version invalidates the previous cached auth entry point', () => {
  assert.match(serviceWorker, /const VERSION\s*=\s*'marga-v13'/);
});
