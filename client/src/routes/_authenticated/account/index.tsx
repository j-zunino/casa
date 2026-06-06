import { authQueries } from '@/features/auth/queries';
import { housesQueries } from '@/features/houses/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import {
    SettingButton,
    SettingContent,
    SettingLink,
    Settings,
} from '@/components/common/Settings';
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
    AvatarLabel,
} from '@/components/ui/avatar';
import {
    CaretRightIcon,
    EnvelopeSimpleIcon,
    HouseLineIcon,
    PasswordIcon,
    TrashIcon,
    UserIcon,
} from '@phosphor-icons/react';

import type { House } from '@/features/houses/types';

const RouteComponent = () => {
    const { data: session } = useSuspenseQuery(authQueries.session());
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    // TODO: If account is email allow to change username
    return (
        <Settings>
            <div className="flex flex-col items-center">
                <Avatar size="lg">
                    <AvatarImage
                        src={session?.user.image ?? undefined}
                        alt={session?.user.name}
                    />

                    <AvatarFallback>
                        <UserIcon />
                    </AvatarFallback>
                </Avatar>

                <AvatarLabel>{session?.user.name}</AvatarLabel>
            </div>

            <SettingButton disabled={true}>
                <SettingContent
                    title="Invitations"
                    icon={<EnvelopeSimpleIcon />}
                />
            </SettingButton>

            <SettingButton disabled={true}>
                <SettingContent
                    title="Update password"
                    icon={<PasswordIcon />}
                />
            </SettingButton>

            {houses.length > 0 && (
                <SettingLink to="/account/houses">
                    <SettingContent
                        title="Manage houses"
                        description={`${houses.length} Houses`}
                        icon={<HouseLineIcon />}
                        iconEnd={
                            <span className="flex items-center gap-1.5">
                                <AvatarGroup>
                                    {houses.slice(0, 2).map((h: House) => (
                                        <Avatar
                                            key={h.id}
                                            size="sm"
                                            rounded="normal"
                                        >
                                            <AvatarImage
                                                src={h.logo ?? undefined}
                                                alt={h.name}
                                            />

                                            <AvatarFallback>
                                                <HouseLineIcon />
                                            </AvatarFallback>
                                        </Avatar>
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
                </SettingLink>
            )}

            <SettingButton variant="destructive" disabled={true}>
                <SettingContent title="Delete account" icon={<TrashIcon />} />
            </SettingButton>
        </Settings>
    );
};

export const Route = createFileRoute('/_authenticated/account/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(housesQueries.all());
    },
});
