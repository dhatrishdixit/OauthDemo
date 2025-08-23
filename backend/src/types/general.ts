import type { User } from "@prisma/client";

// Omit<User,'createdAt'|'updatedAt'|'passwordHash'|'googleId'|'refreshToken'>
export type TloginRead = Pick<User,"id"|"name"|"email">

