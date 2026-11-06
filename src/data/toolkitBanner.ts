// Toolkit page banner (Job B, approved Nov 6, 2026). Swapable; the downloadable one-pager stays undated.
// Banner A shows through the Live day (Eastern time). Banner B (replay) shows after it,
// but only once REPLAY_URL is filled in with the link Michelle OKs (Facebook replay or YouTube @hometowntc).
// Until then, no banner shows after the Live.

export const LIVE_LAST_DAY = '2026-11-24'; // YYYY-MM-DD, America/New_York

// [PASTE REPLAY URL AFTER THE LIVE — Facebook replay or YouTube @hometowntc only after Michelle OKs the upload]
export const REPLAY_URL = '';

export const BANNER_A = {
  eyebrow: 'Going live',
  title: 'How to Take a Vacation Without Your Files Falling Apart',
  whenWhere: 'Tuesday, November 24, 2026 · 12:00–1:00 PM ET · Facebook · YChase007 · Public',
  supporting:
    'For producing Florida agents who want dependable coverage so they can step away without losing control — and without handing over licensed work.',
  button: { label: 'Watch on Facebook', url: 'https://www.facebook.com/YChase007' },
  secondary: 'Grab the free toolkit below.',
};

export const BANNER_B = {
  eyebrow: 'Replay',
  title: 'How to Take a Vacation Without Your Files Falling Apart',
  supporting:
    'Missed it live? Watch the replay, then write your coverage list so the work has a name — not a hope — before you leave.',
  button: { label: 'Watch the replay', url: REPLAY_URL },
  secondary: 'Grab the Pre-Leave Coverage List below.',
};
