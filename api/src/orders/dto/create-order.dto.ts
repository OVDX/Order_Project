import {
  IsString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ type: String, example: 'product123' })
  @IsString()
  @IsNotEmpty()
  product: string; // Product ID

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1) // Мінімальна кількість 1
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: String, example: 'order123' })
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @ApiProperty({ type: String, example: 'client456' })
  @IsString()
  @IsNotEmpty()
  client: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
