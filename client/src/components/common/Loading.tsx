import { Spinner } from "@/components/ui/spinner";

export const Loading = () => {
    return (
        <div className="flex h-screen shimmer items-center justify-center gap-1 text-sm select-none">
            <Spinner />
            Loading...
        </div>
    );
};
