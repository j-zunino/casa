import { env } from '@/lib/zod';

export const api = async (path: string, init?: RequestInit) => {
    const response = await fetch(`${env.VITE_API_URL}${path}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers,
        },
        ...init,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
        throw new Error(json.error.message ?? 'Request failed');
    }

    return json.data;
};
