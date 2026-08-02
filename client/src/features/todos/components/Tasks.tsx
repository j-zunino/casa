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

export const Tasks = () => {
    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                {/* TODO: Add mobile view */}
                <TasksPopover />
            </CardContent>
        </Card>
    );
};

export const TasksPopover = () => {
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

                <CreateTaskForm />
            </PopoverContent>
        </Popover>
    );
};
