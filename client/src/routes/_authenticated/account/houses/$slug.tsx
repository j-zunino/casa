import { useAuth } from '@/features/auth/hooks';
import { handleHouseUpdate } from '@/features/houses/services';
import { router } from '@/main';
import { houseSchema } from '@casa/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { NoActiveHouse } from '@/components/common/ErrorComponents';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { DeleteHouse } from '@/features/houses/components';
import {
    CaretLeftIcon,
    CaretRightIcon,
    EnvelopeSimpleIcon,
    FloppyDiskIcon,
    HouseLineIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { Controller } from 'react-hook-form';

type FormValues = z.infer<typeof houseSchema>;

const RouteComponent = () => {
    const { auth, house } = useAuth();

    if (!auth.isAuthenticated || !house.active) {
        return <NoActiveHouse />;
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(houseSchema),
        defaultValues: {
            name: house.active?.name,
        },
    });

    const onSubmit = (data: FormValues) => {
        toast.promise(handleHouseUpdate(house.active.id, data.name), {
            loading: 'Updating house...',
            success: (updatedHouse) => {
                router.navigate({
                    to: '/account/houses/$slug',
                    params: { slug: updatedHouse.slug },
                });
                return 'House updated successfully!';
            },
            error: (err) => err.message,
        });
    };

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

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <ButtonGroup>
                                    <Field data-invalid={fieldState.invalid}>
                                        <Input
                                            {...field}
                                            id="name"
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="House name"
                                            autoComplete="on"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>

                                    <Button
                                        variant="outline"
                                        aria-label="Save house name"
                                    >
                                        <FloppyDiskIcon weight="fill" />
                                    </Button>
                                </ButtonGroup>
                            )}
                        />
                    </form>
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

                    <DeleteHouse id={house.active.id} />
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/account/houses/$slug')({
    staticData: { homePath: '/h/$slug' },
    component: RouteComponent,
});
