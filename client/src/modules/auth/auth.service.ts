import { authClient } from './auth.client';

export const handleSignOut = async () => await authClient.signOut();

// TODO
export const handleEmailSingnUp = () => {};
export const handleEmailSingIn = () => {};

export const handleSocialSingIn = async () => {
    await authClient.signIn.social({ provider: 'github' });
};
