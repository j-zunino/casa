import { housesQueries } from "@/features/houses/queries";
import { todosQueries } from "@/features/todos/queries";
import { paginationSearchSchema } from "@casa/schemas";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Tasks } from "@/features/todos/components/Tasks";
import { Link } from "@tanstack/react-router";

const LIMIT = 5;

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { page } = Route.useSearch();
    const { data: house } = useSuspenseQuery(housesQueries.details(slug));
    const { data: todos } = useSuspenseQuery(
        todosQueries.list(slug, { page, limit: LIMIT }),
    );

    return (
        <div>
            <Link to="/">Back</Link>

            <div className="p-8">
                <Tasks slug={slug} todos={todos.data} pagination={todos.pagination} />
            </div>
        </div>
    );
};

export const Route = createFileRoute("/_authenticated/h/$slug")({
    staticData: { homePath: "/h/$slug" },
    validateSearch: paginationSearchSchema,
    component: RouteComponent,
    loaderDeps: ({ search: { page } }) => ({ page }),
    loader: async ({ context, params, deps }) => {
        const house = await context.queryClient.ensureQueryData(
            housesQueries.details(params.slug),
        );

        const todos = await context.queryClient.ensureQueryData(
            todosQueries.list(params.slug, { page: deps.page, limit: LIMIT }),
        );

        return { house, todos };
    },
});
