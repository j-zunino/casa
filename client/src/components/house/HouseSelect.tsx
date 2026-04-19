import { setActiveHouse, type House } from '@/modules/auth';
import { HouseLineIcon, PencilIcon } from '@phosphor-icons/react';
import { useRouteContext } from '@tanstack/react-router';
import {
    HouseAvatar,
    HouseAvatarFallback,
    HouseAvatarImage,
} from './HouseAvatar';
import { HouseLabel } from './HouseLabel';

interface Props {
    editMode?: boolean;
}

export const HouseSelect = ({ editMode }: Props) => {
    const { house } = useRouteContext({ from: '__root__' });

    const path = editMode ? '/account/houses/$slug' : undefined;

    return (
        <>
            {house.list?.map((h: House) => (
                <button
                    key={h.id}
                    onClick={() => setActiveHouse(h.id, h.slug, path)}
                    className="group relative w-30 rounded-md transition outline-none select-none"
                >
                    <HouseAvatar>
                        <HouseAvatarImage
                            src={h.logo ?? undefined}
                            alt={h.name}
                        />

                        <HouseAvatarFallback>
                            <HouseLineIcon />
                        </HouseAvatarFallback>

                        {editMode && (
                            <div className="absolute inset-0 flex aspect-square items-center justify-center text-3xl backdrop-brightness-70">
                                <PencilIcon />
                            </div>
                        )}
                    </HouseAvatar>

                    <HouseLabel label={h.name} />
                </button>
            ))}
        </>
    );
};
