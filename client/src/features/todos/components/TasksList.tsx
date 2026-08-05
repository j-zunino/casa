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
import { CalendarDotsIcon, CaretRightIcon } from "@phosphor-icons/react";

import type { TodoDto } from "@casa/types";
import type { ComponentProps } from "react";

interface Props {
    todos: TodoDto[];
}

const TaskItem = ({
    todo,
    className,
    ...props
}: { todo: TodoDto } & ComponentProps<typeof Label>) => {
    return (
        <li>
            <Label
                htmlFor={`task-${todo.id}`}
                className={cn(
                    "flex h-8 w-full items-center gap-2 px-2 hover:bg-muted dark:hover:bg-muted/50",
                    className,
                )}
                {...props}
            >
                <Checkbox id={`task-${todo.id}`} />
                {todo.title}

                {todo.dueDate && (
                    <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDotsIcon />
                        {format(todo.dueDate, "MM/d")}
                    </span>
                )}
            </Label>
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

                    {todo.dueDate && (
                        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDotsIcon />
                            {format(todo.dueDate, "MM/d")}
                        </span>
                    )}
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

export const TasksList = ({ todos }: Props) => {
    return (
        <ul className="flex flex-col">
            {todos.map((todo) =>
                todo.subTasks.length > 0 ? (
                    <ColapsedTask key={todo.id} todo={todo} />
                ) : (
                    <TaskItem key={todo.id} todo={todo} />
                ),
            )}
        </ul>
    );
};
