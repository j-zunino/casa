import { mutationOptions } from '@tanstack/react-query';
import { housesApi } from '../api';

export const housesMutations = {
    create() {
        return mutationOptions({
            mutationFn: housesApi.create,
        });
    },

    delete() {
        return mutationOptions({
            mutationFn: housesApi.delete,
        });
    },
};
