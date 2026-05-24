import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isChromeUserAgent,
  isDesktopComputer,
  isEdgeUserAgent,
  isSupportedEnvironment,
  shouldShowBrowserCompatibilityWarning
} from '../src/browserSupport.js';

const CHROME_WINDOWS =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const EDGE_WINDOWS =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0';
const FIREFOX_WINDOWS =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0';
const SAFARI_MAC =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15';
const CHROME_ANDROID_PHONE =
  'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.43 Mobile Safari/537.36';
const CHROME_ANDROID_TABLET =
  'Mozilla/5.0 (Linux; Android 13; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.43 Safari/537.36';
const IPAD_MASQUERADE =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15';
const OPERA_WINDOWS =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0';

test('isChromeUserAgent detects desktop Chrome but not Edge or Opera', () => {
  assert.equal(isChromeUserAgent(CHROME_WINDOWS), true);
  assert.equal(isChromeUserAgent(EDGE_WINDOWS), false);
  assert.equal(isChromeUserAgent(OPERA_WINDOWS), false);
});

test('isEdgeUserAgent detects Chromium Edge', () => {
  assert.equal(isEdgeUserAgent(EDGE_WINDOWS), true);
  assert.equal(isEdgeUserAgent(CHROME_WINDOWS), false);
});

test('isDesktopComputer respects userAgentData mobile hint', () => {
  assert.equal(isDesktopComputer({ userAgent: CHROME_WINDOWS, mobileHint: false }), true);
  assert.equal(isDesktopComputer({ userAgent: CHROME_WINDOWS, mobileHint: true }), false);
});

test('isDesktopComputer flags phones and tablets from user agent', () => {
  assert.equal(isDesktopComputer({ userAgent: CHROME_ANDROID_PHONE }), false);
  assert.equal(isDesktopComputer({ userAgent: CHROME_ANDROID_TABLET }), false);
  assert.equal(
    isDesktopComputer({ userAgent: IPAD_MASQUERADE, maxTouchPoints: 5 }),
    false
  );
});

test('isSupportedEnvironment allows Chrome or Edge on desktop only', () => {
  assert.equal(isSupportedEnvironment({ userAgent: CHROME_WINDOWS, mobileHint: false }), true);
  assert.equal(isSupportedEnvironment({ userAgent: EDGE_WINDOWS, mobileHint: false }), true);
  assert.equal(isSupportedEnvironment({ userAgent: FIREFOX_WINDOWS, mobileHint: false }), false);
  assert.equal(isSupportedEnvironment({ userAgent: SAFARI_MAC, mobileHint: false }), false);
  assert.equal(
    isSupportedEnvironment({ userAgent: CHROME_ANDROID_PHONE, mobileHint: true }),
    false
  );
});

test('shouldShowBrowserCompatibilityWarning is inverse of supported environment', () => {
  assert.equal(
    shouldShowBrowserCompatibilityWarning({ userAgent: CHROME_WINDOWS, mobileHint: false }),
    false
  );
  assert.equal(
    shouldShowBrowserCompatibilityWarning({ userAgent: FIREFOX_WINDOWS, mobileHint: false }),
    true
  );
});
