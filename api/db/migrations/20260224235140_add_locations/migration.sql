-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('SHELF', 'BIN', 'BACKROOM', 'GREENHOUSE');

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
