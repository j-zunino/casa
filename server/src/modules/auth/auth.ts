import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { env, prisma } from '../../config/index';
import { organization } from 'better-auth/plugins';

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }),
    trustedOrigins: env.CORS_WHITELIST,
    telemetry: { enabled: false },

    emailAndPassword: { enabled: true },
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID as string,
            clientSecret: env.GITHUB_CLIENT_SECRET as string,
        },
    },

    plugins: [
        organization({
            organizationLimit: 1,
            schema: {
                organization: {
                    modelName: 'House',
                },
                session: {
                    fields: {
                        activeOrganizationId: 'activeHouseId',
                    },
                },
                member: {
                    fields: {
                        organization: 'house',
                        organizationId: 'houseId',
                    },
                },
                invitation: {
                    fields: {
                        organization: 'house',
                        organizationId: 'houseId',
                    },
                },
            },
        }),
    ],
});
