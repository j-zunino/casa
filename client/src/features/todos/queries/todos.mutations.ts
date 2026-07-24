import { mutationOptions } from "@tanstack/react-query";
import { todosApi } from "../api";

import type { House } from "@/features/houses/types";

export const todosMutations = {
    create(houseSlug: House["slug"]) {
        return mutationOptions({
            mutationFn: (data: Parameters<typeof todosApi.create>[1]) =>
                todosApi.create(houseSlug, data),
        });
    },

    update(houseSlug: House["slug"]) {
        return mutationOptions({
            mutationFn: ({
                id,
                data,
            }: {
                id: string;
                data: Parameters<typeof todosApi.update>[2];
            }) => todosApi.update(houseSlug, id, data),
        });
    },

    delete(houseSlug: House["slug"]) {
        return mutationOptions({
            mutationFn: (id: string) => todosApi.delete(houseSlug, id),
        });
    },
};
