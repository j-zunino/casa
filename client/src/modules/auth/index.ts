export { authClient } from './auth.client.ts';
export {
    handleEmailSignIn,
    handleEmailSignUp,
    handleGithubSingIn,
    handleSignOut,
    setActiveHouse,
} from './auth.service.ts';
export { useAuth } from './useAuth.ts';

export type { House, Invitation, Member, Session, User } from './auth.types.ts';
