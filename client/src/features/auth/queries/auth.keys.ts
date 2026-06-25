export const authKeys = {
    base: () => ["auth"] as const,
    session: () => [...authKeys.base(), "session"] as const,
};
