import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductServiceModule } from './product-service/product-service.module';
import { BffServiceModule } from './bff-service/bff-service.module';
import { CartServiceModule } from './cart-service/cart-service.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ProductServiceModule, BffServiceModule, CartServiceModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
