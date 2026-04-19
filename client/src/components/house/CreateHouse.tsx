import { PlusIcon } from '@phosphor-icons/react';
import { HouseAvatar, HouseAvatarFallback } from './HouseAvatar';
import { HouseLabel } from './HouseLabel';

export const CreateHouse = () => {
    return (
        <div className="group w-30 rounded-md transition outline-none select-none">
            <HouseAvatar>
                <HouseAvatarFallback className="bg-muted/30">
                    <PlusIcon />
                </HouseAvatarFallback>
            </HouseAvatar>

            <HouseLabel label="Create" />
        </div>
    );
};
