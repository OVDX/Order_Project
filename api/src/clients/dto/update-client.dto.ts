import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, example: '' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsOptional()
  address?: string;
}
