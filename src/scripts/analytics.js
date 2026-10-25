const CONSENT_KEY = 'orthomedica:analytics-consent:v1';

export function initAnalytics() {
  const root = document.getElementById('analytics-settings');
  const banner = document.getElementById('analytics-consent');
  const id = root?.dataset.measurementId;
  if (!banner || !id || !/^G-[A-Z0-9]+$/.test(id)) return;

  let consent = 'unknown';
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    if (saved && ['granted', 'denied'].includes(saved.value) && Number.isFinite(saved.savedAt) && saved.savedAt <= Date.now() && Date.now() - saved.savedAt < 180 * 86400000) consent = saved.value;
  } catch { /* No storage: the choice remains session-only. */ }
  let started = false;

  function start() {
    window['ga-disable-' + id] = false;
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, {
      send_page_view: false,
      cookie_expires: 180 * 86400,
      cookie_update: false,
      ignore_referrer: true,
      cookie_domain: location.hostname,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: window.location.origin + '/',
      page_title: 'ORTHOMEDICA',
      page_referrer: '',
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.append(script);
  }

  function track(name, method) {
    if (consent !== 'granted') return;
    window.gtag?.('event', name, {
      contact_method: method,
      page_location: window.location.origin + '/',
      page_title: 'ORTHOMEDICA',
      page_referrer: '',
    });
  }

  function choose(value) {
    consent = value;
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, savedAt: Date.now() })); } catch {}
    banner.hidden = true;
    if (value === 'granted') start();
    else {
      window['ga-disable-' + id] = true;
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ['', '; domain=' + location.hostname, '; domain=.' + location.hostname]) {
          document.cookie = name + '=; max-age=0; path=/' + domain;
        }
      }
    }
  }

  banner.hidden = consent !== 'unknown';
  if (consent === 'granted') start();
  root.querySelectorAll('[data-consent]').forEach(button => {
    button.addEventListener('click', () => choose(button.dataset.consent));
  });
  document.getElementById('analytics-preferences')?.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('button')?.focus();
  });
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    const href = link?.getAttribute('href') || '';
    if (href.startsWith('tel:')) track('contact_click', 'phone');
    else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) track('contact_click', 'whatsapp');
  });
  document.addEventListener('orthomedica:contact-success', () => track('generate_lead', 'form'));
}

