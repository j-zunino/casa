import { PlusIcon } from '@phosphor-icons/react';

export const CreateHouse = () => {
    return (
        <div className="group w-max shrink transition outline-none select-none">
            <div className="focus-ring hover-ring flex size-30 shrink-0 select-none">
                <div className="flex size-full items-center justify-center bg-background text-2xl text-muted-foreground">
                    <PlusIcon />
                </div>
            </div>

            <p className="line-clamp-1 truncate py-2 text-center text-sm font-bold">
                Create
            </p>
        </div>
    );
};
