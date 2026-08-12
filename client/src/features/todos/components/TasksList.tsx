import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Pagination } from "@/components/ui/pagination";
import { CalendarDotsIcon, CaretRightIcon } from "@phosphor-icons/react";

import {
    PaginationControls,
    PaginationTotal,
} from "@/components/common/Pagination";

import type { TodoDto } from "@casa/types";
import type { ApiPagination } from "@casa/types";
import type { ComponentProps } from "react";

interface Props {
    todos: TodoDto[];
    pagination?: ApiPagination;
}

const TaskDate = ({ dueDate }: { dueDate: TodoDto["dueDate"] }) => {
    if (!dueDate) return;

    return (
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDotsIcon />
            {format(dueDate.toString(), "MM/d")}
        </span>
    );
};

const TaskItem = ({
    todo,
    className,
    ...props
}: { todo: TodoDto } & ComponentProps<typeof Label>) => {
    return (
        <li>
            <Button
                variant="ghost"
                className={cn("w-full justify-start", className)}
                asChild
            >
                <Label htmlFor={`task-${todo.id}`} {...props}>
                    <Checkbox id={`task-${todo.id}`} />
                    {todo.title}

                    {todo.dueDate && <TaskDate dueDate={todo.dueDate} />}
                </Label>
            </Button>
        </li>
    );
};

const ColapsedTask = ({ todo }: { todo: TodoDto }) => {
    return (
        <Collapsible className="group">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full">
                    <CaretRightIcon className="mr-0.5 group-data-[state=open]:rotate-90" />
                    {todo.title}

                    {todo.dueDate && <TaskDate dueDate={todo.dueDate} />}
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <ul className="flex flex-col">
                    {todo.subTasks.map((subTask) => (
                        <TaskItem
                            key={subTask.id}
                            todo={subTask}
                            className="pl-8"
                        />
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
};

export const TasksList = ({ todos, pagination }: Props) => {
    return (
        <div className="flex flex-col gap-1.5">
            <ul className="flex flex-col">
                {todos.map((todo) =>
                    todo.subTasks.length > 0 ? (
                        <ColapsedTask key={todo.id} todo={todo} />
                    ) : (
                        <TaskItem key={todo.id} todo={todo} />
                    ),
                )}
            </ul>

            {pagination && pagination.totalPages > 1 && (
                <Pagination className="flex items-center justify-between">
                    <PaginationTotal
                        page={pagination.page}
                        total={pagination.total}
                        totalPages={pagination.totalPages}
                    />
                    <PaginationControls
                        page={pagination.page}
                        hasPrevious={pagination.hasPrevious}
                        hasNext={pagination.hasNext}
                    />
                </Pagination>
            )}
        </div>
    );
};
