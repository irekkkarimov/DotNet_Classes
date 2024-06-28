import {BadRequestException, InternalServerErrorException, NestMiddleware} from "@nestjs/common";
import {CustomException} from "../exceptions/abstractions/customException";

export class ExceptionHandlingMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        try {
            next()
        }
        catch (e) {
            if (e instanceof CustomException) {
                switch (e.statusCode) {
                    case 400: {
                        let response = new BadRequestException()
                        response.message = e.message
                        return response
                    }
                }
            }

            let response = new InternalServerErrorException()
            response.message = e.message
            return response
        }
    }
    
}