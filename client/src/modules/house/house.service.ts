import { authClient } from '../auth';

// TODO: Move logic to server

// NOTE: Should be done in the server
const generateSlug = (input: string) => {
    return input
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export const handleHouseCreation = async (name: string) => {
    // TODO: Check if slug is already used
    const slug = generateSlug(name);

    const { data, error } = await authClient.organization.create({
        name: name,
        slug: slug,
    });

    if (error) throw new Error(error.message);

    return data;
};
