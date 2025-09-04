import type { User } from "@prisma/client";
export type TloginRead = Pick<User, "id" | "name" | "email">;
export type userInfoType = {
    family_name: string;
    name: string;
    picture: string;
    email: string;
    given_name: string;
    id: string;
    verified_email: boolean;
};
//# sourceMappingURL=general.d.ts.map