import {CalculatorServiceResult} from "../dto/calculatorServiceResult";

export interface CalculatorServiceInterface {
    sum(num1: number, num2: number): Promise<number>
    subtract(num1: number, num2: number): Promise<number>
    multiply(num1: number, num2: number): Promise<number>
    divide(num1: number, num2: number): Promise<number>
}