import { inviteLinkSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { invitesHooks } from "../../hooks";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FloppyDiskIcon } from "@phosphor-icons/react";
import { Controller } from "react-hook-form";

import type { House } from "@/features/houses/types";
import type { Invitation } from "@casa/types";
import type { z } from "zod";

interface Props {
    slug: House["slug"];
    inviteCode: Invitation["code"];
    onCancel?: () => void;
}

const maxUsesValues = [
    { label: "No limit", value: null },
    { label: "1 use", value: 1 },
    { label: "5 uses", value: 5 },
    { label: "10 uses", value: 10 },
    { label: "25 uses", value: 25 },
    { label: "50 uses", value: 50 },
    { label: "100 uses", value: 100 },
] as const;

type FormValues = z.infer<typeof inviteLinkSchema>;

export const EditInviteLink = ({ slug, inviteCode, onCancel }: Props) => {
    const { mutateAsync: updateInvite, isPending: isUpdatingInvite } =
        invitesHooks.useUpdateInvite(slug);

    const form = useForm<FormValues>({
        resolver: zodResolver(inviteLinkSchema),
        defaultValues: { maxUses: 5 },
    });

    const onSubmit = async (data: FormValues) => {
        toast.promise(updateInvite({ maxUses: data.maxUses, inviteCode }), {
            loading: "Updating house...",
            success: () => {
                form.reset({ maxUses: data.maxUses });
                return "Invite updated successfully!";
            },
            error: (err) => err.message,
        });
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Invite house settings</DialogTitle>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="maxUses"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="maxUses">
                                    Max number of uses
                                </FieldLabel>

                                <Select
                                    value={field.value?.toString() ?? "null"}
                                    onValueChange={(value) => {
                                        field.onChange(
                                            value === "null"
                                                ? null
                                                : Number(value),
                                        );
                                    }}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder="Select max uses" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            {maxUsesValues.map((use) => (
                                                <SelectItem
                                                    key={String(use.value)}
                                                    value={String(use.value)}
                                                >
                                                    {use.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Field>
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isUpdatingInvite}
                            >
                                Cancel
                            </Button>
                        )}

                        <Button type="submit" disabled={isUpdatingInvite}>
                            <FloppyDiskIcon weight="fill" />
                            Save
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </>
    );
};
