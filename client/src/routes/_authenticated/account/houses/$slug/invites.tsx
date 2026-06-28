import { invitesQueries } from "@/features/invites/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ErrorComponent } from "@/components/common/ErrorComponent";
import { CreateInviteDialog, InvitesList } from "@/features/invites/components";

// TODO: Move to @casa/schemas
const invitesSearchSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});

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
                    goHome={false}
                    error={{
                        statusText: "No invitations are available",
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
    validateSearch: invitesSearchSchema,
    component: RouteComponent,
    loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
    loader: async ({ context, params, deps }) => {
        await context.queryClient.ensureQueryData(
            invitesQueries.all(params.slug, deps),
        );
    },
});
