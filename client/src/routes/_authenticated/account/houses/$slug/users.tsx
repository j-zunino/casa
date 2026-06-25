import { housesQueries } from "@/features/houses/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const usersSearchSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { page, limit } = Route.useSearch();

    const { data } = useSuspenseQuery(
        housesQueries.users(slug, { page, limit }),
    );
    const { data: members, pagination } = data;

    return <div></div>;
};

export const Route = createFileRoute(
    "/_authenticated/account/houses/$slug/users",
)({
    validateSearch: usersSearchSchema,
    component: RouteComponent,
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context, params, deps }) => {
        await context.queryClient.ensureQueryData(
            housesQueries.users(params.slug, deps),
        );
    },
});
