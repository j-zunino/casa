import { Button } from '@/components/ui/button';
import { GithubLogoIcon } from '@phosphor-icons/react';
import { handleGithubSignIn } from '../services';

export const SocialSignIn = () => {
    return (
        <Button type="button" onClick={handleGithubSignIn} variant="outline">
            <GithubLogoIcon />
            Continue with GitHub
        </Button>
    );
};
