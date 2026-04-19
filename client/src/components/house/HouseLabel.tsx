interface Props {
    label: string | undefined;
}

export const HouseLabel = ({ label }: Props) => {
    return (
        <p className="line-clamp-1 truncate py-2 text-center text-sm font-bold">
            {label}
        </p>
    );
};
