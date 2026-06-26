import { authClient } from "@/features/auth/auth.client";

import type { House, HouseDto } from "../types";

export const housesApi = {
    async getAll() {
        const { data, error } = await authClient.organization.list();

        if (error) throw error;

        return data;
    },

    async getDetails(slug: House["slug"]) {
        const { data, error } =
            await authClient.organization.getFullOrganization({
                query: {
                    organizationSlug: slug,
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

    async update({ id, input }: { id: House["id"]; input: HouseDto }) {
        const { data, error } = await authClient.organization.update({
            organizationId: id,
            data: {
                name: input.name,
            },
        });

        if (error) throw error;

        return data;
    },

    async delete(id: House["id"]) {
        const { data, error } = await authClient.organization.delete({
            organizationId: id,
        });

        if (error) throw error;

        return data;
    },

    async getMembers(slug: House["slug"], page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { data, error } = await authClient.organization.listMembers({
            query: {
                organizationSlug: slug,
                limit,
                offset,
            },
        });

        if (error) throw error;

        const totalPages = Math.ceil(data.total / limit);

        return {
            data: data.members,
            pagination: {
                page,
                limit,
                total: data.total,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    },
};
