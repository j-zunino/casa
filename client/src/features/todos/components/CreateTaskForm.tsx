import { createTodoSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { todosHooks } from "../hooks";

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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
    CalendarDotsIcon,
    GlobeIcon,
    LockIcon,
    PlusIcon,
    XIcon,
} from "@phosphor-icons/react";
import { Controller } from "react-hook-form";

import type { House } from "@/features/houses/types";
import type { z } from "zod";

type FormValues = z.input<typeof createTodoSchema>;

interface Props {
    slug: House["slug"];
}

const visibilityValues = [
    { label: "Private", icon: <LockIcon />, value: "PRIVATE" as const },
    { label: "Public", icon: <GlobeIcon />, value: "PUBLIC" as const },
];

export const CreateTaskForm = ({ slug }: Props) => {
    const { mutateAsync: createTodo, isPending: isCreating } =
        todosHooks.useCreate(slug);

    const [subTaskInput, setSubTaskInput] = useState("");
    const [date, setDate] = useState<Date>();

    const form = useForm<FormValues>({
        resolver: zodResolver(createTodoSchema),
        defaultValues: {
            title: "",
            description: "",
            visibility: "PRIVATE",
            subTasks: [],
        },
    });

    const {
        fields: subTasks,
        append,
        remove,
    } = useFieldArray({
        control: form.control,
        name: "subTasks",
    });

    const addSubTask = () => {
        const value = subTaskInput.trim();

        if (!value) return;

        append(value);
        setSubTaskInput("");
    };

    const onSubmit = (data: FormValues) => {
        const payload: FormValues = {
            ...data,
            dueDate: date,
        };

        toast.promise(createTodo(payload), {
            loading: "Creating task...",
            success: () => {
                form.reset();
                setDate(undefined);

                return "Task created successfully!";
            },
            error: (err) => err?.message ?? "An unexpected error occurred",
        });
    };

    const handleReset = () => {
        form.reset();
        setSubTaskInput("");
        setDate(undefined);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="no-scrollbar max-h-80 scroll-fade-y overflow-y-auto">
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

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="description">
                                Description
                            </FieldLabel>

                            <FieldContent>
                                <Textarea
                                    {...field}
                                    id="description"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Describe your task..."
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
                                        />

                                        <Button
                                            type="button"
                                            size="icon-sm"
                                            variant="ghost"
                                            className="ml-1.5"
                                            onClick={() => remove(index)}
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    data-empty={!date}
                                    name="due-date"
                                    className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    <CalendarDotsIcon />
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
            </FieldGroup>

            <div className="mt-4 flex w-full gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isCreating}
                    className="ml-auto"
                >
                    Reset
                </Button>

                <Button type="submit" disabled={isCreating}>
                    {isCreating ? (
                        <>
                            <Spinner />
                            Creating...
                        </>
                    ) : (
                        "Create task"
                    )}
                </Button>
            </div>
        </form>
    );
};
