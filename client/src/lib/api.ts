import { env } from "@/lib/zod";

import type { ApiPagination } from "@casa/types";

type ApiOptions = RequestInit & { page?: number; limit?: number };

export async function api<T>(
    path: string,
    options?: ApiOptions,
): Promise<{ data: T; pagination?: ApiPagination }> {
    const { page, limit, ...init } = options ?? {};

    const params = new URLSearchParams();
    if (page !== undefined) params.set("page", String(page));
    if (limit !== undefined) params.set("limit", String(limit));
    const qs = params.toString();

    const response = await fetch(
        `${env.VITE_API_URL}/api${path}${qs ? `?${qs}` : ""}`,
        {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(init.headers as Record<string, string> | undefined),
            },
            ...init,
        },
    );

    let json: Record<string, unknown>;

    try {
        json = await response.json();
    } catch {
        throw new Error(`Request failed with status ${response.status}`);
    }

    if (!response.ok || !json.success) {
        const error = json.error as { message?: string } | undefined;
        throw new Error(error?.message ?? "Request failed");
    }

    return {
        data: json.data as T,
        pagination: json.pagination as ApiPagination | undefined,
    };
}
