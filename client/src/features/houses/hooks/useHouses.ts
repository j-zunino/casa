import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { housesKeys, housesMutations, housesQueries } from '../queries';

export const useHouses = {
    useAll() {
        return useQuery(housesQueries.all());
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

    useDelete() {
        const queryClient = useQueryClient();

        return useMutation({
            ...housesMutations.delete(),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: housesKeys.base(),
                });
            },
        });
    },
};
