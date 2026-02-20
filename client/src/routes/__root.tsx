import { useQuery } from '@tanstack/react-query';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => {
    const { isLoading, data: health } = useQuery({
        queryKey: ['health'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/api/health');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        },
    });

    return (
        <>
            <div className="flex justify-between">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>

                {isLoading ? (
                    <p>Loading server status...</p>
                ) : (
                    <p>Server status: {health.data.status}</p>
                )}
            </div>
            <hr />

            <Outlet />

            <TanStackRouterDevtools />
        </>
    );
};

export const Route = createRootRoute({ component: RootLayout });
