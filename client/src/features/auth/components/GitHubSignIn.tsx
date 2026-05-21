import { Button } from '@/components/ui/button';
import { GithubLogoIcon } from '@phosphor-icons/react';

import type { ComponentProps } from 'react';
import { authHooks } from '../hooks';

export const GitHubSignIn = ({ ...props }: ComponentProps<'button'>) => {
    const { mutateAsync: signUp, isPending: isSigningUp } =
        authHooks.useSignInSocial();

    return (
        <Button
            type="button"
            onClick={() => signUp('github')}
            variant="outline"
            disabled={isSigningUp}
            {...props}
        >
            <GithubLogoIcon />
            Continue with GitHub
        </Button>
    );
};
