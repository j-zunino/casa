export type TodoDto = {
    id: string;
    title: string;
    description: string | null;
    visibility: "PUBLIC" | "PRIVATE";
    isCompleted: boolean;
    createdById: string;
    updatedById: string | null;
    createdAt: Date;
    updatedAt: Date;
};
