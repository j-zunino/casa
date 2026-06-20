import {
    GhostIcon,
    HouseLineIcon,
    SealWarningIcon,
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

// TODO:FIX: 'error' type is any
export const ErrorComponent = ({ error }) => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <SealWarningIcon />
                </EmptyMedia>

                <EmptyTitle>
                    {error.status || '500'} -{' '}
                    {error.statusText || 'Something went wrong'}
                </EmptyTitle>
                <EmptyDescription>
                    {error.message.replace('organization', 'house')}
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

export const NotFound = () => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <GhostIcon />
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
