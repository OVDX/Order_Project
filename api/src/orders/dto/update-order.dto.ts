import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ type: String, example: 'product-123' })
  @IsString()
  @IsOptional()
  product?: string; // ID товару

  @ApiProperty({ type: Number, example: 2 })
  @IsNumber()
  @IsOptional()
  quantity?: number; // Кількість товару
}

export class UpdateOrderDto {
  @ApiProperty({ type: String, example: 'ORD-001' })
  @IsString()
  @IsOptional()
  orderNumber?: string;

  @ApiProperty({ type: String, example: 'client-456' })
  @IsString()
  @IsOptional()
  client?: string; // ID клієнта

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsOptional()
  items?: OrderItemDto[];

  @ApiProperty({ type: String, example: 'Processing' })
  @IsString()
  @IsOptional()
  status?: string;
}
