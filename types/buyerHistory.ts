export type BuyerHistory = {
    id: string; // uuid
    buyerId: string; // references Buyer.id
    changedBy: string; // user id
    changedAt: Date;
    diff: Record<string, unknown>; // JSON of changed fields
};
