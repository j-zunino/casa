import { router } from '@/main';
import { authClient } from './auth.client';
import type { House } from './auth.types';
import { env } from '@/lib/env';

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

export const handleGithubSignIn = async () => {
    await authClient.signIn.social({
        provider: 'github',
        callbackURL: env.VITE_BETTER_AUTH_CALLBACK_URL,
    });
};

export const setActiveHouse = async (
    houseId: House['id'],
    houseSlug: House['slug'],
    path: string | undefined = '/h/$slug',
) => {
    const { data, error } = await authClient.organization.setActive({
        organizationId: houseId,
    });

    if (error) throw new Error(error.message);

    router.navigate({ to: path, params: { slug: houseSlug } });

    return data;
};

export const deleteHouse = async (houseId: House['id']) => {
    const { data, error } = await authClient.organization.delete({
        organizationId: houseId,
    });

    if (error) throw new Error(error.message);

    router.navigate({ to: '/' });

    return data;
};
