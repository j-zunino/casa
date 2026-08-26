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
import { todosHooks } from "../hooks/todos.hooks";

import type { TodoDto, ApiPagination } from "@casa/types";
import type { House } from "@/features/houses/types";
import type { ComponentProps } from "react";

interface Props {
    slug: House["slug"];
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
    slug,
    className,
    ...props
}: { todo: TodoDto; slug: House["slug"] } & ComponentProps<typeof Label>) => {
    const toggle = todosHooks.useToggle(slug);

    return (
        <li>
            <Button
                variant="ghost"
                className={cn("w-full justify-start", className)}
                asChild
            >
                <Label htmlFor={`task-${todo.id}`} {...props}>
                    <Checkbox
                        id={`task-${todo.id}`}
                        checked={todo.isCompleted}
                        onCheckedChange={(checked) =>
                            toggle.mutate({
                                id: todo.id,
                                isCompleted: checked === true,
                            })
                        }
                    />
                    <span
                        className={cn(
                            todo.isCompleted && "line-through text-muted-foreground",
                        )}
                    >
                        {todo.title}
                    </span>

                    {todo.dueDate && <TaskDate dueDate={todo.dueDate} />}
                </Label>
            </Button>
        </li>
    );
};

const ColapsedTask = ({ todo, slug }: { todo: TodoDto; slug: House["slug"] }) => {
    const toggle = todosHooks.useToggle(slug);

    return (
        <Collapsible className="group">
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full">
                    <Checkbox
                        checked={todo.isCompleted}
                        onCheckedChange={(checked) =>
                            toggle.mutate({
                                id: todo.id,
                                isCompleted: checked === true,
                            })
                        }
                        onClick={(e) => e.stopPropagation()}
                    />
                    <CaretRightIcon className="mr-0.5 group-data-[state=open]:rotate-90" />
                    <span
                        className={cn(
                            todo.isCompleted && "line-through text-muted-foreground",
                        )}
                    >
                        {todo.title}
                    </span>

                    {todo.dueDate && <TaskDate dueDate={todo.dueDate} />}
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <ul className="flex flex-col">
                    {(todo.subTasks ?? []).map((subTask) => (
                        <TaskItem
                            key={subTask.id}
                            todo={subTask}
                            slug={slug}
                            className="pl-8"
                        />
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
};

export const TasksList = ({ slug, todos, pagination }: Props) => {
    return (
        <div className="flex flex-col gap-1.5">
            <ul className="flex flex-col">
                {todos.map((todo) =>
                    (todo.subTasks?.length ?? 0) > 0 ? (
                        <ColapsedTask key={todo.id} todo={todo} slug={slug} />
                    ) : (
                        <TaskItem key={todo.id} todo={todo} slug={slug} />
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
