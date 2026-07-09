import { housesQueries } from "@/features/houses/queries";
import { paginationSearchSchema } from "@casa/schemas";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ErrorComponent } from "@/components/common/ErrorComponent";
import { MembersList } from "@/features/houses/components";
import { UsersThreeIcon } from "@phosphor-icons/react";

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

            {members.length <= 0 ? (
                <ErrorComponent
                    icon={<UsersThreeIcon />}
                    goHome={false}
                    error={{
                        statusText: "No members available",
                        message: "Invite members to see them here.",
                    }}
                />
            ) : (
                <MembersList members={members} pagination={pagination} />
            )}
        </div>
    );
};

export const Route = createFileRoute(
    "/_authenticated/account/houses/$slug/members",
)({
    validateSearch: paginationSearchSchema,
    component: RouteComponent,
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context, params, deps }) => {
        await context.queryClient.ensureQueryData(
            housesQueries.members(params.slug, deps),
        );
    },
});
