interface Props {
    name: string;
    onClick: () => void;
}

// TODO: Use House Logo
export const HouseSelectCard = ({ name, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="group max-w-40 cursor-pointer outline-0 active:scale-(--scale-active)"
        >
            <div className="h-40 w-40 bg-secondary-6 outline-(--outline-color) group-hover:outline-2 group-focus-visible:outline-2" />
            <h3 className="w-full text-center wrap-break-word">{name}</h3>
        </button>
    );
};
