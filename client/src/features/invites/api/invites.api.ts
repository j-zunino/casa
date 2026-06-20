import type { House } from '@/features/houses/types';
import { api } from '@/lib/api';

export const invitesApi = {
    async getAll(houseSlug: House['slug'], page = 1, limit = 10) {
        return api(`/invites/list/${houseSlug}`, { page, limit });
    },

    // TODO: Create invite type
    async getDetails(inviteCode: string) {
        const { data } = await api(`/invites/${inviteCode}`);
        return data;
    },

    async create(houseSlug: House['slug'], maxUses: number) {
        const { data } = await api(`/invites/create/${houseSlug}`, {
            method: 'POST',
            body: JSON.stringify({
                maxUses,
            }),
        });
        return data;
    },

    async join(inviteCode: string) {
        const { data } = await api(`/invites/${inviteCode}/join`, {
            method: 'POST',
        });
        return data;
    },
};
