import { authClient } from '@/features/auth/auth.client';
import type { House } from '@/features/auth/types';
import { router } from '@/main.tsx';

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
    const slug = generateSlug(name);

    const { data, error } = await authClient.organization.create({
        name: name,
        slug: slug,
    });

    if (error) throw new Error(error.message);

    return data;
};

export const setActiveHouse = async (
    houseId: House['id'],
    houseSlug: House['slug'],
    path: string | undefined = '/h/$slug',
) => {
    const { data, error } = await authClient.organization.setActive({
        organizationId: houseId,
    });

    if (error) throw new Error(error.message);

    router.navigate({ to: path, params: { slug: houseSlug } });

    return data;
};

export const handleDeleteHouse = async (houseId: House['id']) => {
    const { data, error } = await authClient.organization.delete({
        organizationId: houseId,
    });

    if (error) throw new Error(error.message);

    router.navigate({ to: '/' });

    return data;
};
