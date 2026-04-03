import { GithubLogoIcon } from '@phosphor-icons/react';
import { handleGithubSingIn } from '../../modules/auth';
import { Button } from '../ui/button';

export const SocialSignIn = () => {
    return (
        <Button type="button" onClick={handleGithubSingIn} variant="outline">
            <GithubLogoIcon weight="bold" />
            Continue with GitHub
        </Button>
    );
};
