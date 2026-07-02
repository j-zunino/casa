export const normalizeHouseError = (message: string) =>
    message.replace(/\borganization\b/gi, "house");
