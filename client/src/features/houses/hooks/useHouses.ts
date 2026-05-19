import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { housesApi } from '../api';
import { housesKeys, housesQueries } from '../queries';

export const useHouses = {
    useAll() {
        return useQuery(housesQueries.all());
    },

    useCreate() {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: housesApi.create,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: housesKeys.base(),
                });
            },
        });
    },
};
