/**
 * Marga contact page — social links, feedback form, Supabase insert.
 */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://wnzayybdjqlaenrecwtm.supabase.co';
  var SUPABASE_ANON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduemF5eWJkanFsYWVucmVjd3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTIwNzAsImV4cCI6MjA4OTY2ODA3MH0.39YjkW-UGymqPN4f8rTWO68r5skqZ__FbGK3HFuDXeI';

  /** Update social URLs in one place. */
  var MARGA_SOCIAL_LINKS = {
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/company/133444563/' },
    instagram: { label: 'Instagram', url: 'https://www.instagram.com/mymarga.in/' },
    email: { label: 'Email', url: 'mailto:hello@mymarga.in' }
  };

  var MAX_MESSAGE_LENGTH = 3000;

  var supabaseClient = null;
  var supabaseLoadPromise = null;
  var isSubmitting = false;

  var SOCIAL_ICONS = {
    linkedin:
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 9.5v9M6.5 6.5v.01M10 18.5v-5.2c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v5.2M10 9.5v9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="m4 8 8 5 8-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function loadSupabaseClient() {
    if (supabaseClient) return Promise.resolve(supabaseClient);
    if (supabaseLoadPromise) return supabaseLoadPromise;
    supabaseLoadPromise = import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm').then(function (mod) {
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

  function showToast(message, type) {
    var existing = document.getElementById('marga-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.id = 'marga-toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText =
      'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);' +
      'background:' +
      (type === 'error' ? 'rgba(239,68,68,0.95)' : 'linear-gradient(135deg,#6C63FF,#9B8FFF)') +
      ';color:white;padding:0.75rem 1.5rem;border-radius:999px;font-size:0.9rem;' +
      'font-weight:600;font-family:inherit;box-shadow:0 8px 32px rgba(0,0,0,0.4);' +
      'z-index:99999;pointer-events:none;animation:toastIn 0.2s ease;';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3000);
  }

  function renderSocialLinks() {
    var grid = document.getElementById('socialLinksGrid');
    if (!grid) return;
    grid.innerHTML = '';
    Object.keys(MARGA_SOCIAL_LINKS).forEach(function (key) {
      var item = MARGA_SOCIAL_LINKS[key];
      var isEmail = key === 'email';
      var anchor = document.createElement('a');
      anchor.className = 'social-card';
      anchor.href = item.url;
      if (!isEmail) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }
      anchor.innerHTML =
        '<span class="social-icon">' +
        (SOCIAL_ICONS[key] || SOCIAL_ICONS.email) +
        '</span><span>' +
        item.label +
        '</span>';
      grid.appendChild(anchor);
    });
  }

  function trim(value) {
    return String(value || '').trim();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(fieldId, errorId, message) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(errorId);
    if (field) field.classList.toggle('invalid', !!message);
    if (error) error.textContent = message || '';
  }

  function clearFieldErrors() {
    ['feedbackSubject', 'feedbackMessage', 'feedbackEmail'].forEach(function (id) {
      var field = document.getElementById(id);
      if (field) field.classList.remove('invalid');
    });
    ['subjectError', 'messageError', 'emailError'].forEach(function (id) {
      var error = document.getElementById(id);
      if (error) error.textContent = '';
    });
  }

  function validateForm(data) {
    clearFieldErrors();
    var valid = true;

    if (!data.subject) {
      setFieldError('feedbackSubject', 'subjectError', 'Subject is required.');
      valid = false;
    }

    if (!data.message) {
      setFieldError('feedbackMessage', 'messageError', 'Message is required.');
      valid = false;
    } else if (data.message.length > MAX_MESSAGE_LENGTH) {
      setFieldError(
        'feedbackMessage',
        'messageError',
        'Message must be ' + MAX_MESSAGE_LENGTH + ' characters or fewer.'
      );
      valid = false;
    }

    if (data.email && !isValidEmail(data.email)) {
      setFieldError('feedbackEmail', 'emailError', 'Please enter a valid email address.');
      valid = false;
    }

    return valid;
  }

  function collectFormData(form) {
    return {
      name: trim(form.name.value),
      email: trim(form.email.value),
      subject: trim(form.subject.value),
      message: trim(form.message.value),
      honeypot: trim(form.company && form.company.value)
    };
  }

  /** Extension point for Cloudflare Turnstile or other CAPTCHA providers. */
  async function verifyCaptchaBeforeSubmit() {
    return true;
  }

  async function getCurrentUserId(client) {
    var result = await client.auth.getSession();
    var session = result && result.data && result.data.session;
    return session && session.user ? session.user.id : null;
  }

  async function prefillFromSession(client) {
    var result = await client.auth.getSession();
    var user = result && result.data && result.data.session && result.data.session.user;
    if (!user) return;

    var nameInput = document.getElementById('feedbackName');
    var emailInput = document.getElementById('feedbackEmail');
    var meta = user.user_metadata || {};
    var displayName = meta.display_name || meta.full_name || meta.name || '';

    if (nameInput && !nameInput.value && displayName) {
      nameInput.value = displayName;
    }
    if (emailInput && !emailInput.value && user.email) {
      emailInput.value = user.email;
    }
  }

  function setSubmitLoading(form, loading) {
    var btn = document.getElementById('feedbackSubmit');
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading
      ? '<span class="spinner" aria-hidden="true"></span>Sending…'
      : 'Send Feedback';
  }

  function resetForm(form) {
    form.reset();
    clearFieldErrors();
    updateCharCount();
  }

  function updateCharCount() {
    var message = document.getElementById('feedbackMessage');
    var counter = document.getElementById('messageCharCount');
    if (!message || !counter) return;
    var length = message.value.length;
    counter.textContent = length + ' / ' + MAX_MESSAGE_LENGTH;
    counter.classList.toggle('over', length > MAX_MESSAGE_LENGTH);
  }

  async function submitFeedback(form) {
    if (isSubmitting) return;

    var data = collectFormData(form);
    if (data.honeypot) return;
    if (!validateForm(data)) return;

    var captchaOk = await verifyCaptchaBeforeSubmit();
    if (!captchaOk) {
      showToast('Verification failed. Please try again.', 'error');
      return;
    }

    isSubmitting = true;
    setSubmitLoading(form, true);

    try {
      var client = await loadSupabaseClient();
      var userId = await getCurrentUserId(client);

      var payload = {
        name: data.name || null,
        email: data.email || null,
        subject: data.subject,
        message: data.message,
        created_at: new Date().toISOString(),
        user_id: userId
      };

      var insertResult = await client.from('feedback').insert(payload);
      if (insertResult.error) throw insertResult.error;

      showToast('Thanks! Your feedback was sent.', 'success');
      resetForm(form);
    } catch (err) {
      console.error('Feedback submission failed:', err);
      showToast('Could not send feedback. Please try again.', 'error');
    } finally {
      isSubmitting = false;
      setSubmitLoading(form, false);
    }
  }

  function initFeedbackForm() {
    var form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      submitFeedback(form);
    });

    var message = document.getElementById('feedbackMessage');
    if (message) {
      message.addEventListener('input', updateCharCount);
      updateCharCount();
    }

    loadSupabaseClient().then(prefillFromSession).catch(function () {
      /* anonymous visitors can still submit */
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderSocialLinks();
    initFeedbackForm();
  });
})();
