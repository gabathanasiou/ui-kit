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
}
export default function Modal({ open, onClose, title, icon, width, footer, children, onReset, morph, }: ModalProps): React.JSX.Element;
export declare function ModalFooter({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
