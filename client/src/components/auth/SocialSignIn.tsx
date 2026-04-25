import { GithubLogoIcon } from '@phosphor-icons/react';
import { handleGithubSignIn } from '@/modules/auth';
import { Button } from '@/components/ui/button';

export const SocialSignIn = () => {
    return (
        <Button type="button" onClick={handleGithubSignIn} variant="outline">
            <GithubLogoIcon />
            Continue with GitHub
        </Button>
    );
};
