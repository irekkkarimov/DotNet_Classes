import {CustomException} from "./abstractions/customException";
import supertest from "supertest";

export class MathBadRequestException extends CustomException {
    name: string;
    message: string;
    stack?: string;

    constructor(message: string) {
        super(message, 200)
    }
}