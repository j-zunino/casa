import { AvatarEntity } from "@/components/ui/avatar";
import { HouseLineIcon, PencilIcon } from "@phosphor-icons/react";
import { CreateHouse } from "./CreateHouse";
import { House, HouseLabel } from "./House";

import type { House as HouseType } from "@/features/houses/types";
import type { LinkProps } from "@tanstack/react-router";

interface Props {
    list: HouseType[];
    editMode?: boolean;
}

export const HouseSelect = ({ list, editMode }: Props) => {
    const path: LinkProps["to"] = editMode
        ? "/account/houses/$slug"
        : "/h/$slug";

    return (
        <div className="flex w-full max-w-3xl flex-wrap justify-center gap-1.5 p-4">
            {list.map((h: HouseType) => (
                <House key={h.id} to={path} params={{ slug: h.slug }}>
                    <AvatarEntity
                        size="lg"
                        rounded="normal"
                        src={h.logo}
                        alt={h.name}
                        ring={true}
                        fallback={<HouseLineIcon />}
                    >
                        {editMode && (
                            <div className="absolute inset-0 flex aspect-square items-center justify-center bg-black/40">
                                <PencilIcon className="text-3xl text-foreground" />
                            </div>
                        )}
                    </AvatarEntity>

                    <HouseLabel>{h.name}</HouseLabel>
                </House>
            ))}

            {list.length < 5 && <CreateHouse />}
        </div>
    );
};
