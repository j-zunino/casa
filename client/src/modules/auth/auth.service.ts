import { authClient } from './auth.client';

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

    if (error) {
        console.error('SignUp error:', error);
        return;
    }

    return data;
};

export const handleEmailSignIn = async (email: string, password: string) => {
    const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
        rememberMe: true,
    });

    if (error) {
        console.error('SignIn error:', error);
        return null;
    }

    return data;
};

export const handleSocialSingIn = async () => {
    await authClient.signIn.social({ provider: 'github' });
};
