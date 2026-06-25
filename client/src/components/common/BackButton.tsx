import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

import type { LinkProps } from "@tanstack/react-router";

export const BackButton = ({ to = ".." }: LinkProps) => {
    return (
        <Button asChild variant="ghost" size="icon">
            <Link to={to} className="flex items-center">
                <ArrowLeftIcon />
            </Link>
        </Button>
    );
};
