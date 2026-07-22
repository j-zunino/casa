import type { Client } from "@/config";
import type {
    TodoCreateArgs,
    TodoDeleteArgs,
    TodoFindManyArgs,
    TodoFindUniqueArgs,
    TodoUpdateArgs,
} from "@/generated/prisma/models";

export const todosQueries = {
    findMany(client: Client, options: TodoFindManyArgs) {
        return client.todo.findMany({ ...options });
    },

    findUnique(client: Client, options: TodoFindUniqueArgs) {
        return client.todo.findUnique({ ...options });
    },

    create(client: Client, options: TodoCreateArgs) {
        return client.todo.create({ ...options });
    },

    update(client: Client, options: TodoUpdateArgs) {
        return client.todo.update({ ...options });
    },

    delete_(client: Client, options: TodoDeleteArgs) {
        return client.todo.delete({ ...options });
    },

    count(client: Client, where: TodoFindManyArgs["where"]) {
        return client.todo.count({ where });
    },
};
