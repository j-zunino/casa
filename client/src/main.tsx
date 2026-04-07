import '@/main.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Loading } from '@/components/shared';
import { App } from '@/components/shared/App';
import { Toaster } from '@/modules/toast';
import { routeTree } from '@/routeTree.gen';

const queryClient = new QueryClient();
const router = createRouter({
    routeTree,
    defaultPendingComponent: () => <Loading />,
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
