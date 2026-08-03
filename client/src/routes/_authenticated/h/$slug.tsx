import { housesQueries } from "@/features/houses/queries";
import { todosQueries } from "@/features/todos/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Tasks } from "@/features/todos/components/Tasks";
import { Link } from "@tanstack/react-router";

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { data: house } = useSuspenseQuery(housesQueries.details(slug));
    const { data: todos } = useSuspenseQuery(todosQueries.list(slug));

    return (
        <div>
            <Link to="/">Back</Link>

            <div className="p-8">
                <Tasks slug={slug} todos={todos.data} />
            </div>
        </div>
    );
};

export const Route = createFileRoute("/_authenticated/h/$slug")({
    staticData: { homePath: "/h/$slug" },
    component: RouteComponent,
    loader: async ({ context, params }) => {
        const house = await context.queryClient.ensureQueryData(
            housesQueries.details(params.slug),
        );

        return { house };
    },
});
