import { DropdownAvatar } from '@/components/ui';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link, useMatches, useRouteContext } from '@tanstack/react-router';

export function Navbar() {
    const { auth } = useRouteContext({ from: '__root__' });
    const matches = useMatches();
    const homePath =
        matches.find((m) => m.staticData?.homePath)?.staticData.homePath ??
        '/';

    return (
        <header className="sticky top-0 border-b bg-background">
            <NavigationMenu className="max-w-none">
                <div className="flex w-full items-center justify-between">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link
                                to={homePath}
                                className={navigationMenuTriggerStyle()}
                                activeProps={{ className: 'underline' }}
                            >
                                Home
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                    <NavigationMenuList>
                        {auth.isAuthenticated ? (
                            <NavigationMenuItem>
                                <DropdownAvatar />
                            </NavigationMenuItem>
                        ) : (
                            <>
                                <NavigationMenuItem>
                                    <Link
                                        to="/sign-up"
                                        className={navigationMenuTriggerStyle()}
                                        activeProps={{ className: 'underline' }}
                                    >
                                        Sign Up
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link
                                        to="/sign-in"
                                        className={navigationMenuTriggerStyle()}
                                        activeProps={{ className: 'underline' }}
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
