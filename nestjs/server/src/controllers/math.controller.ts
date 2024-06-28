import {Controller, Get, Query} from "@nestjs/common";
import {CalculatorService} from "../services/calculator.service";
import {MathRequestDto} from "../dto/mathRequestDto";
import {BadResponseDto} from "../dto/badResponseDto";


@Controller('/math')
export class MathController {

    constructor(private readonly calculatorService: CalculatorService) {}

    @Get('sum')
    async getSum(@Query() query: MathRequestDto ): Promise<number> {
        return await this.calculatorService.sum(query.num1, query.num2)
    }

    @Get('subtract')
    async getSubtract(@Query() query: MathRequestDto ): Promise<number> {
        return await this.calculatorService.subtract(query.num1, query.num2)
    }

    @Get('multiply')
    async getMultiply(@Query() query: MathRequestDto ): Promise<number> {
        return await this.calculatorService.multiply(query.num1, query.num2)
    }

    @Get('divide')
    async getDivide(@Query() query: MathRequestDto ): Promise<number> {
        return await this.calculatorService.divide(query.num1, query.num2)
    }
}