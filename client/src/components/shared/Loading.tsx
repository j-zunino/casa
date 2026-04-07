import { Spinner } from '@/components/ui/spinner';

export const Loading = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <span className="flex animate-pulse items-center gap-1">
                <Spinner />
                Loading...
            </span>
        </div>
    );
};
