import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todosKeys, todosMutations, todosQueries } from "../queries";

import type { House } from "@/features/houses/types";

// TODO: Optimize query invalidation
export const todosHooks = {
    useList(
        houseSlug: House["slug"],
        options?: { page?: number; limit?: number },
    ) {
        return useQuery(todosQueries.list(houseSlug, options));
    },

    useDetails(houseSlug: House["slug"], id: string) {
        return useQuery(todosQueries.details(houseSlug, id));
    },

    useCreate(houseSlug: House["slug"]) {
        const queryClient = useQueryClient();

        return useMutation({
            ...todosMutations.create(houseSlug),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: [...todosKeys.base()],
                });
            },
        });
    },

    useUpdate(houseSlug: House["slug"]) {
        const queryClient = useQueryClient();

        return useMutation({
            ...todosMutations.update(houseSlug),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: [...todosKeys.base()],
                });
            },
        });
    },

    useDelete(houseSlug: House["slug"]) {
        const queryClient = useQueryClient();

        return useMutation({
            ...todosMutations.delete(houseSlug),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: [...todosKeys.base()],
                });
            },
        });
    },
};
