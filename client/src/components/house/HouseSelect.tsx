interface Props {
    name: string;
    onClick: () => void;
}

// TODO: Use House Logo
export const HouseSelect = ({ name, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="group max-w-40 transition outline-none select-none"
        >
            <div className="focus-ring hover-ring aspect-square w-40 bg-background" />

            <span className="text-center text-sm wrap-break-word">{name}</span>
        </button>
    );
};
