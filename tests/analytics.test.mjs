import test from 'node:test';
import assert from 'node:assert/strict';
import { initAnalytics } from '../src/scripts/analytics.js';

function setup(saved) {
  const events = new Map(), choices = new Map(), storage = new Map();
  const scripts = [], removedCookies = [];
  if (saved !== undefined) storage.set('orthomedica:analytics-consent:v1', JSON.stringify(saved));
  const button = value => ({ dataset: { consent: value }, addEventListener: (_, fn) => choices.set(value, fn) });
  const banner = { hidden: true, querySelector: () => ({ focus() {} }) };
  const root = { dataset: { measurementId: 'G-TEST12345' }, querySelectorAll: () => [button('granted'), button('denied')] };
  const preferences = { addEventListener: (_, fn) => events.set('preferences', fn) };
  globalThis.window = { location: { origin: 'https://orthomedica.lubin.pl' } };
  globalThis.location = { hostname: 'orthomedica.lubin.pl' };
  globalThis.localStorage = { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v) };
  globalThis.Element = class { constructor(href) { this.href = href; } closest() { return this; } getAttribute() { return this.href; } };
  globalThis.document = {
    getElementById: id => ({ 'analytics-settings': root, 'analytics-consent': banner, 'analytics-preferences': preferences })[id],
    createElement: () => ({}),
    head: { append: script => scripts.push(script) },
    addEventListener: (name, fn) => events.set(name, fn),
    get cookie() { return '_ga=test; _ga_TEST=abc; essential=keep'; },
    set cookie(value) { removedCookies.push(value); },
  };
  initAnalytics();
  return {
    banner, scripts, removedCookies,
    choose: value => choices.get(value)(),
    click: href => events.get('click')({ target: new Element(href) }),
    success: () => events.get('orthomedica:contact-success')(),
    queue: () => (window.dataLayer || []).map(args => [...args]),
    preferences: () => events.get('preferences')(),
  };
}

test('no Google request or event before consent; rejection remains functional', () => {
  const app = setup();
  assert.equal(app.banner.hidden, false);
  app.click('tel:+48694731124');
  app.success();
  assert.equal(app.scripts.length, 0);
  assert.deepEqual(app.queue(), []);
  app.choose('denied');
  assert.equal(app.banner.hidden, true);
  app.click('https://wa.me/48694731124');
  assert.deepEqual(app.queue(), []);
  app.preferences();
  assert.equal(app.banner.hidden, false);
});

test('acceptance loads one tag; contact events contain no form content or medical path', () => {
  const app = setup();
  app.choose('granted');
  app.choose('granted');
  assert.equal(app.scripts.length, 1);
  app.click('tel:+48694731124');
  app.click('https://wa.me/48694731124');
  app.success();
  const events = app.queue().filter(args => args[0] === 'event');
  assert.deepEqual(events.map(e => [e[1], e[2].contact_method]), [
    ['contact_click', 'phone'], ['contact_click', 'whatsapp'], ['generate_lead', 'form'],
  ]);
  for (const event of events) {
    assert.equal(event[2].page_location, 'https://orthomedica.lubin.pl/');
    assert.deepEqual(Object.keys(event[2]).sort(), ['contact_method', 'page_location', 'page_referrer', 'page_title'].sort());
  }
});

test('withdrawal stops further events and expires only analytics cookies', () => {
  const app = setup();
  app.choose('granted');
  app.success();
  const count = app.queue().length;
  app.choose('denied');
  app.success();
  app.click('tel:+48694731124');
  assert.equal(app.queue().length, count);
  assert.equal(window['ga-disable-G-TEST12345'], true);
  assert.ok(app.removedCookies.length > 0);
  assert.ok(app.removedCookies.every(cookie => cookie.startsWith('_ga')));
});

test('current consent is restored while expired or malformed choices request consent again', () => {
  assert.equal(setup({ value: 'granted', savedAt: Date.now() }).scripts.length, 1);
  assert.equal(setup({ value: 'denied', savedAt: Date.now() }).scripts.length, 0);
  const expired = setup({ value: 'granted', savedAt: 1 });
  assert.equal(expired.scripts.length, 0);
  assert.equal(expired.banner.hidden, false);
  const invalid = setup({ value: 'other', savedAt: Date.now() });
  assert.equal(invalid.banner.hidden, false);
});

