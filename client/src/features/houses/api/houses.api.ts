import { api } from '@/lib/api';
import type { House } from '../types';

export const housesApi = {
    async getAll() {
        return api('/api/houses', {
            method: 'GET',
        });
    },

    async getById(id: House['id']) {
        return api(`/api/houses/${id}`, {
            method: 'GET',
        });
    },

    async create(name: House['name']) {
        return api('/api/houses', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
    },
};
