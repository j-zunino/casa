import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todosKeys, todosMutations, todosQueries } from "../queries";

import type { House } from "@/features/houses/types";
import type { TodoDto } from "@casa/types";

const toggleTodoInList = (
    todos: TodoDto[],
    id: string,
    isCompleted: boolean,
): TodoDto[] =>
    todos.map((todo) => {
        if (todo.id === id) {
            return {
                ...todo,
                isCompleted,
                subTasks: todo.subTasks?.map((subTask) => ({
                    ...subTask,
                    isCompleted,
                })),
            };
        }

        if (todo.subTasks?.some((subTask) => subTask.id === id)) {
            const subTasks = todo.subTasks.map((subTask) =>
                subTask.id === id ? { ...subTask, isCompleted } : subTask,
            );

            return {
                ...todo,
                subTasks,
                isCompleted: subTasks.every((subTask) => subTask.isCompleted),
            };
        }

        return todo;
    });

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

    useToggle(houseSlug: House["slug"]) {
        const queryClient = useQueryClient();
        const listKey = [...todosKeys.base(), "list", houseSlug] as const;

        return useMutation({
            ...todosMutations.toggle(houseSlug),
            onMutate: async ({ id, isCompleted }) => {
                await queryClient.cancelQueries({ queryKey: listKey });

                const snapshots = queryClient.getQueriesData({
                    queryKey: listKey,
                });

                queryClient.setQueriesData<{ data: TodoDto[] }>(
                    { queryKey: listKey },
                    (old) =>
                        old
                            ? {
                                  ...old,
                                  data: toggleTodoInList(
                                      old.data,
                                      id,
                                      isCompleted,
                                  ),
                              }
                            : old,
                );

                return { snapshots };
            },
            onError: (_error, _vars, context) => {
                context?.snapshots.forEach(([key, data]) =>
                    queryClient.setQueryData(key, data),
                );
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: listKey });
            },
        });
    },
};
