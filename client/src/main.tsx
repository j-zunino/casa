import '@/main.css';
import { routeTree } from '@/routeTree.gen';
import { createRouter } from '@tanstack/react-router';
import { queryClient } from './lib/query-client';

import { GhostIcon } from '@phosphor-icons/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ErrorComponent } from './components/common/ErrorComponent';
import { Loading } from './components/common/Loading';

export const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: {
        queryClient,
        auth: {
            user: null,
            isAuthenticated: false,
            isLoading: true,
        },
    },

    defaultPendingComponent: () => <Loading />,
    defaultNotFoundComponent: () => (
        <ErrorComponent
            icon={<GhostIcon />}
            error={{
                status: 404,
                statusText: 'Not found',
                message: "The page you're looking for doesn't exist.",
            }}
        />
    ),
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }

    interface StaticDataRouteOption {
        showNavbar?: boolean;
        homePath?: string;
    }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StrictMode>,
    );
}
