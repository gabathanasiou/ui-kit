import React from 'react';
export interface ConfirmOptions {
    title: string;
    message?: string;
    danger?: boolean;
    suppressKey?: string;
}
export interface PromptOptions {
    title: string;
    defaultValue?: string;
    placeholder?: string;
    message?: string;
}
export interface AlertOptions {
    title: string;
    message?: string;
}
interface DialogContextType {
    confirm: (opts: ConfirmOptions) => Promise<boolean>;
    prompt: (opts: PromptOptions) => Promise<string | null>;
    alert: (opts: AlertOptions) => Promise<void>;
}
export declare function useDialog(): DialogContextType;
export declare function DialogProvider({ children, theme, accent, surface }: {
    children: React.ReactNode;
    /** Explicit dialog theme; omit to inherit the nearest ThemeProvider/Scope. */
    theme?: 'light' | 'dark';
    accent?: 'zinc' | 'blue' | 'emerald';
    surface?: 'neutral' | 'accent';
}): React.JSX.Element;
export {};
