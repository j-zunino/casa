import { authClient } from '@/features/auth/auth.client';

import type { House, HouseDto } from '../types';

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

    async create(input: HouseDto) {
        const { data, error } = await authClient.organization.create({
            name: input.name,
            // HACK: Pass temp slug and generate in server with before hooks
            //       https://better-auth.com/docs/concepts/hooks
            slug: crypto.randomUUID(),
        });

        if (error) throw error;

        return data;
    },

    async delete(id: House['id']) {
        const { data, error } = await authClient.organization.delete({
            organizationId: id,
        });

        if (error) throw error;

        return data;
    },
};
