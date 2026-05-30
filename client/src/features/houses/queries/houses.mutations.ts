import { mutationOptions } from '@tanstack/react-query';
import { housesApi } from '../api';

export const housesMutations = {
    setActive() {
        return mutationOptions({
            mutationFn: housesApi.setActive,
        });
    },

    create() {
        return mutationOptions({
            mutationFn: housesApi.create,
        });
    },

    update() {
        return mutationOptions({
            mutationFn: housesApi.update,
        });
    },

    delete() {
        return mutationOptions({
            mutationFn: housesApi.delete,
        });
    },
};
