import '@/main.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Loading } from '@/components/shared';
import { App } from '@/components/shared/App';
import { Toaster } from '@/components/ui/sonner';
import type { AuthContext, HouseContext } from '@/modules/auth';
import { routeTree } from '@/routeTree.gen';

export const queryClient = new QueryClient();

export const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: {
        auth: {
            isAuthenticated: false,
            user: null,
            isLoading: true,
        } as AuthContext,
        house: {
            active: null,
            list: [],
            isLoading: true,
        } as HouseContext,
    },

    defaultPendingComponent: () => <Loading />,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }

    interface StaticDataRouteOption {
        showNavbar?: boolean;
    }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
                <Toaster />
            </QueryClientProvider>
        </StrictMode>,
    );
}
