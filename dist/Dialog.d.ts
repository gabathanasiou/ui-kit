import React from 'react';
interface ConfirmOptions {
    title: string;
    message?: string;
    danger?: boolean;
    suppressKey?: string;
}
interface PromptOptions {
    title: string;
    defaultValue?: string;
    placeholder?: string;
    message?: string;
}
interface AlertOptions {
    title: string;
    message?: string;
}
interface DialogContextType {
    confirm: (opts: ConfirmOptions) => Promise<boolean>;
    prompt: (opts: PromptOptions) => Promise<string | null>;
    alert: (opts: AlertOptions) => Promise<void>;
}
export declare function useDialog(): DialogContextType;
export declare function DialogProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export {};
