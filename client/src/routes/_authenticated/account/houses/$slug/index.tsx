import { housesQueries } from "@/features/houses/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

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
import {
    DeleteHouse,
    EditHouseDialog,
    LeaveHouse,
} from "@/features/houses/components";
import {
    CaretRightIcon,
    EnvelopeSimpleIcon,
    HouseLineIcon,
    UserIcon,
} from "@phosphor-icons/react";

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { data: house } = useSuspenseQuery(housesQueries.details(slug));
    const { data: permissions } = useSuspenseQuery(
        housesQueries.permissions(slug),
    );

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

                    <div className="flex w-full justify-between gap-1.5">
                        <AvatarLabel className="line-clamp-2 text-left text-wrap">
                            {house.name}
                        </AvatarLabel>

                        {permissions.organization?.includes("update") && (
                            <EditHouseDialog house={house} />
                        )}
                    </div>
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
