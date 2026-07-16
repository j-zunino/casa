import { profileSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { authHooks } from "../hooks";

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
import { UserIcon } from "@phosphor-icons/react";
import { Controller } from "react-hook-form";

import type { z } from "zod";
import type { User } from "../types";

type FormValues = z.infer<typeof profileSchema>;

interface Props {
    user: User;
}

export const EditProfileDialog = ({ user }: Props) => {
    const { mutateAsync: update, isPending: isUpdating } =
        authHooks.useUpdateUser();

    const form = useForm<FormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            image: user.image ?? "",
        },
    });

    const formValues = useWatch({ control: form.control });

    const onSubmit = (data: FormValues) => {
        if (user.name === data.name && (user.image ?? "") === data.image)
            return;

        toast.promise(update({ name: data.name, image: data.image }), {
            loading: "Updating profile...",
            success: "Profile updated successfully!",
            error: (err) => err?.message ?? "An unexpected error occurred",
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit profile</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Update your name and avatar.
                    </DialogDescription>
                </DialogHeader>

                <Profile className="flex-col items-start">
                    <AvatarEntity
                        size="lg"
                        src={formValues.image || undefined}
                        alt={formValues.name || user.name}
                        fallback={<UserIcon />}
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
                                                placeholder="Name"
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
                                name="image"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="image">
                                            Avatar URL
                                        </FieldLabel>

                                        <FieldContent>
                                            <Input
                                                {...field}
                                                id="image"
                                                type="url"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                placeholder="https://example.com/avatar.jpeg"
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
                                        aria-label="Save profile changes"
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
