"use client";
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

const IDLE = {
  border: '1px solid #d4d4d8',
  background: 'rgba(255,255,255,0.94)',
  color: '#52525b',
  boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
};
const LIT = {
  border: '2px solid #2563eb',
  background: '#2563eb',
  color: '#fff',
  boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
};
const WARN = {
  border: '1px solid #f59e0b',
  background: 'rgba(255, 251, 235, 0.94)',
  color: '#b45309',
  boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
};

export default function FloatingToggle({
  active = false,
  warn = false,
  style,
  className = '',
  type = 'button',
  children,
  ...rest
}: FloatingToggleProps) {
  return (
    <button
      type={type}
      className={`fixed z-[100] flex cursor-pointer items-center justify-center ${className}`}
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        touchAction: 'manipulation',
        backdropFilter: 'blur(8px)',
        ...(warn ? WARN : active ? LIT : IDLE),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
