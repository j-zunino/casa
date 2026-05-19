export const housesKeys = {
    base: () => ['houses'] as const,
    list: () => [...housesKeys.base(), 'list'] as const,
    active: () => [...housesKeys.base(), 'active'] as const,
};
