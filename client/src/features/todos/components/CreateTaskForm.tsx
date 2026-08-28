import { toast } from "sonner";
import { todosHooks } from "../hooks";

import { Spinner } from "@/components/ui/spinner";
import { TaskForm } from "./TaskForm";

import type { House } from "@/features/houses/types";
import type { createTodoSchema } from "@casa/schemas";
import type { z } from "zod";

type FormValues = z.input<typeof createTodoSchema>;

interface Props {
    slug: House["slug"];
}

export const CreateTaskForm = ({ slug }: Props) => {
    const { mutateAsync: createTodo, isPending: isCreating } =
        todosHooks.useCreate(slug);

    const onSubmit = (data: FormValues) => {
        toast.promise(createTodo(data), {
            loading: "Creating task...",
            success: () => {
                return "Task created successfully!";
            },
            error: (err) => err?.message ?? "An unexpected error occurred",
        });
    };

    return (
        <TaskForm
            defaultValues={{
                title: "",
                visibility: "PRIVATE",
                dueDate: undefined,
                subTasks: [],
            }}
            onSubmit={onSubmit}
            submitLabel={
                isCreating ? (
                    <>
                        <Spinner />
                        Creating...
                    </>
                ) : (
                    "Create task"
                )
            }
            isSubmitting={isCreating}
            showReset
        />
    );
};
