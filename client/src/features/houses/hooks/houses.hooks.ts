import { router } from "@/main";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { housesKeys, housesMutations, housesQueries } from "../queries";

import type { House } from "../types";

export const housesHooks = {
    useAll() {
        return useQuery(housesQueries.all());
    },

    usePermissions(slug: House["slug"]) {
        return useQuery(housesQueries.permissions(slug));
    },

    useCreate() {
        const queryClient = useQueryClient();

        return useMutation({
            ...housesMutations.create(),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: housesKeys.base(),
                });
            },
        });
    },

    useUpdate() {
        const queryClient = useQueryClient();

        return useMutation({
            ...housesMutations.update(),
            onSuccess: async (updatedHouse) => {
                await queryClient.invalidateQueries({
                    queryKey: housesKeys.base(),
                });

                queryClient.removeQueries({
                    queryKey: housesKeys.detailsBase(),
                });

                router.navigate({
                    to: "/account/houses/$slug",
                    params: {
                        slug: updatedHouse.slug,
                    },
                });
            },
        });
    },

    useDelete() {
        const queryClient = useQueryClient();

        return useMutation({
            ...housesMutations.delete(),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: housesKeys.base(),
                });

                queryClient.removeQueries({
                    queryKey: housesKeys.detailsBase(),
                });
            },
        });
    },
};
