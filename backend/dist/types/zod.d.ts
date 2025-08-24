import { z } from "zod";
export declare const userSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    email: z.ZodEmail;
    passwordHash: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    googleId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    refreshToken: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    authType: z.ZodEnum<{
        GoogleLogin: "GoogleLogin";
        PasswordLogin: "PasswordLogin";
        Both: "Both";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=zod.d.ts.map