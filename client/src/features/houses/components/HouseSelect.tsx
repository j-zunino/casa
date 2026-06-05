import { setActiveHouse } from '../services/houses.service.ts';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarLabel,
} from '@/components/ui/avatar';
import { HouseLineIcon, PencilIcon } from '@phosphor-icons/react';
import { CreateHouse } from './CreateHouse.tsx';

import type { House } from '@/features/houses/types';

interface Props {
    list: House[];
    editMode?: boolean;
}

export const HouseSelect = ({ list, editMode }: Props) => {
    if (list.length === 0) return null;

    const path = editMode ? '/account/houses/$slug' : undefined;

    return (
        <div className="flex w-full max-w-3xl flex-wrap justify-center gap-1.5 p-4">
            {list.map((h: House) => (
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

            {list.length < 5 && <CreateHouse />}
        </div>
    );
};
