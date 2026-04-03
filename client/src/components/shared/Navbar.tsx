import { authClient } from '@/modules/auth';
import { Link } from '@tanstack/react-router';
import { DropdownAvatar } from '../ui';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

export function Navbar() {
    const { data: session } = authClient.useSession(); // TODO: Use router context

    return (
        <header className="sticky top-0 border-b bg-background">
            <NavigationMenu className="max-w-none">
                <div className="flex w-full justify-between">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link
                                to="/"
                                className={navigationMenuTriggerStyle()}
                                activeProps={{ className: 'underline' }}
                            >
                                Home
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                    <NavigationMenuList>
                        {session?.user ? (
                            <NavigationMenuItem>
                                <DropdownAvatar
                                    name={session.user.name}
                                    avatar={session.user.image}
                                />
                            </NavigationMenuItem>
                        ) : (
                            <>
                                <NavigationMenuItem>
                                    <Link
                                        to="/sign-up"
                                        className={navigationMenuTriggerStyle()}
                                        activeProps={{ className: 'underline' }}
                                    >
                                        SignUp
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
