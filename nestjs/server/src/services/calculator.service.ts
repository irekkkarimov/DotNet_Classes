import {CalculatorServiceInterface} from "./calculator.service.interface";
import {CalculatorServiceResult} from "../dto/calculatorServiceResult";
import {MathBadRequestException} from "../exceptions/mathBadRequestException";


export class CalculatorService implements CalculatorServiceInterface {
    async sum(num1: number, num2: number): Promise<number> {
        await new Promise(resolve => setTimeout(resolve,1000))
        return parseInt(String(num1)) + parseInt(String(num2))
    }

    async subtract(num1: number, num2: number): Promise<number> {
        await new Promise(resolve => setTimeout(resolve,1000))
        return num1 - num2
    }

    async multiply(num1: number, num2: number): Promise<number> {
        await new Promise(resolve => setTimeout(resolve,1000))
        return num1 * num2
    }

    async divide(num1: number, num2: number): Promise<number> {
        await new Promise(resolve => setTimeout(resolve,1000))
        if (num1 == 0)
            throw new MathBadRequestException("Cannot divide 0!")

        return num1 / num2
    }
}