import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarLabel,
} from '@/components/ui/avatar';
import { HouseLineIcon, PencilIcon } from '@phosphor-icons/react';
import { CreateHouse } from './CreateHouse.tsx';
import { Link } from '@tanstack/react-router';

import type { House } from '@/features/houses/types';

interface Props {
    list: House[];
    editMode?: boolean;
}

export const HouseSelect = ({ list, editMode }: Props) => {
    if (list.length === 0) return null;

    const path = editMode ? '/account/houses/$slug' : '/h/$slug';

    return (
        <div className="flex w-full max-w-3xl flex-wrap justify-center gap-1.5 p-4">
            {list.map((h: House) => (
                <Link
                    key={h.id}
                    to={path}
                    params={{ slug: h.slug }}
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
                </Link>
            ))}

            {list.length < 5 && <CreateHouse />}
        </div>
    );
};
