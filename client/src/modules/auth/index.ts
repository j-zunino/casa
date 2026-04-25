export { authClient } from './auth.client.ts';
export {
    deleteHouse,
    handleEmailSignIn,
    handleEmailSignUp,
    handleGithubSignIn,
    handleSignOut,
    setActiveHouse,
} from './auth.service.ts';
export type {
    AuthHouseContext,
    House,
    Invitation,
    Member,
    Session,
    User,
} from './auth.types.ts';
export { useAuth } from './useAuth.ts';
