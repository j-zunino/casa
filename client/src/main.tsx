import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@/main.css';

import { App } from '@/components/shared/App';
import { Loading } from '@/components/shared';
import { Toaster } from '@/modules/toast';
import { routeTree } from '@/routeTree.gen';

const queryClient = new QueryClient();
const router = createRouter({
    routeTree,
    defaultPendingComponent: () => (
        <div className="flex h-screen items-center justify-center">
            <Loading size="xl" />
        </div>
    ),
    context: {
        auth: {
            isAuthenticated: false,
            user: null,
            isLoading: true,
        },
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export { queryClient, router };

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <Toaster />
        </QueryClientProvider>
    </StrictMode>,
);
