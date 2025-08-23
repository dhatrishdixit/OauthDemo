import { z } from "zod";

export const userSchema = z.object(
    {
        id: z.string().uuid().optional(),
        name:z.string().min(1),
        email:z.email(),
        passwordHash: z.string().min(1).optional().nullable(),
        googleId: z.string().min(1).optional().nullable(), 
        refreshToken: z.string().optional().nullable(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
    }
)