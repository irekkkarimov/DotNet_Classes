import {HttpException} from "@nestjs/common";

export class CustomException extends Error {
    name: string;
    message: string;
    statusCode: number;
    stack?: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode
    }
}