import { housesHooks } from "@/features/houses/hooks";
import { housesQueries } from "@/features/houses/queries";
import { houseSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Profile } from "@/components/common/Profile";
import {
    Settings,
    SettingsContent,
    SettingsGroup,
    SettingsHeader,
    SettingsLink,
    SettingsSet,
    SettingsTitle,
} from "@/components/common/Settings";
import { AvatarEntity, AvatarLabel } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DeleteHouse } from "@/features/houses/components";
import { LeaveHouse } from "@/features/houses/components/LeaveHouse";
import {
    CaretRightIcon,
    EnvelopeSimpleIcon,
    HouseLineIcon,
    UserIcon,
} from "@phosphor-icons/react";

import type { z } from "zod";

type FormValues = z.infer<typeof houseSchema>;

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { data: house } = useSuspenseQuery(housesQueries.details(slug));
    const { data: permissions } = useSuspenseQuery(
        housesQueries.permissions(slug),
    );

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
            error: (err) => err?.message ?? "An unexpected error occurred",
        });
    };

    return (
        <Settings>
            <div className="flex items-center gap-1.5">
                <Profile className="w-full flex-col items-start">
                    <AvatarEntity
                        size="lg"
                        rounded="normal"
                        src={house.logo}
                        alt={house.name}
                        fallback={<HouseLineIcon />}
                    />

                    <div className="flex w-full justify-between">
                        <AvatarLabel>{house.name}</AvatarLabel>

                        {permissions.organization?.includes("update") && (
                            <Button variant="outline">Modify house</Button>
                        )}
                    </div>

                    {/* <form */}
                    {/*     className="w-full" */}
                    {/*     onSubmit={form.handleSubmit(onSubmit)} */}
                    {/* > */}
                    {/*     <Controller */}
                    {/*         name="name" */}
                    {/*         control={form.control} */}
                    {/*         render={({ field, fieldState }) => ( */}
                    {/*             <Field data-invalid={fieldState.invalid}> */}
                    {/*                 <FieldContent> */}
                    {/*                     <ButtonGroup className="w-full"> */}
                    {/*                         <Input */}
                    {/*                             {...field} */}
                    {/*                             id="name" */}
                    {/*                             type="text" */}
                    {/*                             aria-invalid={ */}
                    {/*                                 fieldState.invalid */}
                    {/*                             } */}
                    {/*                             placeholder="House name" */}
                    {/*                             autoComplete="on" */}
                    {/*                         /> */}
                    {/*                         <Tooltip> */}
                    {/*                             <TooltipTrigger asChild> */}
                    {/*                                 <Button */}
                    {/*                                     variant="outline" */}
                    {/*                                     aria-label="Save house name" */}
                    {/*                                     disabled={ */}
                    {/*                                         isUpdating || */}
                    {/*                                         house.name === */}
                    {/*                                             field.value */}
                    {/*                                             ? true */}
                    {/*                                             : false */}
                    {/*                                     } */}
                    {/*                                 > */}
                    {/*                                     <FloppyDiskIcon weight="fill" /> */}
                    {/*                                 </Button> */}
                    {/*                             </TooltipTrigger> */}
                    {/**/}
                    {/*                             <TooltipContent> */}
                    {/*                                 Save changes */}
                    {/*                             </TooltipContent> */}
                    {/*                         </Tooltip> */}
                    {/*                     </ButtonGroup> */}
                    {/**/}
                    {/*                     {fieldState.invalid && ( */}
                    {/*                         <FieldError */}
                    {/*                             errors={[fieldState.error]} */}
                    {/*                         /> */}
                    {/*                     )} */}
                    {/*                 </FieldContent> */}
                    {/*             </Field> */}
                    {/*         )} */}
                    {/*     /> */}
                    {/* </form> */}
                </Profile>
            </div>

            <SettingsHeader>
                <SettingsTitle>House settings</SettingsTitle>
            </SettingsHeader>

            <SettingsGroup>
                <SettingsSet>
                    <SettingsLink
                        to="/account/houses/$slug/invites"
                        params={{ slug: house.slug }}
                        disabled={!permissions.invitation?.includes("read")}
                    >
                        <SettingsContent
                            title="Invites"
                            description="Create and manage invite links"
                            icon={<EnvelopeSimpleIcon />}
                            iconEnd={<CaretRightIcon />}
                        />
                    </SettingsLink>

                    <SettingsLink
                        to="/account/houses/$slug/members"
                        disabled={!permissions.member?.includes("read")}
                    >
                        <SettingsContent
                            title="Members"
                            description="Manage members"
                            icon={<UserIcon />}
                            iconEnd={<CaretRightIcon />}
                        />
                    </SettingsLink>
                </SettingsSet>

                <SettingsSet>
                    {permissions.organization?.includes("delete") ? (
                        <DeleteHouse id={house.id} />
                    ) : (
                        <LeaveHouse />
                    )}
                </SettingsSet>
            </SettingsGroup>
        </Settings>
    );
};

export const Route = createFileRoute("/_authenticated/account/houses/$slug/")({
    staticData: { homePath: "/h/$slug" },
    component: RouteComponent,
    loader: async ({ context, params }) => {
        await context.queryClient.ensureQueryData(
            housesQueries.details(params.slug),
        );

        await context.queryClient.ensureQueryData(
            housesQueries.permissions(params.slug),
        );
    },
});
