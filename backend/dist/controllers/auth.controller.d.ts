declare const getUserById: (id: string) => Promise<{
    authType: import("@prisma/client").$Enums.Auth;
    id: string;
    name: string;
    email: string;
} | null>;
export { getUserById };
//# sourceMappingURL=auth.controller.d.ts.map