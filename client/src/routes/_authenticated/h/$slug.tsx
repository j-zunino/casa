import { housesQueries } from "@/features/houses/queries";
import { Tasks } from "@/features/todos/components/Tasks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Link } from "@tanstack/react-router";

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { data: house } = useSuspenseQuery(housesQueries.details(slug));

    return (
        <div>
            <Link to="/">Back</Link>

            <div className="p-8">
                <Tasks slug={slug} />
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
