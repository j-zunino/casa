import { authQueries } from "@/features/auth/queries";
import { housesQueries } from "@/features/houses/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Profile } from "@/components/common/Profile";
import {
    SettingsButton,
    SettingsContent,
    SettingsLink,
    Settings,
    SettingsGroup,
    SettingsHeader,
    SettingsSet,
    SettingsTitle,
} from "@/components/common/Settings";
import {
    AvatarEntity,
    AvatarGroup,
    AvatarGroupCount,
    AvatarLabel,
} from "@/components/ui/avatar";
import {
    CaretRightIcon,
    HouseLineIcon,
    PasswordIcon,
    TrashIcon,
    UserIcon,
} from "@phosphor-icons/react";

import type { House } from "@/features/houses/types";

const RouteComponent = () => {
    const { data: session } = useSuspenseQuery(authQueries.session());
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    // TODO: If account is email allow to change username
    return (
        <Settings>
            <Profile className="flex-col">
                <AvatarEntity
                    size="lg"
                    src={session?.user.image ?? undefined}
                    alt={session?.user.name}
                    fallback={<UserIcon />}
                />

                <AvatarLabel>{session?.user.name}</AvatarLabel>
            </Profile>

            <SettingsHeader>
                <SettingsTitle>Account settings</SettingsTitle>
            </SettingsHeader>

            <SettingsGroup>
                <SettingsSet>
                    <SettingsButton disabled={true}>
                        <SettingsContent
                            title="Update password"
                            icon={<PasswordIcon />}
                        />
                    </SettingsButton>

                    {houses.length > 0 && (
                        <SettingsLink to="/account/houses">
                            <SettingsContent
                                title="Manage houses"
                                description={`${houses.length} Houses`}
                                icon={<HouseLineIcon />}
                                iconEnd={
                                    <span className="flex items-center gap-1.5">
                                        <AvatarGroup>
                                            {houses
                                                .slice(0, 2)
                                                .map((h: House) => (
                                                    <AvatarEntity
                                                        key={h.id}
                                                        rounded="normal"
                                                        fallback={
                                                            <HouseLineIcon />
                                                        }
                                                    />
                                                ))}

                                            {houses.length > 2 && (
                                                <AvatarGroupCount>
                                                    +{houses.length - 2}
                                                </AvatarGroupCount>
                                            )}
                                        </AvatarGroup>

                                        <CaretRightIcon />
                                    </span>
                                }
                            />
                        </SettingsLink>
                    )}
                </SettingsSet>

                <SettingsSet>
                    <SettingsButton variant="destructive" disabled={true}>
                        <SettingsContent
                            title="Delete account"
                            icon={<TrashIcon />}
                        />
                    </SettingsButton>
                </SettingsSet>
            </SettingsGroup>
        </Settings>
    );
};

export const Route = createFileRoute("/_authenticated/account/")({
    component: RouteComponent,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(housesQueries.all());
    },
});
