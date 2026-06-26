import { housesQueries } from "@/features/houses/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
    SettingContent,
    SettingLink,
    Settings,
    SettingsGroup,
    SettingsHeader,
    SettingsSet,
    SettingsTitle,
} from "@/components/common/Settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CaretRightIcon, HouseLineIcon } from "@phosphor-icons/react";

const RouteComponent = () => {
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    return (
        <Settings>
            <SettingsHeader>
                <SettingsTitle>Select house</SettingsTitle>
            </SettingsHeader>

            <SettingsGroup>
                <SettingsSet>
                    {houses.map((h) => (
                        <SettingLink
                            key={h.id}
                            to="/account/houses/$slug"
                            params={{ slug: h.slug }}
                        >
                            <SettingContent
                                title={h.name}
                                icon={
                                    <Avatar size="sm" rounded="normal">
                                        <AvatarImage
                                            src={h.logo ?? undefined}
                                            alt={h.name}
                                        />

                                        <AvatarFallback>
                                            <HouseLineIcon />
                                        </AvatarFallback>
                                    </Avatar>
                                }
                                iconEnd={<CaretRightIcon />}
                            />
                        </SettingLink>
                    ))}
                </SettingsSet>
            </SettingsGroup>
        </Settings>
    );
};

export const Route = createFileRoute("/_authenticated/account/houses/")({
    component: RouteComponent,
});
