import { router } from "@/main";

import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "@tanstack/react-router";

export const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    );
};
