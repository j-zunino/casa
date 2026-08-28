import { createTodoSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Controller } from "react-hook-form";
import { Required } from "@/components/common/Required";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
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
    CalendarDotsIcon,
    GlobeIcon,
    LockIcon,
    PlusIcon,
    XIcon,
} from "@phosphor-icons/react";

import type { z } from "zod";

export type CreateFormValues = z.input<typeof createTodoSchema>;

const visibilityValues = [
    { label: "Private", icon: <LockIcon />, value: "PRIVATE" as const },
    { label: "Public", icon: <GlobeIcon />, value: "PUBLIC" as const },
];

interface TaskFormProps {
    defaultValues: Partial<CreateFormValues> & {
        title: string;
        visibility: CreateFormValues["visibility"];
    };
    onSubmit: (data: CreateFormValues) => void;
    submitLabel: React.ReactNode;
    isSubmitting: boolean;
    showReset?: boolean;
    footer?: React.ReactNode;
}

export const TaskForm = ({
    defaultValues,
    onSubmit,
    submitLabel,
    isSubmitting,
    showReset = false,
    footer,
}: TaskFormProps) => {
    const [subTaskInput, setSubTaskInput] = useState("");

    const form = useForm<CreateFormValues>({
        resolver: zodResolver(createTodoSchema),
        defaultValues: {
            title: defaultValues.title,
            visibility: defaultValues.visibility,
            dueDate: defaultValues.dueDate,
            subTasks: defaultValues.subTasks ?? [],
        },
    });

    const {
        fields: subTasks,
        append,
        remove,
    } = useFieldArray({
        control: form.control,
        name: "subTasks" as never,
    });

    const addSubTask = () => {
        const value = subTaskInput.trim();

        if (!value) return;

        append(value);
        setSubTaskInput("");
    };

    const handleReset = () => {
        form.reset();
        setSubTaskInput("");
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="max-h-80 overflow-y-auto p-1">
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="title">
                                Title <Required />
                            </FieldLabel>

                            <FieldContent>
                                <Input
                                    {...field}
                                    id="title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Grocery's list"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </FieldContent>
                        </Field>
                    )}
                />

                <Field>
                    <FieldLabel>Sub tasks</FieldLabel>

                    <FieldContent>
                        {subTasks.map((subTask, index) => (
                            <Controller
                                key={subTask.id}
                                name={`subTasks.${index}`}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <ButtonGroup className="w-full">
                                        <Input
                                            {...field}
                                            size="sm"
                                            aria-invalid={fieldState.invalid}
                                            disabled={isSubmitting}
                                        />

                                        <Button
                                            type="button"
                                            size="icon-sm"
                                            variant="ghost"
                                            className="ml-1.5"
                                            onClick={() => remove(index)}
                                            disabled={isSubmitting}
                                            aria-label="Remove sub task"
                                        >
                                            <XIcon />
                                        </Button>
                                    </ButtonGroup>
                                )}
                            />
                        ))}

                        <ButtonGroup className="w-full">
                            <Input
                                size="sm"
                                placeholder="Type something..."
                                value={subTaskInput}
                                disabled={isSubmitting}
                                onChange={(e) =>
                                    setSubTaskInput(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addSubTask();
                                    }
                                }}
                            />

                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={addSubTask}
                                disabled={isSubmitting}
                            >
                                <PlusIcon />
                                Add
                            </Button>
                        </ButtonGroup>

                        <FieldError
                            errors={[
                                form.formState.errors.subTasks?.root,
                                ...subTasks.map(
                                    (_, index) =>
                                        form.formState.errors.subTasks?.[index],
                                ),
                            ]}
                        />
                    </FieldContent>
                </Field>

                <Field orientation="horizontal">
                    <Controller
                        name="visibility"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="visibility">
                                    Visibility <Required />
                                </FieldLabel>

                                <FieldContent>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        name="visibility"
                                    >
                                        <SelectTrigger
                                            id="visibility"
                                            aria-invalid={fieldState.invalid}
                                            className="w-full"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {visibilityValues.map(
                                                    (item) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.icon}
                                                            {item.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </FieldContent>
                            </Field>
                        )}
                    />

                    <Field>
                        <FieldLabel htmlFor="due-date">Due date</FieldLabel>
                        <Controller
                            name="dueDate"
                            control={form.control}
                            render={({ field }) => {
                                const value = field.value as Date | undefined;

                                return (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                id="due-date"
                                                data-empty={!value}
                                                name="due-date"
                                                className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                            >
                                                <CalendarDotsIcon />
                                                {value ? (
                                                    format(value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={value}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                );
                            }}
                        />
                    </Field>
                </Field>
            </FieldGroup>

            <div className="mt-4 flex w-full gap-2">
                {footer}

                {showReset && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        disabled={isSubmitting}
                        className="ml-auto"
                    >
                        Reset
                    </Button>
                )}

                <Button type="submit" disabled={isSubmitting}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
};
