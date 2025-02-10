import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  image: string;
}
