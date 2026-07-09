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
    error:
        | Error
        | {
              status?: number;
              statusText?: string;
              message?: string;
          };
}

// TODO: Allow to link routes and add actions
export const ErrorComponent = ({ icon, goHome = true, error }: Props) => {
    const status = error instanceof Error ? undefined : error.status;
    const statusText =
        error instanceof Error
            ? error.message
            : error.statusText || error.message;
    const message = error instanceof Error ? error.message : error.message;

    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {icon ? icon : <SealWarningIcon />}
                </EmptyMedia>

                <EmptyTitle>
                    {status && <>{status} - </>}
                    {statusText || "Something went wrong"}
                </EmptyTitle>

                {message && (
                    <EmptyDescription>
                        {/* TODO: Replace should be done in the server */}
                        {/* TODO: Should be case-insensitive */}
                        {message.replace("organization", "house")}
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
