import { NoActiveHouse } from '@/components/common/ErrorComponents';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/features/auth/hooks';
import { DeleteHouseAlert } from '@/features/houses/components';
import {
    CaretLeftIcon,
    CaretRightIcon,
    EnvelopeSimpleIcon,
    FloppyDiskIcon,
    HouseLineIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { createFileRoute, Link } from '@tanstack/react-router';

const RouteComponent = () => {
    const { auth, house } = useAuth();

    if (!auth.isAuthenticated || !house.active) {
        return <NoActiveHouse />;
    }

    return (
        <div className="flex grow flex-col items-center p-8">
            <div className="flex w-full max-w-xl flex-col items-center justify-start gap-8">
                <div className="w-full justify-start">
                    <Button variant="ghost" asChild>
                        <Link to="/account" className="flex items-center">
                            <CaretLeftIcon />
                            Back
                        </Link>
                    </Button>
                </div>

                <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:flex-nowrap">
                    <Avatar size="lg" rounded="normal">
                        <AvatarImage
                            src={house.active.logo ?? undefined}
                            alt={house.active.name}
                        />

                        <AvatarFallback>
                            <HouseLineIcon />
                        </AvatarFallback>
                    </Avatar>

                    <Field className="w-full">
                        <FieldLabel>House name</FieldLabel>

                        <ButtonGroup>
                            <Input placeholder="Name" />
                            <Button
                                variant="outline"
                                aria-label="Save house name"
                            >
                                <FloppyDiskIcon weight="fill" />
                            </Button>
                        </ButtonGroup>
                    </Field>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="justify-between"
                    >
                        <Link to=".">
                            <span className="flex items-center gap-2">
                                <EnvelopeSimpleIcon />
                                Invite members
                            </span>

                            <CaretRightIcon />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="justify-between"
                    >
                        <Link to=".">
                            <span className="flex items-center gap-2">
                                <UserIcon />
                                Manage members
                            </span>

                            <CaretRightIcon />
                        </Link>
                    </Button>

                    <Separator />

                    <DeleteHouseAlert houseId={house.active.id} />
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/account/houses/$slug')({
    staticData: { homePath: '/h/$slug' },
    component: RouteComponent,
});
