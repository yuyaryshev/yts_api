export interface ResponseWithError {
    error: {
        message: string;
        code?: string;
        stack?: string;
        [key: string]: any;
    };
}
