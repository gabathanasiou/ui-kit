/** Replaces non-breaking spaces (entity or raw) with regular spaces. */
export declare function normalizeSpaces(text: string): string;
export declare function sanitizeRichText(html: string): string;
/** Removes all markup — used for showKeys previews and empty-value checks. */
export declare function stripRichText(html: string): string;
export declare function escapeHtml(text: string): string;
