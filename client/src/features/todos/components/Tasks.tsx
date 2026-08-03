import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "@phosphor-icons/react";
import { CreateTaskForm } from "./CreateTaskForm";

import type { House } from "@/features/houses/types";

interface Props {
    slug: House["slug"];
}

export const Tasks = ({ slug }: Props) => {
    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                {/* TODO: Add mobile view */}
                <TasksPopover slug={slug} />
            </CardContent>
        </Card>
    );
};

export const TasksPopover = ({ slug }: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <PlusIcon /> New task
                </Button>
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
