import { mutationOptions } from "@tanstack/react-query";
import { housesApi } from "../api";

export const housesMutations = {
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

    updateRole() {
        return mutationOptions({
            mutationFn: housesApi.updateRole,
        });
    },

    removeMember() {
        return mutationOptions({
            mutationFn: housesApi.removeMember,
        });
    },
};
