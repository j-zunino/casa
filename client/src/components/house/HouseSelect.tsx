import { setActiveHouse, type House } from '@/modules/auth';
import { HouseLineIcon } from '@phosphor-icons/react';
import { useRouteContext } from '@tanstack/react-router';
import {
    HouseAvatar,
    HouseAvatarFallback,
    HouseAvatarImage,
} from './HouseAvatar';

export const HouseSelect = () => {
    const { house } = useRouteContext({ from: '__root__' });

    return (
        <>
            {house.list?.map((h: House) => (
                <button
                    onClick={() => setActiveHouse(h.id, h.slug)}
                    className="group w-max shrink transition outline-none select-none"
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

                    <p className="line-clamp-1 truncate py-2 text-center text-sm font-bold">
                        {h.name}
                    </p>
                </button>
            ))}
        </>
    );
};
