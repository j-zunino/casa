import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import { authClient } from './modules/auth';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {
    const { data: session } = authClient.useSession();

    return (
        <RouterProvider
            router={router}
            context={{
                auth: {
                    isAuthenticated: !!session?.user,
                    user: session?.user ?? null,
                },
            }}
        />
    );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
);
