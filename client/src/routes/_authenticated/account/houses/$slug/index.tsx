import { housesHooks } from "@/features/houses/hooks";
import { housesQueries } from "@/features/houses/queries";
import { houseSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import {
    SettingContent,
    SettingLink,
    Settings,
} from "@/components/common/Settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DeleteHouse } from "@/features/houses/components";
import {
    CaretRightIcon,
    EnvelopeSimpleIcon,
    FloppyDiskIcon,
    HouseLineIcon,
    UserIcon,
} from "@phosphor-icons/react";
import { Controller } from "react-hook-form";

type FormValues = z.infer<typeof houseSchema>;

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { data: house } = useSuspenseQuery(housesQueries.details(slug));
    const { mutateAsync: update, isPending: isUpdating } =
        housesHooks.useUpdate();

    const form = useForm<FormValues>({
        resolver: zodResolver(houseSchema),
        defaultValues: {
            name: house.name,
        },
    });

    const onSubmit = (data: FormValues) => {
        if (house.name === data.name) return;

        toast.promise(update({ id: house.id, input: data }), {
            loading: "Updating house...",
            success: "House updated successfully!",
            error: (err) => err.message,
        });
    };

    return (
        <Settings>
            <section className="mb-2 flex items-center gap-1.5">
                <Avatar size="lg" rounded="normal">
                    <AvatarImage
                        src={house.logo ?? undefined}
                        alt={house.name}
                    />

                    <AvatarFallback>
                        <HouseLineIcon />
                    </AvatarFallback>
                </Avatar>

                <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <ButtonGroup className="w-full">
                                        <Input
                                            {...field}
                                            id="name"
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="House name"
                                            autoComplete="on"
                                        />
                                        <Button
                                            variant="outline"
                                            aria-label="Save house name"
                                            disabled={
                                                isUpdating ||
                                                house.name === field.value
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <FloppyDiskIcon weight="fill" />
                                        </Button>
                                    </ButtonGroup>

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </FieldContent>
                            </Field>
                        )}
                    />
                </form>
            </section>
            <SettingLink
                to="/account/houses/$slug/invites"
                params={{ slug: house.slug }}
            >
                <SettingContent
                    title="Invites"
                    description="Create and manage invite links"
                    icon={<EnvelopeSimpleIcon />}
                    iconEnd={<CaretRightIcon />}
                />
            </SettingLink>

            <SettingLink to=".">
                <SettingContent
                    title="Users"
                    description="Manage users"
                    icon={<UserIcon />}
                    iconEnd={<CaretRightIcon />}
                />
            </SettingLink>

            <DeleteHouse id={house.id} />
        </Settings>
    );
};

export const Route = createFileRoute("/_authenticated/account/houses/$slug/")({
    staticData: { homePath: "/h/$slug" },
    component: RouteComponent,
    loader: async ({ context, params }) => {
        const house = await context.queryClient.ensureQueryData(
            housesQueries.details(params.slug),
        );

        if (!house) throw notFound();

        return { house };
    },
});
