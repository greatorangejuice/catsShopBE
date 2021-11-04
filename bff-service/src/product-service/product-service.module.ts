import {CacheModule, Module} from '@nestjs/common';
import { ProductProcessorService } from './product-processor.service';
import { ProductServiceController } from './product-service.controller';
import {HttpModule} from "@nestjs/axios";

@Module({
  providers: [ProductProcessorService],
  controllers: [ProductServiceController],
  imports: [HttpModule.register({
    // baseURL: 'https://d8r3r3d0h3.execute-api.eu-west-1.amazonaws.com/dev/products'
  }), CacheModule.register({ttl: 120})]
})
export class ProductServiceModule {}
