import { invitesHooks } from '@/features/invites/hooks';
import { invitesQueries } from '@/features/invites/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
    CreateInviteLink,
    EditInviteLink,
    InvitesList,
} from '@/features/invites/components';
import { PlusIcon } from '@phosphor-icons/react';

// TODO: Move to @casa/schemas
const invitesSearchSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});

type InvitesSearch = z.infer<typeof invitesSearchSchema>;

const RouteComponent = () => {
    const [view, setView] = useState<'create' | 'edit'>('create');

    const { slug } = Route.useParams();
    const { page, limit } = Route.useSearch();
    const createInvite = invitesHooks.useCreateInvite(slug);
    const { data } = useSuspenseQuery(
        invitesQueries.all(slug, { page, limit }),
    );
    const { data: invites, pagination } = data;

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex w-full justify-between">
                <h2 className="font-heading text-base font-medium">
                    Active invite links
                </h2>

                <CreateInviteDialog slug={slug} />
            </div>

            <InvitesList invites={invites} pagination={pagination} />
        </div>
    );
};

export const Route = createFileRoute(
    '/_authenticated/account/houses/$slug/invites',
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
