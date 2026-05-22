import { housesQueries } from '@/features/houses/queries';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Link } from '@tanstack/react-router';

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { data: house } = useSuspenseQuery(housesQueries.details({ slug }));

    return (
        <div>
            <Link to="/">Back</Link>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/h/$slug')({
    staticData: { homePath: '/h/$slug' },
    component: RouteComponent,
    loader: async ({ context, params }) => {
        const house = await context.queryClient.ensureQueryData(
            housesQueries.details({ slug: params.slug }),
        );

        if (!house) throw notFound();

        return { house };
    },
});
