import type { House } from '@/features/houses/types';
import { api } from '@/lib/api';

export const invitesApi = {
    async getAll(houseSlug: House['slug']) {
        const response = api(`/invites/list/${houseSlug}`);
        return response;
    },

    // TODO: Create invite type
    async getDetails(inviteCode: string) {
        const response = api(`/invites/${inviteCode}`);
        return response;
    },

    async create(houseSlug: House['slug'], maxUses: number) {
        const response = api(`/invites/create/${houseSlug}`, {
            method: 'POST',
            body: JSON.stringify({
                maxUses,
            }),
        });
        return response;
    },

    async join(inviteCode: string) {
        const response = api(`/invites/${inviteCode}/join`, {
            method: 'POST',
        });
        return response;
    },
};
