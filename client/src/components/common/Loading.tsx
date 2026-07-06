import { Spinner } from "@/components/ui/spinner";

export const Loading = () => {
    return (
        <div className="shimmer flex h-full w-full grow items-center justify-center gap-1 text-sm select-none">
            <Spinner />
            Loading...
        </div>
    );
};
