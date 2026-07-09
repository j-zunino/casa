import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { HouseLineIcon, SealWarningIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

import type { ReactNode } from "react";

interface Props {
    icon?: ReactNode;
    goHome?: boolean;
    error: {
        status?: number;
        statusText?: string;
        message?: string;
    };
}

export const ErrorComponent = ({ icon, goHome = true, error }: Props) => {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {icon ? icon : <SealWarningIcon />}
                </EmptyMedia>

                <EmptyTitle>
                    {error.status && <>{error.status} - </>}
                    {error.statusText || "Something went wrong"}
                </EmptyTitle>

                {error.message && (
                    <EmptyDescription>
                        {/* TODO: Replace should be done in the server */}
                        {/* TODO: Should be case-insensitive */}
                        {error.message.replace("organization", "house")}
                    </EmptyDescription>
                )}
            </EmptyHeader>

            {goHome && (
                <EmptyContent>
                    <Button variant="outline" asChild>
                        <Link to="/">
                            <HouseLineIcon />
                            Go home
                        </Link>
                    </Button>
                </EmptyContent>
            )}
        </Empty>
    );
};
