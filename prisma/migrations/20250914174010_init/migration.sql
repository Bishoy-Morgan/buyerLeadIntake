-- CreateTable
CREATE TABLE "Buyer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'New',
    "ownerId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "notes" TEXT
);

-- CreateTable
CREATE TABLE "BuyerHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyerId" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diff" JSONB NOT NULL
);
