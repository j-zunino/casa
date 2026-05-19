import { handleGithubSignIn } from '../services';

import { Button } from '@/components/ui/button';
import { GithubLogoIcon } from '@phosphor-icons/react';

export const SocialSignIn = () => {
    return (
        <Button type="button" onClick={handleGithubSignIn} variant="outline">
            <GithubLogoIcon />
            Continue with GitHub
        </Button>
    );
};
