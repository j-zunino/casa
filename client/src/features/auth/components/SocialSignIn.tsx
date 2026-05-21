import { handleGithubSignIn } from '../services';

import { Button } from '@/components/ui/button';
import { GithubLogoIcon } from '@phosphor-icons/react';

import type { ComponentProps } from 'react';

export const SocialSignIn = ({ ...props }: ComponentProps<'button'>) => {
    return (
        <Button
            type="button"
            onClick={handleGithubSignIn}
            variant="outline"
            {...props}
        >
            <GithubLogoIcon />
            Continue with GitHub
        </Button>
    );
};
