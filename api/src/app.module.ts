// src/app.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [],
  imports: [
    DatabaseModule,
    ClientsModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}
