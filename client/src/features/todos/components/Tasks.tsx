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

import type { House } from "@/features/houses/types";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface Props {
    slug: House["slug"];
}

export const Tasks = ({ slug }: Props) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                {isDesktop ? (
                    <TasksPopover slug={slug} />
                ) : (
                    <TasksDialog slug={slug} />
                )}
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

export const TasksDialog = ({ slug }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusIcon /> New task
                </Button>
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
