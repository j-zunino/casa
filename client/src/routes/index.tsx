import { createFileRoute } from '@tanstack/react-router';
import { Button } from '../components/ui';
import { handleSignOut } from '../modules/auth';

const Index = () => {
    return (
        <div className="flex w-full flex-col items-center">
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
});
