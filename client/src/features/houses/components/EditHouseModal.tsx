import { houseSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { housesHooks } from "../hooks";

import { Profile } from "@/components/common/Profile";
import { AvatarEntity } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { HouseLineIcon } from "@phosphor-icons/react";
import { Controller } from "react-hook-form";

import type { z } from "zod";
import type { House } from "../types";

type FormValues = z.infer<typeof houseSchema>;

interface Props {
    house: House;
}

export const EditHouseModal = ({ house }: Props) => {
    const { mutateAsync: update, isPending: isUpdating } =
        housesHooks.useUpdate();

    const form = useForm<FormValues>({
        resolver: zodResolver(houseSchema),
        defaultValues: {
            name: house.name,
            logo: house.logo ?? "",
        },
    });

    const onSubmit = (data: FormValues) => {
        if (house.name === data.name && (house.logo ?? "") === data.logo)
            return;

        toast.promise(update({ id: house.id, input: data }), {
            loading: "Updating house...",
            success: "House updated successfully!",
            error: (err) => err?.message ?? "An unexpected error occurred",
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit house</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit house</DialogTitle>
                    <DialogDescription>
                        Update the name and logo of this house.
                    </DialogDescription>
                </DialogHeader>

                <Profile className="flex-col items-start">
                    <AvatarEntity
                        size="lg"
                        rounded="normal"
                        src={house.logo}
                        alt={house.name}
                        fallback={<HouseLineIcon />}
                    />
                </Profile>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldSet>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">
                                            Name
                                        </FieldLabel>

                                        <FieldContent>
                                            <Input
                                                {...field}
                                                id="name"
                                                type="text"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="House name"
                                            />

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </FieldContent>
                                    </Field>
                                )}
                            />

                            <Controller
                                name="logo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="logo">
                                            Logo URL
                                        </FieldLabel>

                                        <FieldContent>
                                            <Input
                                                {...field}
                                                id="logo"
                                                type="url"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="https://example.com/logo.jpeg"
                                            />

                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </FieldContent>
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <DialogFooter>
                            <FieldGroup>
                                <Field
                                    orientation="horizontal"
                                    className="justify-end"
                                >
                                    <Button
                                        variant="outline"
                                        type="button"
                                        aria-label="Reset changes"
                                        onClick={() => form.reset()}
                                        disabled={isUpdating}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        type="submit"
                                        aria-label="Save house name"
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? (
                                            <>
                                                <Spinner />
                                                Saving...
                                            </>
                                        ) : (
                                            <>Save</>
                                        )}
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </DialogFooter>
                    </FieldSet>
                </form>
            </DialogContent>
        </Dialog>
    );
};
