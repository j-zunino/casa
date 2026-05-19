import '@/main.css';
import { routeTree } from '@/routeTree.gen';
import { createRouter } from '@tanstack/react-router';
import { queryClient } from './lib/query-client';

import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { NotFound } from './components/common/ErrorComponents';
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
    defaultNotFoundComponent: () => <NotFound />,
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
