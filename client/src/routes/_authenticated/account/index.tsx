import { useAuth } from '@/features/auth/hooks';
import { housesQueries } from '@/features/houses/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { BackButton } from '@/components/common/BackButton';
import {
    Setting,
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
import { Separator } from '@/components/ui/separator';
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
    const { auth } = useAuth();
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    return (
        <div className="flex grow flex-col items-center p-8">
            <div className="flex w-full max-w-xl flex-col items-center justify-start gap-8">
                <div className="w-full justify-start">
                    <BackButton />
                </div>

                <div className="rounded-md transition outline-none select-none">
                    <Avatar size="lg">
                        <AvatarImage
                            src={auth.user?.image ?? undefined}
                            alt={auth.user?.name}
                        />

                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>

                    <AvatarLabel>{auth.user?.name}</AvatarLabel>
                </div>

                <Settings>
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
                        <SettingLink to=".">
                            <SettingContent
                                title="Manage houses"
                                description={`${houses.length} Houses`}
                                icon={<HouseLineIcon />}
                                iconEnd={
                                    <span className="flex items-center gap-1.5">
                                        <AvatarGroup>
                                            {houses
                                                .slice(0, 2)
                                                .map((h: House) => (
                                                    <Avatar
                                                        key={h.id}
                                                        size="sm"
                                                        rounded="normal"
                                                    >
                                                        <AvatarImage
                                                            src={
                                                                h.logo ??
                                                                undefined
                                                            }
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

                    <Separator />

                    <SettingButton variant="destructive" disabled={true}>
                        <SettingContent
                            title="Delete account"
                            icon={<TrashIcon />}
                        />
                    </SettingButton>
                </Settings>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/account/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(housesQueries.all());
    },
});
