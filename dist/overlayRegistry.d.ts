/** Register an overlay as THE open one — any previously open overlay is
 *  dismissed first. Returns the unregister fn (call on close/unmount). */
export declare function registerOverlayClose(close: () => void): () => void;
