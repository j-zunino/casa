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

import type { ReactNode } from 'react';

// TODO:FIX: 'error' type is any
interface Props {
    icon?: ReactNode;
    error: any;
}
export const ErrorComponent = ({ icon, error }: Props) => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {icon ? icon : <SealWarningIcon />}
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
