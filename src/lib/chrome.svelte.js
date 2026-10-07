// Page chrome the homepage intro takes over for a moment.
// The intro card holds the header back, then releases it so it drops in from above.
export const chrome = $state({ headerHeld: false });

export function holdHeader() { chrome.headerHeld = true; }
export function releaseHeader() { chrome.headerHeld = false; }
