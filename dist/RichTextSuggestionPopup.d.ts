import { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion';
import type { TokenItem } from './TokenExtension';
export type TokenSuggestionProps = SuggestionProps<TokenItem, {
    field: string;
}>;
/** The suggestion renderer for the Token extension's `@` trigger. */
export declare const TokenSuggestion: SuggestionOptions<TokenItem, {
    field: string;
}>['render'];
