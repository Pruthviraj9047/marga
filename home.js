/**
 * Marga homepage — core UI, lazy Supabase auth, deferred FAQ.
 */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://wnzayybdjqlaenrecwtm.supabase.co';
  var SUPABASE_ANON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduemF5eWJkanFsYWVucmVjd3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTIwNzAsImV4cCI6MjA4OTY2ODA3MH0.39YjkW-UGymqPN4f8rTWO68r5skqZ__FbGK3HFuDXeI';

  var supabaseClient = null;
  var supabaseLoadPromise = null;
  var authUiReady = false;

  function loadSupabaseClient() {
    if (supabaseClient) {
      return Promise.resolve(supabaseClient);
    }
    if (supabaseLoadPromise) {
      return supabaseLoadPromise;
    }
    supabaseLoadPromise = import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
      .then(function (mod) {
        supabaseClient = mod.createClient(SUPABASE_URL, SUPABASE_ANON, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            flowType: 'pkce',
            storageKey: 'marga-supabase-auth',
            storage: window.localStorage
          }
        });
        return supabaseClient;
      });
    return supabaseLoadPromise;
  }

  function loadFaqScript() {
    if (!document.querySelector('[data-faq-accordion]') || window._margaFaqLoaded) {
      return;
    }
    window._margaFaqLoaded = true;
    var s = document.createElement('script');
    s.src = '/faq.js';
    s.defer = true;
    document.body.appendChild(s);
  }

  function scheduleFaq() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadFaqScript, { timeout: 2500 });
    } else {
      window.addEventListener('load', loadFaqScript, { once: true });
    }
  }

  function throttle(fn, wait) {
    var t = 0;
    return function () {
      var now = Date.now();
      if (now - t >= wait) {
        t = now;
        fn();
      }
    };
  }

  function initHeroPreview() {
    var preview = document.querySelector('.marga-home .mockup-card');
    if (!preview || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var rows = preview.querySelectorAll('.mockup-row');
    var badge = preview.querySelector('.mockup-badge');
    var progress = preview.querySelector('.mockup-progress-fill');
    if (!rows.length || !badge || !progress) return;
    var index = 0;
    window.setInterval(function () {
      var row = rows[index % rows.length];
      var check = row.querySelector('.mockup-check-empty, .mockup-check');
      if (check && check.classList.contains('mockup-check-empty')) {
        check.className = 'mockup-check';
        check.textContent = '✓';
        row.classList.add('done');
        var label = row.querySelector('span:nth-of-type(2)');
        if (label) label.textContent = 'Done';
        badge.textContent = '9/12';
        progress.style.width = '75%';
      }
      index += 1;
    }, 4200);
  }

  function initAuthUi() {
    if (authUiReady) return;
    authUiReady = true;

    var authOverlay = document.getElementById('authOverlay');
    var tabLogin = document.getElementById('tabLogin');
    var tabSignup = document.getElementById('tabSignup');
    var loginForm = document.getElementById('loginForm');
    var signupForm = document.getElementById('signupForm');
    var resetForm = document.getElementById('resetForm');
    var verifyScreen = document.getElementById('verifyScreen');
    var pendingVerifyEmail = '';

    var errIds = [
      'loginEmailErr', 'loginPasswordErr', 'signupNameErr', 'signupEmailErr',
      'signupPasswordErr', 'signupConfirmErr', 'resetEmailErr'
    ];

    function clearErrors() {
      errIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          el.textContent = '';
          el.style.display = 'none';
        }
      });
      var ok = document.getElementById('resetOk');
      if (ok) ok.style.display = 'none';
    }

    function showErr(id, msg) {
      var el = document.getElementById(id);
      if (!el) return;
      el.textContent = msg;
      el.style.display = 'block';
    }

    function setLoading(btn, loading, label) {
      if (!btn) return;
      btn.disabled = loading;
      btn.innerHTML = loading ? '<span class="spinner"></span>' : label;
    }

    function openAuth(mode, contextMsg) {
      clearErrors();
      authOverlay.classList.add('open');
      var ctxEl = document.getElementById('authContextMsg');
      if (ctxEl) {
        ctxEl.textContent = contextMsg || '';
        ctxEl.style.display = contextMsg ? 'block' : 'none';
      }
      if (mode === 'login') showLogin();
      else showSignup();
    }

    function closeAuth() {
      authOverlay.classList.remove('open');
    }

    function showLogin() {
      tabLogin.classList.add('active');
      tabSignup.classList.remove('active');
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      resetForm.style.display = 'none';
      verifyScreen.style.display = 'none';
    }

    function showSignup() {
      tabSignup.classList.add('active');
      tabLogin.classList.remove('active');
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
      resetForm.style.display = 'none';
      verifyScreen.style.display = 'none';
    }

    function showReset() {
      clearErrors();
      resetForm.style.display = 'block';
      loginForm.style.display = 'none';
      signupForm.style.display = 'none';
      verifyScreen.style.display = 'none';
      tabLogin.classList.remove('active');
      tabSignup.classList.remove('active');
    }

    function showEmailVerificationScreen(email) {
      pendingVerifyEmail = email;
      tabLogin.classList.remove('active');
      tabSignup.classList.remove('active');
      loginForm.style.display = 'none';
      signupForm.style.display = 'none';
      resetForm.style.display = 'none';
      verifyScreen.style.display = 'block';
      document.getElementById('verifyEmailText').textContent = email;
      document.getElementById('resendSentMsg').classList.remove('show');
    }

    async function syncSignupProfile(user, displayName) {
      if (!user || !displayName) return;
      try {
        await supabaseClient.from('profiles').upsert({
          id: user.id,
          email: user.email,
          display_name: displayName,
          full_name: displayName,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      } catch (err) {
        console.warn('Profile table sync skipped:', err);
      }
    }

    function mapAuthError(err, mode) {
      var msg = (err && err.message) || 'Something went wrong';
      if (mode === 'signup') {
        if (/already registered|already been registered|already in use/i.test(msg)) {
          return { id: 'signupEmailErr', text: 'Email already in use' };
        }
        return { id: 'signupEmailErr', text: msg };
      }
      if (mode === 'login') {
        if (/invalid login credentials|invalid email or password/i.test(msg)) {
          return { id: 'loginPasswordErr', text: 'Invalid email or password' };
        }
        return { id: 'loginPasswordErr', text: msg };
      }
      return { id: 'resetEmailErr', text: msg };
    }

    window._authNextDestination = '/app';
    window._margaOpenAuth = openAuth;

    tabLogin.addEventListener('click', showLogin);
    tabSignup.addEventListener('click', showSignup);
    document.getElementById('forgotBtn').addEventListener('click', showReset);
    document.getElementById('resetBack').addEventListener('click', showLogin);

    authOverlay.addEventListener('click', function (e) {
      if (e.target === authOverlay) closeAuth();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAuth();
    });

    document.querySelectorAll('[data-toggle-pass]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var input = document.getElementById(btn.getAttribute('data-toggle-pass'));
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrors();
      var email = document.getElementById('loginEmail').value.trim();
      var password = document.getElementById('loginPassword').value;
      if (!email || !password) {
        if (!email) showErr('loginEmailErr', 'Please fill in all fields');
        if (!password) showErr('loginPasswordErr', 'Please fill in all fields');
        return;
      }
      var submit = document.getElementById('loginSubmit');
      setLoading(submit, true, 'Log In');
      var result = await supabaseClient.auth.signInWithPassword({ email: email, password: password });
      setLoading(submit, false, 'Log In');
      if (result.error) {
        var m = mapAuthError(result.error, 'login');
        showErr(m.id, m.text);
        return;
      }
      window.location.replace(window._authNextDestination || '/app');
    });

    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrors();
      var name = document.getElementById('signupName').value.trim();
      var email = document.getElementById('signupEmail').value.trim();
      var password = document.getElementById('signupPassword').value;
      var confirmPassword = document.getElementById('signupConfirm').value;
      if (!name || !email || !password || !confirmPassword) {
        if (!name) showErr('signupNameErr', 'Please fill in all fields');
        if (!email) showErr('signupEmailErr', 'Please fill in all fields');
        if (!password) showErr('signupPasswordErr', 'Please fill in all fields');
        if (!confirmPassword) showErr('signupConfirmErr', 'Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        showErr('signupConfirmErr', 'Passwords do not match');
        return;
      }
      var submit = document.getElementById('signupSubmit');
      setLoading(submit, true, 'Create Account');
      var result = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { full_name: name, name: name, display_name: name },
          emailRedirectTo: window.location.origin + '/app'
        }
      });
      setLoading(submit, false, 'Create Account');
      if (result.error) {
        var m = mapAuthError(result.error, 'signup');
        showErr(m.id, m.text);
        return;
      }
      await syncSignupProfile(result.data && result.data.user, name);
      if (result.data && result.data.session) {
        window.location.replace(window._authNextDestination || '/app');
        return;
      }
      showEmailVerificationScreen(email);
    });

    resetForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrors();
      var email = document.getElementById('resetEmail').value.trim();
      if (!email) {
        showErr('resetEmailErr', 'Please fill in all fields');
        return;
      }
      var submit = document.getElementById('resetSubmit');
      setLoading(submit, true, 'Send Reset Link');
      var result = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/'
      });
      setLoading(submit, false, 'Send Reset Link');
      if (result.error) {
        var m = mapAuthError(result.error, 'reset');
        showErr(m.id, m.text);
        return;
      }
      document.getElementById('resetOk').style.display = 'block';
    });

    document.querySelectorAll('[data-google]').forEach(function (btn) {
      btn.addEventListener('click', async function () {
        await supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: window.location.origin + '/app' }
        });
      });
    });

    document.getElementById('resendVerifyBtn').addEventListener('click', async function () {
      if (!pendingVerifyEmail) return;
      await supabaseClient.auth.resend({
        type: 'signup',
        email: pendingVerifyEmail,
        options: { emailRedirectTo: window.location.origin + '/app' }
      });
      var sent = document.getElementById('resendSentMsg');
      sent.classList.add('show');
      setTimeout(function () {
        sent.classList.remove('show');
      }, 3000);
    });
  }

  function ensureAuthReady() {
    return loadSupabaseClient().then(function (client) {
      initAuthUi();
      return client;
    });
  }

  function requestAuth(mode, contextMsg) {
    return ensureAuthReady().then(function () {
      window._margaOpenAuth(mode || 'signup', contextMsg || '');
    });
  }

  async function handleOpenApp(e) {
    if (e) e.preventDefault();
    var btn = e && e.currentTarget;
    var originalLabel = (btn && btn.dataset.label) || (btn && btn.textContent) || 'Open App';
    if (btn) {
      btn.disabled = true;
      btn.textContent = '…';
    }
    try {
      await ensureAuthReady();
      var result = await supabaseClient.auth.getSession();
      if (result.data && result.data.session) {
        window.location.href = '/app';
        return;
      }
    } catch (_) { /* ignore */ }
    if (btn) {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
    window._authNextDestination = '/app';
    window._margaOpenAuth('login', 'Sign in to continue to your study dashboard');
  }

  window.addEventListener('DOMContentLoaded', function () {
    console.log(
      '%c Marga %c Built by Pruthviraj Arun ',
      'background:#6C63FF;color:white;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:800;font-size:13px',
      'background:#38E8C5;color:#0D0F1A;padding:4px 8px;border-radius:0 4px 4px 0;font-weight:700;font-size:13px'
    );
    console.log('%c© 2026 Pruthviraj Arun. All rights reserved.', 'color:#8892B8;font-size:11px');

    var navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', throttle(function () {
        navbar.classList.toggle('scrolled', window.scrollY > 12);
      }, 100), { passive: true });
    }

    document.querySelectorAll('[data-open-auth]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        requestAuth(btn.getAttribute('data-open-auth'));
      });
    });

    document.querySelectorAll('.nav-open-app, .open-app-btn').forEach(function (btn) {
      btn.addEventListener('click', handleOpenApp);
    });

    var params = new URLSearchParams(window.location.search);
    var openParam = params.get('open');
    var nextParam = params.get('next');
    var msgParam = params.get('msg');
    if (openParam === 'login' || openParam === 'signup') {
      if (nextParam) window._authNextDestination = nextParam;
      history.replaceState({}, '', window.location.origin + window.location.pathname);
      var ctxMsg = 'Sign in to continue to your study dashboard';
      if (msgParam === 'expired') ctxMsg = 'Your session expired. Please sign in again.';
      if (msgParam === 'pkce_failed') ctxMsg = 'Confirmation link expired or opened in a different browser. Please open the link in the same browser where you signed up, or sign in.';
      if (msgParam === 'auth_error') ctxMsg = 'Authentication link invalid or expired. Please sign in again.';
      requestAuth(openParam, ctxMsg);
    }

    scheduleFaq();
    initHeroPreview();

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js')
          .then(function (reg) {
            if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            reg.addEventListener('updatefound', function () {
              var worker = reg.installing;
              if (!worker) return;
              worker.addEventListener('statechange', function () {
                if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                  worker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            });
          })
          .catch(function (err) {
            console.warn('SW failed:', err);
          });
      });
    }
  });
})();
