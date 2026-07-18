import { env, prisma } from "@/config";
import { signUpSchema } from "@casa/schemas";
import { ErrorCodes } from "@casa/types";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { customSession, organization } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import { generateSlug, parseHouseName } from "../houses/houses.utils";

const ac = createAccessControl({
    organization: ["update", "delete"],
    member: ["update", "delete", "read"],
    invitation: ["create", "update", "revoke", "delete", "read"],
} as const);

const owner = ac.newRole({
    organization: ["update", "delete"],
    member: ["update", "delete", "read"],
    invitation: ["create", "update", "revoke", "delete", "read"],
});

const admin = ac.newRole({
    organization: ["update"],
    member: ["delete", "read"],
    invitation: ["create", "update", "revoke", "read"],
});

const member = ac.newRole({
    member: ["read"],
});

export const roleDefinitions = { owner, admin, member } as const;

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
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
            ac,
            roles: {
                owner,
                admin,
                member,
            },
            organizationHooks: {
                beforeCreateOrganization: async ({ organization }) => {
                    const name = parseHouseName(organization.name ?? "");
                    const slug = generateSlug(name);

                    await auth.api.checkOrganizationSlug({ body: { slug } });

                    return { data: { ...organization, name, slug } };
                },

                beforeUpdateOrganization: async ({ organization, member }) => {
                    const name = parseHouseName(organization.name ?? "");
                    const slug = generateSlug(name);
                    const current = await prisma.house.findUnique({
                        where: { id: member.organizationId },
                        select: { slug: true },
                    });

                    if (!current) {
                        throw new APIError(ErrorCodes.NOT_FOUND, {
                            message: "House not found",
                        });
                    }
                    if (slug !== current.slug) {
                        await auth.api.checkOrganizationSlug({
                            body: { slug },
                        });
                    }

                    return { data: { ...organization, name, slug } };
                },
            },
            schema: {
                organization: {
                    modelName: "House",
                },
                session: {
                    fields: {
                        activeOrganizationId: "activeHouseId",
                    },
                },
                member: {
                    fields: {
                        organization: "house",
                        organizationId: "houseId",
                    },
                },
                invitation: {
                    fields: {
                        organization: "house",
                        organizationId: "houseId",
                    },
                },
            },
        }),
        customSession(async ({ user, session }) => {
            const account = await prisma.account.findMany({
                where: { userId: user.id },
                select: { providerId: true },
            });
            return {
                user: {
                    ...user,
                    isOAuth: account.some((a) => a.providerId !== "credential"),
                },
                session,
            };
        }),
    ],

    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path.startsWith("/sign-up/email")) {
                const result = signUpSchema.safeParse(ctx.body);

                if (!result.success) {
                    throw new APIError(ErrorCodes.BAD_REQUEST, {
                        message:
                            result.error.issues[0]?.message ?? "invalid input",
                    });
                }
            }

            // TODO: Prevent names to contain "@"
            if (ctx.path === "/organization/remove-member") {
                const session = await auth.api.getSession({
                    headers: ctx.headers,
                });
                if (!session) {
                    throw new APIError("UNAUTHORIZED", {
                        message: "Not authenticated",
                    });
                }

                const actor = await prisma.member.findFirst({
                    where: {
                        userId: session.user.id,
                        houseId: ctx.body.organizationId, // NOTE: Probably shouldn't trust this
                    },
                    select: { role: true },
                });

                if (!actor) {
                    throw new APIError(ErrorCodes.FORBIDDEN, {
                        message: "You are not a member of this house",
                    });
                }

                const target = await prisma.member.findUnique({
                    where: { id: ctx.body.memberIdOrEmail },
                    select: { role: true },
                });

                if (!target) {
                    throw new APIError(ErrorCodes.NOT_FOUND, {
                        message: "Member not found",
                    });
                }

                const roleRank = {
                    member: 0,
                    admin: 1,
                    owner: 2,
                } as const;

                if (
                    roleRank[actor.role as keyof typeof roleRank] <=
                    roleRank[target.role as keyof typeof roleRank]
                ) {
                    throw new APIError(ErrorCodes.FORBIDDEN, {
                        message: "You cannot remove an equal or higher role",
                    });
                }
            }
        }),
    },
});
