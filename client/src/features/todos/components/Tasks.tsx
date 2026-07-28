import { format } from "date-fns";
import { useState } from "react";

import { Required } from "@/components/common/Required";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    CalendarIcon,
    CheckCircleIcon,
    GlobeIcon,
    LockIcon,
    PlusIcon,
    XIcon,
} from "@phosphor-icons/react";

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

const visibilityValues = [
    { label: "Private", icon: <LockIcon />, value: "PRIVATE" as const },
    { label: "Public", icon: <GlobeIcon />, value: "PUBLIC" as const },
];

export const CreateTasksForm = () => {
    const [createSub, setCreateSub] = useState(false);
    const [date, setDate] = useState<Date>();

    return (
        <form>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="title">
                        Title <Required />
                    </FieldLabel>
                    <Input id="name" placeholder="Grocery's list" />
                </Field>

                <Field>
                    <FieldLabel>Sub tasks</FieldLabel>
                    {createSub ? (
                        <ButtonGroup>
                            <Input size="sm" placeholder="Type something..." />
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => setCreateSub(false)}
                            >
                                <PlusIcon /> Add
                            </Button>
                            <Button
                                type="button"
                                size="icon-sm"
                                variant="ghost"
                                className="ml-1.5"
                                onClick={() => setCreateSub(false)}
                            >
                                <XIcon />
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setCreateSub(true)}
                        >
                            <CheckCircleIcon />
                            Add new sub task
                        </Button>
                    )}
                </Field>

                <Field orientation="horizontal">
                    <Field>
                        <FieldLabel htmlFor="visibility">
                            Visibility <Required />
                        </FieldLabel>
                        <Select defaultValue="PRIVATE" name="visibility">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {visibilityValues.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="due-date">Due date</FieldLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    data-empty={!date}
                                    name="due-date"
                                    className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>
                </Field>

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
