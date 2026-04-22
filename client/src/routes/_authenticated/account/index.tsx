import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarLabel,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CaretLeftIcon, UserIcon } from '@phosphor-icons/react';
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router';

const RouteComponent = () => {
    const { auth } = useRouteContext({ from: '__root__' });

    return (
        <div className="flex grow flex-col items-center p-8">
            <div className="flex w-full max-w-xl flex-col items-center justify-start gap-8">
                <div className="w-full justify-start">
                    <Button variant="ghost" asChild>
                        <Link to="/" className="flex items-center">
                            <CaretLeftIcon />
                            Back
                        </Link>
                    </Button>
                </div>

                <div className="w-30 rounded-md transition outline-none select-none">
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
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/account/')({
    component: RouteComponent,
});
