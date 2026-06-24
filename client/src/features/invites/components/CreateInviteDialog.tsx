import { useState } from 'react';
import { invitesHooks } from '../hooks';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusIcon } from '@phosphor-icons/react';
import { CreateInviteLink } from './dialog/CreateInviteLink';
import { EditInviteLink } from './dialog/EditInviteLink';

import type { House } from '@/features/houses/types';

interface Props {
    slug: House['slug'];
}

export const CreateInviteDialog = ({ slug }: Props) => {
    const [view, setView] = useState<'create' | 'edit'>('create');

    const createInvite = invitesHooks.useCreateInvite(slug);

    return (
        <Dialog
            onOpenChange={(open) => {
                if (open) {
                    setView('create');

                    if (!createInvite.data) {
                        createInvite.mutate();
                    }
                }
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusIcon />
                    Create invite
                </Button>
            </DialogTrigger>

            <DialogContent>
                <Tabs value={view} defaultValue="create">
                    <TabsContent value="create" asChild>
                        <CreateInviteLink
                            inviteCode={createInvite.data?.code}
                            isPending={createInvite.isPending}
                            onEdit={() => setView('edit')}
                        />
                    </TabsContent>

                    <TabsContent value="edit" asChild>
                        <EditInviteLink
                            slug={slug}
                            inviteCode={createInvite.data?.code}
                            onCancel={() => setView('create')}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
