import { authClient } from '@/features/auth/auth.client';
import { api } from '@/lib/api';

import type { House } from '../types';

export const housesApi = {
    async getAll() {
        const result = await authClient.organization.list();
        return result.data;
    },

    async getById(id: House['id']) {
        const result = await authClient.organization.getFullOrganization({
            query: {
                organizationId: id,
                membersLimit: 10,
            },
        });
        return result.data;
    },

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
