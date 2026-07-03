import "@/main.css";
import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { queryClient } from "./lib/query-client";

import { Toaster } from "@/components/ui/sonner";
import { GhostIcon } from "@phosphor-icons/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ErrorComponent } from "./components/common/ErrorComponent";
import { Loading } from "./components/common/Loading";
import { TooltipProvider } from "./components/ui/tooltip";

export const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: {
        queryClient,
    },

    defaultPendingComponent: () => <Loading />,
    defaultNotFoundComponent: () => (
        <ErrorComponent
            icon={<GhostIcon />}
            error={{
                status: 404,
                statusText: "Not found",
                message: "The page you're looking for doesn't exist.",
            }}
        />
    ),
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }

    interface StaticDataRouteOption {
        showNavbar?: boolean;
        homePath?: string;
    }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <TooltipProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <Toaster />
                </QueryClientProvider>
            </TooltipProvider>
        </StrictMode>,
    );
}
