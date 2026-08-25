export type TodoDto = {
    id: string;
    title: string;
    description: string | null;
    visibility: "PUBLIC" | "PRIVATE";
    isCompleted: boolean;
    dueDate: Date | null;
    parentId: string | null;
    subTasks?: TodoDto[];
    createdById: string;
    updatedById: string | null;
    createdAt: Date;
    updatedAt: Date;
};
