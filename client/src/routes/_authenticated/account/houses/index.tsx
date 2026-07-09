import { housesQueries } from "@/features/houses/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

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
                        <SettingsLink
                            key={h.id}
                            to="/account/houses/$slug"
                            params={{ slug: h.slug }}
                        >
                            <SettingsContent
                                title={h.name}
                                icon={
                                    <AvatarEntity
                                        rounded="normal"
                                        src={h.logo}
                                        alt={h.name}
                                        fallback={<HouseLineIcon />}
                                    />
                                }
                                iconEnd={<CaretRightIcon />}
                            />
                        </SettingsLink>
                    ))}
                </SettingsSet>
            </SettingsGroup>
        </Settings>
    );
};

export const Route = createFileRoute("/_authenticated/account/houses/")({
    component: RouteComponent,
});
