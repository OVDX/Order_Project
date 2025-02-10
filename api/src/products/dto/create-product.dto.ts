import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: String, example: '' })
  @IsUrl()
  image: string;
}
