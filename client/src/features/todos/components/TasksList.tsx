import { cn } from "@/lib/utils";
import { format, isBefore, startOfDay } from "date-fns";
import { todosHooks } from "../hooks/todos.hooks";

import {
    PaginationControls,
    PaginationTotal,
} from "@/components/common/Pagination";
import { ScrollingText } from "@/components/common/ScrollingText";
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

import type { House } from "@/features/houses/types";
import type { ApiPagination, TodoDto } from "@casa/types";

interface Props {
    slug: House["slug"];
    todos: TodoDto[];
    pagination?: ApiPagination;
}

/*
    Tasks list TODO:
        - Task list tree sorteable
        - Consistent task list order
        - Sorteable tree with dnd-kit
*/
const TaskDate = ({
    dueDate,
    isCompleted,
}: {
    dueDate: TodoDto["dueDate"];
    isCompleted: boolean;
}) => {
    if (!dueDate) return;

    const isOverdue =
        !isCompleted && isBefore(startOfDay(dueDate), startOfDay(new Date()));

    return (
        <span
            className={cn(
                "ml-auto inline-flex items-center gap-1.5 text-xs",
                isOverdue
                    ? "animate-pulse text-destructive"
                    : "text-muted-foreground",
                isCompleted && "opacity-50",
            )}
        >
            <CalendarDotsIcon />
            {format(dueDate.toString(), "MM/d")}
        </span>
    );
};

const TaskRow = ({
    todo,
    slug,
    caret = false,
}: {
    todo: TodoDto;
    slug: House["slug"];
    caret?: boolean;
}) => {
    const toggle = todosHooks.useToggle(slug);

    return (
        <>
            <Checkbox
                id={`task-${todo.id}`}
                checked={todo.isCompleted}
                onCheckedChange={(checked) =>
                    toggle.mutate({
                        id: todo.id,
                        isCompleted: checked === true,
                    })
                }
                onClick={(e) => e.stopPropagation()}
            />

            {caret && (
                <CaretRightIcon className="mr-0.5 shrink-0 group-data-[state=open]:rotate-90" />
            )}

            <ScrollingText
                className={cn(
                    "min-w-0 flex-1",
                    todo.isCompleted &&
                        "text-muted-foreground line-through opacity-50",
                )}
            >
                {todo.title}
            </ScrollingText>

            {todo.dueDate && (
                <TaskDate
                    dueDate={todo.dueDate}
                    isCompleted={todo.isCompleted}
                />
            )}
        </>
    );
};

const TaskItem = ({
    todo,
    slug,
    className,
}: {
    todo: TodoDto;
    slug: House["slug"];
    className?: string;
}) => {
    return (
        <li>
            <Button
                className={cn("w-full justify-start text-left", className)}
                variant="ghost"
                asChild
            >
                <Label htmlFor={`task-${todo.id}`}>
                    <TaskRow todo={todo} slug={slug} />
                </Label>
            </Button>
        </li>
    );
};

const ColapsedTask = ({
    todo,
    slug,
}: {
    todo: TodoDto;
    slug: House["slug"];
}) => {
    const subTasks = todo.subTasks ?? [];

    return (
        <li>
            <Collapsible className="group">
                <CollapsibleTrigger asChild>
                    <Button
                        className="w-full justify-start text-left"
                        variant="ghost"
                    >
                        <TaskRow todo={todo} slug={slug} caret={true} />
                    </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <ul className="flex flex-col">
                        {subTasks.map((subTask) => (
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
        </li>
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
