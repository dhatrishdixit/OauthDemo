-- CreateEnum
CREATE TYPE "public"."Auth" AS ENUM ('GoogleLogin', 'PasswordLogin', 'Both');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "authType" "public"."Auth" NOT NULL DEFAULT 'PasswordLogin';
