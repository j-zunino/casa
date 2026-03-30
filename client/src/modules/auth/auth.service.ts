import { router } from '../../main';
import { authClient } from './auth.client';

// TODO: Move logic to server

export const handleSignOut = async () => await authClient.signOut();

export const handleEmailSignUp = async (
    name: string,
    email: string,
    password: string,
) => {
    const { data, error } = await authClient.signUp.email({
        name: name,
        email: email,
        password: password,
    });

    if (error) throw new Error(error.message);

    return data;
};

export const handleEmailSignIn = async (email: string, password: string) => {
    const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
    });

    if (error) throw new Error(error.message);

    return data;
};

export const handleGithubSingIn = async () => {
    await authClient.signIn.social({ provider: 'github' });

export const setActiveHouse = async (houseid: string, houseSlug: string) => {
    const { data, error } = await authClient.organization.setActive({
        organizationId: houseid,
    });

    if (error) throw new Error(error.message);

    router.navigate({ to: `/h/${houseSlug}` });

    return data;
};
