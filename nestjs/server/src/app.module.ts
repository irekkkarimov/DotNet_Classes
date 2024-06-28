import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MathController} from "./controllers/math.controller";
import {CalculatorService} from "./services/calculator.service";
import {ExceptionHandlingMiddleware} from "./middlewares/exceptionHandlingMiddleware";

@Module({
  imports: [],
  controllers: [AppController, MathController],
  providers: [AppService, CalculatorService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ExceptionHandlingMiddleware)
    }

}
