import { setActiveHouse, type House } from '@/modules/auth';
import { HouseLineIcon, PencilIcon } from '@phosphor-icons/react';
import { useRouteContext } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage, AvatarLabel } from '../ui/avatar';

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
