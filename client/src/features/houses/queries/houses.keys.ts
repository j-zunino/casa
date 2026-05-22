import type { House } from '../types';

export const housesKeys = {
    base: () => ['houses'] as const,
    list: () => [...housesKeys.base(), 'list'] as const,
    active: () => [...housesKeys.base(), 'active'] as const,
    // TODO: Check if id is necessary, can cause duplicated cache
    detailsBase: () => [...housesKeys.base(), 'details'] as const,
    details: (input: { id?: House['id']; slug?: House['slug'] }) =>
        [...housesKeys.detailsBase(), input] as const,
};
