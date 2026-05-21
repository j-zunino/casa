import { authClient } from '@/features/auth/auth.client';
import { api } from '@/lib/api';

import type { House } from '../types';

export const housesApi = {
    async getAll() {
        const { data, error } = await authClient.organization.list();

        if (error) throw error;

        return data;
    },

    async getById(id: House['id']) {
        const { data, error } =
            await authClient.organization.getFullOrganization({
                query: {
                    organizationId: id,
                    membersLimit: 10,
                },
            });

        if (error) throw error;

        return data;
    },

    // TODO: Replace with better auth
    async create(name: House['name']) {
        return api('/api/houses', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
    },

    async delete(id: House['id']) {
        return api(`/api/houses/${id}`, {
            method: 'DELETE',
        });
    },
};
