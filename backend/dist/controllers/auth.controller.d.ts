import type { NextFunction, Request, Response } from "express";
declare const getUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const registerUserByCredentials: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const loginUserByCredentials: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const logout: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const oAuthHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const openIdPasswordAdditionAndChange: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const refreshAccessTokenHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const validateUserData: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { getUserById, registerUserByCredentials, refreshAccessTokenHandler, oAuthHandler, logout, loginUserByCredentials, openIdPasswordAdditionAndChange, validateUserData };
//# sourceMappingURL=auth.controller.d.ts.map