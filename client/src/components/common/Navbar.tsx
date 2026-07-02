import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { authQueries } from "@/features/auth/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMatches } from "@tanstack/react-router";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { DropdownAvatar } from "./DropdownAvatar";

export function Navbar() {
    const { data: session } = useSuspenseQuery(authQueries.session());

    const matches = useMatches();
    const homePath =
        matches.find((m) => m.staticData.homePath)?.staticData.homePath ?? "/";

    return (
        <header className="border-b bg-background">
            <NavigationMenu className="max-w-none">
                <div className="flex w-full items-center justify-between">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link
                                to={homePath}
                                className={navigationMenuTriggerStyle()}
                                activeProps={{ className: "underline" }}
                            >
                                Home
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                    <NavigationMenuList>
                        {/* TODO:FIX: 'session' is possibly undefined */}
                        {session?.session ? (
                            <NavigationMenuItem>
                                <DropdownAvatar />
                            </NavigationMenuItem>
                        ) : (
                            <>
                                <NavigationMenuItem>
                                    <Link
                                        to="/sign-up"
                                        className={navigationMenuTriggerStyle()}
                                        activeProps={{ className: "underline" }}
                                    >
                                        Sign Up
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link
                                        to="/sign-in"
                                        className={navigationMenuTriggerStyle()}
                                        activeProps={{ className: "underline" }}
                                    >
                                        Sign In
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        )}
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
        </header>
    );
}
