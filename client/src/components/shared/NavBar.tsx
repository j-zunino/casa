import { Link } from '@tanstack/react-router';
import { authClient, handleSignOut } from '../../modules/auth';
import { Button } from '../ui';

export const NavBar = () => {
    const { data: session } = authClient.useSession(); // TODO: Use router context

    return (
        <div className="flex justify-center border-b border-secondary-6">
            <nav className="flex w-full justify-between gap-2">
                <Link
                    to="/"
                    className="px-4 py-2 underline-offset-4 [&.active]:underline"
                >
                    Home
                </Link>

                {!session?.user ? (
                    <nav className="flex items-center">
                        <Link
                            to="/sign-up"
                            className="px-4 py-2 underline-offset-4 [&.active]:underline"
                        >
                            Sign Up
                        </Link>

                        <Link
                            to="/sign-in"
                            className="px-4 py-2 underline-offset-4 [&.active]:underline"
                        >
                            Sign In
                        </Link>
                    </nav>
                ) : (
                    <Button variant="none" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                )}
            </nav>
        </div>
    );
};
