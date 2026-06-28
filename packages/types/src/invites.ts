export type InvitationStatus = "active" | "revoked" | "expired";

export type Inviter = {
    name: string;
    image: string | null;
};

export type Invitation = {
    id: string;
    code: string;
    maxUses: number | null;
    useCount: number;
    inviterId: string;
    inviter: Inviter;
    houseId: string;
    status: InvitationStatus;
    revokedAt: Date | null;
    revokedById: Date | null;
    createdAt: Date;
    updatedAt: Date;
};
