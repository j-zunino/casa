import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCircleIcon, PlusIcon } from "@phosphor-icons/react";

export const Tasks = () => {
    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Add mobile view */}
                <TasksPopover />
            </CardContent>
        </Card>
    );
};

export const CreateTasksForm = () => {
    return (
        <form>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input id="name" placeholder="Grocery's list" />
                </Field>

                <Button type="button" size="sm" variant="outline">
                    <CheckCircleIcon />
                    Add new sub task
                </Button>

                <div className="ml-auto flex gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create task</Button>
                </div>
            </FieldGroup>
        </form>
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

                <CreateTasksForm />
            </PopoverContent>
        </Popover>
    );
};
