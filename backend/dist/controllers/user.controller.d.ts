import type { Request, Response } from "express";
declare const adminLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const allUserInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { adminLogin, allUserInfo };
//# sourceMappingURL=user.controller.d.ts.map