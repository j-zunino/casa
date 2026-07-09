import { housesHooks } from "@/features/houses/hooks";
import { housesQueries } from "@/features/houses/queries";
import { houseSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
    SettingsContent,
    SettingsLink,
    Settings,
    SettingsGroup,
    SettingsHeader,
    SettingsSet,
    SettingsTitle,
} from "@/components/common/Settings";
import { AvatarEntity } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteHouse } from "@/features/houses/components";
import {
    CaretRightIcon,
    EnvelopeSimpleIcon,
    FloppyDiskIcon,
    HouseLineIcon,
    UserIcon,
} from "@phosphor-icons/react";
import { Controller } from "react-hook-form";

import type { z } from "zod";

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
            <div className="flex items-center gap-1.5">
                <AvatarEntity
                    size="lg"
                    rounded="normal"
                    src={house.logo}
                    alt={house.name}
                    fallback={<HouseLineIcon />}
                />

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
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    aria-label="Save house name"
                                                    disabled={
                                                        isUpdating ||
                                                        house.name ===
                                                            field.value
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <FloppyDiskIcon weight="fill" />
                                                </Button>
                                            </TooltipTrigger>

                                            <TooltipContent>
                                                Save changes
                                            </TooltipContent>
                                        </Tooltip>
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
            </div>

            <SettingsHeader>
                <SettingsTitle>House settings</SettingsTitle>
            </SettingsHeader>

            <SettingsGroup>
                <SettingsSet>
                    <SettingsLink
                        to="/account/houses/$slug/invites"
                        params={{ slug: house.slug }}
                    >
                        <SettingsContent
                            title="Invites"
                            description="Create and manage invite links"
                            icon={<EnvelopeSimpleIcon />}
                            iconEnd={<CaretRightIcon />}
                        />
                    </SettingsLink>

                    <SettingsLink to="/account/houses/$slug/members">
                        <SettingsContent
                            title="Members"
                            description="Manage members"
                            icon={<UserIcon />}
                            iconEnd={<CaretRightIcon />}
                        />
                    </SettingsLink>
                </SettingsSet>

                <SettingsSet>
                    <DeleteHouse id={house.id} />
                </SettingsSet>
            </SettingsGroup>
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

        return { house };
    },
});
