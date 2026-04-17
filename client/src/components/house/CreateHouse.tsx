import { PlusIcon } from '@phosphor-icons/react';
import { HouseAvatar, HouseAvatarFallback } from './HouseAvatar';
import { HouseLabel } from './HouseLabel';

export const CreateHouse = () => {
    return (
        <div className="group w-30 transition outline-none select-none">
            <HouseAvatar>
                <HouseAvatarFallback>
                    <PlusIcon />
                </HouseAvatarFallback>
            </HouseAvatar>

            <HouseLabel label="Create" />
        </div>
    );
};
