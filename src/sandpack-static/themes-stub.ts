/**
 * Stub for `@codesandbox/sandpack-themes`. After the sandbox was made static
 * nothing imports theme objects anymore, but `docusaurus.config.js` aliases the
 * package here defensively so a stray import can never re-introduce the removed
 * dependency at build time. Empty theme objects are enough for any residual
 * spread usage.
 */
export const nightOwl = { colors: {} } as Record<string, any>;
export const aquaBlue = { colors: {} } as Record<string, any>;
