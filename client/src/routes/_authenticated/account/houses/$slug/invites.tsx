import { invitesQueries } from "@/features/invites/queries";
import { paginationSearchSchema } from "@casa/schemas";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ErrorComponent } from "@/components/common/ErrorComponent";
import { CreateInviteDialog, InvitesList } from "@/features/invites/components";
import { EnvelopeIcon } from "@phosphor-icons/react";

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const { page, limit } = Route.useSearch();

    const { data } = useSuspenseQuery(
        invitesQueries.all(slug, { page, limit }),
    );
    const { data: invites, pagination } = data;

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex w-full justify-between">
                <h2 className="font-heading text-base font-medium">
                    Invitation links
                </h2>

                {/* TODO: Only show for admin/owner, needs to implement house role checking */}
                <CreateInviteDialog slug={slug} />
            </div>

            {invites.length <= 0 ? (
                <ErrorComponent
                    icon={<EnvelopeIcon />}
                    goHome={false}
                    error={{
                        statusText: "No invitations available",
                        message:
                            'To create a invitation you can use the "Create invite" button.',
                    }}
                />
            ) : (
                <InvitesList
                    invites={invites}
                    pagination={pagination}
                    slug={slug}
                />
            )}
        </div>
    );
};

export const Route = createFileRoute(
    "/_authenticated/account/houses/$slug/invites",
)({
    validateSearch: paginationSearchSchema,
    component: RouteComponent,
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context, params, deps }) => {
        await context.queryClient.ensureQueryData(
            invitesQueries.all(params.slug, deps),
        );
    },
});
