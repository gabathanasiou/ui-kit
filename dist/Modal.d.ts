import React from 'react';
export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    icon?: React.ReactNode;
    width?: string;
    footer?: React.ReactNode;
    children: React.ReactNode;
    onReset?: () => void;
    /** Stack/zoom/size transitions on this instance (default true). */
    morph?: boolean;
    /** Flat "dialog" chrome: no header bar or footer bar (no borders/bands) —
       the title row and the footer row sit on the same surface as the body.
       The Dialog (confirm/prompt/alert) renders through this mode. Same
       animations, drag and Enter-confirm as the regular chrome. */
    flat?: boolean;
}
export default function Modal({ open, onClose, title, icon, width, footer, children, onReset, morph, flat, }: ModalProps): React.JSX.Element;
export declare function ModalFooter({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
