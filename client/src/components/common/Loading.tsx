import { Spinner } from '@/components/ui/spinner';

export const Loading = () => {
    return (
        <div className="flex h-screen items-center justify-center text-sm select-none">
            <span className="flex animate-pulse items-center gap-1">
                <Spinner />
                Loading...
            </span>
        </div>
    );
};
