export function isEdgeUserAgent(userAgent = '') {
  return /Edg\//.test(userAgent);
}

export function isChromeUserAgent(userAgent = '') {
  return (
    /Chrome\//.test(userAgent) &&
    !isEdgeUserAgent(userAgent) &&
    !/OPR\//.test(userAgent) &&
    !/SamsungBrowser\//.test(userAgent)
  );
}

export function isDesktopComputer({ userAgent = '', mobileHint, maxTouchPoints = 0 } = {}) {
  if (mobileHint === true) return false;
  if (mobileHint === false) return true;

  if (/iPhone|iPod|Windows Phone|IEMobile/i.test(userAgent)) return false;
  if (/iPad/i.test(userAgent)) return false;
  if (/Android.*Mobile/i.test(userAgent)) return false;
  if (/Android/i.test(userAgent)) return false;
  if (/Macintosh/i.test(userAgent) && maxTouchPoints > 1) return false;

  return true;
}

export function isSupportedEnvironment(env = {}) {
  const { userAgent = '', mobileHint, maxTouchPoints } = env;
  if (!isDesktopComputer({ userAgent, mobileHint, maxTouchPoints })) return false;
  return isChromeUserAgent(userAgent) || isEdgeUserAgent(userAgent);
}

export function shouldShowBrowserCompatibilityWarning(env = {}) {
  return !isSupportedEnvironment(env);
}

export const BROWSER_COMPATIBILITY_MESSAGE =
  'May not be compatible with this browser, please try Chrome or Edge on a computer instead.';
