import '@/main.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from '@/routeTree.gen';

import { App } from './App';
import { NotFound } from './components/common/ErrorComponents';
import { Loading } from './components/common/Loading';

export const queryClient = new QueryClient();

export const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: {
        auth: {
            user: null,
            isAuthenticated: false,
            isLoading: true,
        },
        house: {
            active: null,
            list: [],
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
