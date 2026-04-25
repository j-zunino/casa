import { setActiveHouse, type House, useAuth } from '@/modules/auth';
import { HouseLineIcon, PencilIcon } from '@phosphor-icons/react';
import { Avatar, AvatarFallback, AvatarImage, AvatarLabel } from '../ui/avatar';

interface Props {
    editMode?: boolean;
}

export const HouseSelect = ({ editMode }: Props) => {
    const { house } = useAuth();
    const houses = house.list ?? [];

    if (houses.length === 0) return null;

    const path = editMode ? '/account/houses/$slug' : undefined;

    return (
        <>
            {houses.map((h: House) => (
                <button
                    key={h.id}
                    onClick={() => setActiveHouse(h.id, h.slug, path)}
                    className="group relative w-30 rounded-md transition outline-none select-none"
                >
                    <Avatar size="lg" rounded="normal" ring={true}>
                        <AvatarImage src={h.logo ?? undefined} alt={h.name} />

                        <AvatarFallback>
                            <HouseLineIcon />
                        </AvatarFallback>

                        {editMode && (
                            <div className="absolute inset-0 flex aspect-square items-center justify-center text-3xl backdrop-brightness-70">
                                <PencilIcon />
                            </div>
                        )}
                    </Avatar>

                    <AvatarLabel>{h.name}</AvatarLabel>
                </button>
            ))}
        </>
    );
};
