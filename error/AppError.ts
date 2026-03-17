export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string,
        public details?: any
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}