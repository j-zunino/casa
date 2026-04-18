import { setActiveHouse, type House } from '@/modules/auth';
import { HouseLineIcon } from '@phosphor-icons/react';
import { useRouteContext } from '@tanstack/react-router';
import {
    HouseAvatar,
    HouseAvatarFallback,
    HouseAvatarImage,
} from './HouseAvatar';
import { HouseLabel } from './HouseLabel';

export const HouseSelect = () => {
    const { house } = useRouteContext({ from: '__root__' });

    return (
        <>
            {house.list?.map((h: House) => (
                <button
                    key={h.id}
                    onClick={() => setActiveHouse(h.id, h.slug)}
                    className="group w-30 rounded-md transition outline-none select-none"
                >
                    <HouseAvatar>
                        <HouseAvatarImage
                            src={h.logo ?? undefined}
                            alt={h.name}
                        />

                        <HouseAvatarFallback>
                            <HouseLineIcon />
                        </HouseAvatarFallback>
                    </HouseAvatar>

                    <HouseLabel label={h.name} />
                </button>
            ))}
        </>
    );
};
