import React from 'react';
/**
 * Floating device-mode toggle — the round 48px button pinned over the app
 * (keyboard input on/off, select mode on touch devices). Owns the three-state
 * chrome (idle / lit / warn); the consumer owns the state, the icon, the
 * accessible labels and the pinned position (`style` overrides `bottom`/`right`).
 */
export interface FloatingToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Lit (on) frame — blue. */
    active?: boolean;
    /** Warning frame — amber (takes precedence over `active`). */
    warn?: boolean;
}
export default function FloatingToggle({ active, warn, style, className, type, children, ...rest }: FloatingToggleProps): React.JSX.Element;
