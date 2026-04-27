import {
    HouseLineIcon,
    SealWarningIcon,
    ShieldWarningIcon,
} from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '../ui/empty';

export const NotFound = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <SealWarningIcon />
                </EmptyMedia>

                <EmptyTitle>404 - Not Found</EmptyTitle>
                <EmptyDescription>
                    The page you&apos;re looking for doesn&apos;t exist.
                </EmptyDescription>

                <EmptyContent>
                    <Button variant="outline" asChild>
                        <Link to="/">
                            <HouseLineIcon />
                            Go home
                        </Link>
                    </Button>
                </EmptyContent>
            </EmptyHeader>
        </Empty>
    );
};

export const NoActiveHouse = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <ShieldWarningIcon />
                </EmptyMedia>

                <EmptyTitle>Access denied</EmptyTitle>
                <EmptyDescription>
                    We couldn&apos;t confirm you are a member of this house,
                    please go back and try again.
                </EmptyDescription>

                <EmptyContent>
                    <Button variant="outline" asChild>
                        <Link to="/">
                            <HouseLineIcon />
                            Go home
                        </Link>
                    </Button>
                </EmptyContent>
            </EmptyHeader>
        </Empty>
    );
};
