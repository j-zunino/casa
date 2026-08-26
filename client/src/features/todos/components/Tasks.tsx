import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "@phosphor-icons/react";
import { CreateTaskForm } from "./CreateTaskForm";
import { TasksList } from "./TasksList";

import type { House } from "@/features/houses/types";
import type { ApiPagination, TodoDto } from "@casa/types";
import type { ComponentProps } from "react";

interface TasksProps {
    slug: House["slug"];
    todos: TodoDto[];
    pagination?: ApiPagination;
}

type TaskCreatorProps = Pick<TasksProps, "slug">;

const NewTaskButton = ({ ...props }: ComponentProps<typeof Button>) => {
    return (
        <Button variant="outline" className="w-full" {...props}>
            <PlusIcon /> New task
        </Button>
    );
};

export const Tasks = ({ slug, todos, pagination }: TasksProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
                {isDesktop ? (
                    <TasksPopover slug={slug} />
                ) : (
                    <TasksDialog slug={slug} />
                )}

                <TasksList slug={slug} todos={todos} pagination={pagination} />
            </CardContent>
        </Card>
    );
};

export const TasksPopover = ({ slug }: TaskCreatorProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <NewTaskButton />
            </PopoverTrigger>

            <PopoverContent className="w-md" align="start">
                <PopoverHeader>
                    <PopoverTitle>Create new task</PopoverTitle>
                </PopoverHeader>

                <CreateTaskForm slug={slug} />
            </PopoverContent>
        </Popover>
    );
};

export const TasksDialog = ({ slug }: TaskCreatorProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <NewTaskButton />
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new task</DialogTitle>
                </DialogHeader>

                <CreateTaskForm slug={slug} />
            </DialogContent>
        </Dialog>
    );
};
