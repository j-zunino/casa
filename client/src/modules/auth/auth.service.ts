import { authClient } from './auth.client';

export const handleSignOut = async () => await authClient.signOut();

// TODO
export const handleEmailSingUp = async () => {
    const { data, error } = await authClient.signUp.email({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password1234',
    });

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);
    return data;
};

export const handleEmailSignIn = async () => {
    const { data, error } = await authClient.signIn.email({
        email: 'john.doe@example.com',
        password: 'password1234',
        rememberMe: true,
    });

    if (error) {
        console.error('SignIn error:', error);
        return null;
    }

    console.log('SignIn success:', data);
    return data;
};

export const handleSocialSingIn = async () => {
    await authClient.signIn.social({ provider: 'github' });
};
