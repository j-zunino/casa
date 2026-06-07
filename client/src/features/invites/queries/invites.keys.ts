import type { House } from '@/features/houses/types';

export const invitesKeys = {
    base: () => ['invites'] as const,
    list: (houseSlug: House['slug']) => [...invitesKeys.base(), 'list', houseSlug] as const,
    detailsBase: () => [...invitesKeys.base(), 'details'] as const,
    details: (inviteCode: string) => [...invitesKeys.detailsBase(), inviteCode] as const,
};
