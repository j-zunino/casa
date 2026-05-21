import { env, prisma } from '@/config';
import { signUpSchema } from '@casa/schemas';
import { ErrorCodes } from '@casa/types';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { APIError, createAuthMiddleware } from 'better-auth/api';
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
            organizationLimit: 5,
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

    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path.startsWith('/sign-up/email')) {
                const result = signUpSchema.safeParse(ctx.body);

                if (!result.success) {
                    throw new APIError(ErrorCodes.BAD_REQUEST, {
                        message:
                            result.error.issues[0]?.message ?? 'invalid input',
                    });
                }
            }
        }),
    },
});
