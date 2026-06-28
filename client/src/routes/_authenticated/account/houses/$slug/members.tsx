import { housesQueries } from "@/features/houses/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { MembersList } from "@/features/houses/components";

const membersSearchSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { page, limit } = Route.useSearch();

    const { data } = useSuspenseQuery(
        housesQueries.members(slug, { page, limit }),
    );
    const { data: members, pagination } = data;

    return (
        <div className="flex flex-col gap-1.5">
            <h2 className="font-heading text-base font-medium">Members</h2>

            <MembersList members={members} pagination={pagination} />
        </div>
    );
};

export const Route = createFileRoute(
    "/_authenticated/account/houses/$slug/members",
)({
    validateSearch: membersSearchSchema,
    component: RouteComponent,
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context, params, deps }) => {
        await context.queryClient.ensureQueryData(
            housesQueries.members(params.slug, deps),
        );
    },
});
