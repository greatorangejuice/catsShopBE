import {HttpModule, Module} from '@nestjs/common';
import { CartServiceController } from './cart-service.controller';
import { CartServiceService } from './cart-service.service';

@Module({
  controllers: [CartServiceController],
  providers: [CartServiceService],
  imports: [HttpModule.register({
    // baseURL: 'https://lgvuxz0lhb.execute-api.eu-west-1.amazonaws.com/dev/api/profile/cart'
    // baseURL: process.env.cart
  })]
})
export class CartServiceModule {}
