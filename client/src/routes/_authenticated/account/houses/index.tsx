import { housesQueries } from "@/features/houses/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
    SettingContent,
    SettingLink,
    Settings,
} from "@/components/common/Settings";
import { CaretRightIcon, HouseLineIcon } from "@phosphor-icons/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const RouteComponent = () => {
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    return (
        <Settings>
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
        </Settings>
    );
};

export const Route = createFileRoute("/_authenticated/account/houses/")({
    component: RouteComponent,
});
