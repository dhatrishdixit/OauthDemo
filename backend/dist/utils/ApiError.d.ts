export declare class ApiError extends Error {
    status: number;
    constructor(statusCode: number, message: string);
}
export type ApiErrorTypes = {
    status: number;
} & Error;
//# sourceMappingURL=ApiError.d.ts.map