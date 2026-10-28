/* fork: DOM cells ------------------------------------------------------------
   Glide paints cells on a canvas, so there is no place for a real control.
   This wrapper mounts a click-through layer above the canvas and pins one
   absolutely-positioned box per requested cell, measured with the editor's own
   getBounds() and re-pinned from the library's visible-region stream.

   API: pass `getDomCell(col, row) -> ReactNode | null`. The node is rendered
   during React render (never cached), so host state updates flow through.
   Assumes no row-marker column (column indices are data columns).
--------------------------------------------------------------------------- */
import * as React from "react";
import { DataEditorAll } from "../data-editor-all.js";

export const DataEditorWithDomCells = React.forwardRef(function DataEditorWithDomCells(props, ref) {
    const { getDomCell, onVisibleRegionChanged, onCellActivated, domCellClassName, gridSelection, ...rest } = props;
    const focusedCell = gridSelection?.current?.cell;
    const innerRef = React.useRef(null);
    React.useImperativeHandle(ref, () => innerRef.current, []);
    const wrapRef = React.useRef(null);
    const layerRef = React.useRef(null);
    const visibleRef = React.useRef(null);
    const [boxes, setBoxes] = React.useState([]);

    const measure = React.useCallback(() => {
        const grid = innerRef.current;
        const wrap = wrapRef.current;
        if (grid == null || wrap == null) return;
        const wr = wrap.getBoundingClientRect();
        const vis = visibleRef.current;
        const next = [];
        if (vis != null) {
            const x0 = Math.max(0, Math.floor(vis.x));
            const x1 = Math.ceil(vis.x + vis.width);
            const y0 = Math.max(0, Math.floor(vis.y));
            const y1 = Math.ceil(vis.y + vis.height);
            for (let row = y0; row < y1; row++) {
                for (let col = x0; col < x1; col++) {
                    const b = grid.getBounds(col, row);
                    if (b == null) continue;
                    if (b.y + b.height < wr.top || b.y > wr.bottom) continue;
                    if (b.x + b.width < wr.left || b.x > wr.right) continue;
                    next.push({
                        col,
                        row,
                        left: Math.round(b.x - wr.left),
                        top: Math.round(b.y - wr.top),
                        width: Math.round(b.width),
                        height: Math.round(b.height),
                    });
                }
            }
        }
        setBoxes(prev => {
            if (prev.length !== next.length) return next;
            for (let i = 0; i < next.length; i++) {
                const a = prev[i];
                const b = next[i];
                if (a.col !== b.col || a.row !== b.row || a.left !== b.left || a.top !== b.top || a.width !== b.width || a.height !== b.height) return next;
            }
            return prev;
        });
    }, []);

    // Re-measure after every render: data/column/size changes all land here.
    React.useLayoutEffect(() => {
        measure();
    });

    React.useEffect(() => {
        const wrap = wrapRef.current;
        if (wrap == null) return undefined;
        const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => measure()) : null;
        if (ro != null) ro.observe(wrap);
        const onScroll = () => { requestAnimationFrame(measure); };
        window.addEventListener("scroll", onScroll, true);
        return () => {
            if (ro != null) ro.disconnect();
            window.removeEventListener("scroll", onScroll, true);
        };
    }, [measure]);

    // Enter (or Space) on a selected cell activates its DOM content when the
    // cell holds exactly ONE control — the keyboard way to "press the button".
    const handleActivated = React.useCallback((cell, event) => {
        onCellActivated?.(cell, event);
        const [col, row] = cell;
        const box = layerRef.current?.querySelector('[data-glide-dom-cell="' + col + ':' + row + '"]');
        if (box == null) return;
        const focusables = box.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length !== 1) return;
        const el = focusables[0];
        // A BUTTON is an action, not a field: fire it and KEEP the grid's focus
        // (the selection rectangle stays on the cell; no focus ring inside the
        // DOM). Fields (inputs/pickers) still take focus so you can type.
        const isButton = el.tagName === "BUTTON" || el.getAttribute("role") === "button";
        if (typeof el.click === "function") el.click();
        if (isButton) {
            innerRef.current?.focus();
        } else if (typeof el.focus === "function") {
            el.focus();
        }
    }, [onCellActivated]);

    const handleVisible = React.useCallback((range, tx, ty, extras) => {
        visibleRef.current = range;
        requestAnimationFrame(measure);
        onVisibleRegionChanged?.(range, tx, ty, extras);
    }, [measure, onVisibleRegionChanged]);

    return React.createElement(
        "div",
        { ref: wrapRef, style: { position: "relative", width: "100%" }, "data-glide-dom-wrap": "" },
        React.createElement(DataEditorAll, Object.assign({}, rest, { ref: innerRef, gridSelection: gridSelection, onVisibleRegionChanged: handleVisible, onCellActivated: handleActivated })),
        React.createElement(
            "div",
            { ref: layerRef, style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }, "data-glide-dom-layer": "" },
            boxes.map(b => {
                const entry = getDomCell?.(b.col, b.row);
                if (entry == null || entry === false) return null;
                // A spec may opt into a click-through box: only its own
                // interactive children (e.g. a chevron button) capture.
                const spec = (typeof entry === "object" && !React.isValidElement(entry) && "node" in entry) ? entry : null;
                const node = spec != null ? spec.node : entry;
                if (node == null || node === false) return null;
                return React.createElement(
                    "div",
                    {
                        key: b.col + ":" + b.row,
                        className: domCellClassName,
                        ref: el => {
                            if (el == null) return;
                            // A "button-only" cell (exactly one focusable and it
                            // is a BUTTON) gets the hover tint when focused; any
                            // other DOM cell only keeps the selection rectangle.
                            const focusables = el.querySelectorAll(
                                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                            );
                            // Passthrough boxes are affordances over a native
                            // cell (e.g. a picker chevron) — never "button-only".
                            const isPassthrough = el.getAttribute("data-glide-dom-passthrough") === "true";
                            const isButton = !isPassthrough && focusables.length === 1 && focusables[0].tagName === "BUTTON";
                            if (isButton) el.setAttribute("data-glide-dom-button", "true");
                            else el.removeAttribute("data-glide-dom-button");
                        },
                        "data-glide-dom-cell": b.col + ":" + b.row,
                        /* The grid's selection rectangle is on this cell: paint
                           the same hover wash the canvas rows use, so the DOM
                           cell reads as hovered. */
                        "data-glide-dom-focused": focusedCell != null && focusedCell[0] === b.col && focusedCell[1] === b.row ? "true" : undefined,
                        "data-glide-dom-passthrough": spec != null && spec.passthrough === true ? "true" : undefined,
                        style: {
                            position: "absolute",
                            left: b.left,
                            top: b.top,
                            width: b.width,
                            height: b.height,
                            /* Glide's cell padding (4px vertical, 8px
                               horizontal is the theme default; the drawn kit
                               faces use 4px all round) so host controls line
                               up with painted cells. */
                            /* `bleed` = the control IS the cell (edge-to-edge hit
                               target); otherwise the cell's 4px inset + vertical
                               centring apply. */
                            padding: spec != null && spec.bleed === true ? 0 : 4,
                            boxSizing: "border-box",
                            pointerEvents: spec != null && spec.passthrough === true ? "none" : "auto",
                            display: spec != null && spec.bleed === true ? "block" : "flex",
                            alignItems: "center",
                            /* The cell is a CONTAINER: the host arranges its own
                               buttons/fields inside (and may overflow the box
                               for a morph that expands). */
                            overflow: "visible",
                        },
                    },
                    node
                );
            })
        )
    );
});
