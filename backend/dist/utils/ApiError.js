export class ApiError extends Error {
    status;
    constructor(statusCode, message) {
        super(message);
        this.status = statusCode;
    }
}
//# sourceMappingURL=ApiError.js.map