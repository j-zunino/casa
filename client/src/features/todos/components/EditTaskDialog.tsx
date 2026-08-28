import { toast } from "sonner";
import { todosHooks } from "../hooks";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { SealWarningIcon, TrashIcon } from "@phosphor-icons/react";
import { TaskForm } from "./TaskForm";

import type { House } from "@/features/houses/types";
import type { TodoDto } from "@casa/types";
import type { CreateFormValues } from "./TaskForm";

interface Props {
    todo: TodoDto;
    slug: House["slug"];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const EditTaskDialog = ({ todo, slug, open, onOpenChange }: Props) => {
    const { mutateAsync: updateTodo, isPending: isUpdating } =
        todosHooks.useUpdate(slug);
    const { mutateAsync: deleteTodo, isPending: isDeleting } =
        todosHooks.useDelete(slug);

    const onSubmit = (data: CreateFormValues) => {
        toast.promise(updateTodo({ id: todo.id, data }), {
            loading: "Saving changes...",
            success: () => {
                onOpenChange(false);

                return "Task updated successfully!";
            },
            error: (err) => err?.message ?? "An unexpected error occurred",
        });
    };

    const onDelete = () => {
        toast.promise(deleteTodo(todo.id), {
            loading: "Deleting task...",
            success: () => {
                onOpenChange(false);

                return "Task deleted successfully!";
            },
            error: (err) => err?.message ?? "An unexpected error occurred",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
                    <DialogDescription>
                        Update the task details or delete it.
                    </DialogDescription>
                </DialogHeader>

                <TaskForm
                    defaultValues={{
                        title: todo.title,
                        visibility: todo.visibility,
                        dueDate: todo.dueDate
                            ? new Date(todo.dueDate)
                            : undefined,
                        subTasks: (todo.subTasks ?? []).map(
                            (subTask) => subTask.title,
                        ),
                    }}
                    onSubmit={onSubmit}
                    submitLabel={
                        isUpdating ? (
                            <>
                                <Spinner />
                                Saving...
                            </>
                        ) : (
                            "Save changes"
                        )
                    }
                    isSubmitting={isUpdating || isDeleting}
                    footer={
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    disabled={isUpdating || isDeleting}
                                    className="mr-auto"
                                >
                                    <TrashIcon />
                                    Delete task
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent size="sm">
                                <AlertDialogHeader>
                                    <AlertDialogMedia>
                                        <SealWarningIcon />
                                    </AlertDialogMedia>

                                    <AlertDialogTitle>
                                        Delete task?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        This will permanently delete this task
                                        and all its sub tasks.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel variant="outline">
                                        Cancel
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        variant="destructive"
                                        onClick={onDelete}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? (
                                            <>
                                                <Spinner />
                                                Deleting task...
                                            </>
                                        ) : (
                                            <>
                                                <TrashIcon />
                                                Delete task
                                            </>
                                        )}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    }
                />
            </DialogContent>
        </Dialog>
    );
};
