import { handleGithubSingIn } from '../../modules/auth';
import { Button } from '../ui';

export const SocialSignIn = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span className="h-px w-full bg-secondary-6" />
                <span className="text-secondary-6 text-sm">OR</span>
                <span className="h-px w-full bg-secondary-6" />
            </div>

            <Button onClick={handleGithubSingIn} variant="outline">
                Sign In with GitHub
            </Button>
        </div>
    );
};
