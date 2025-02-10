import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ type: String, example: '' })
  @IsString()
  readonly name: string;

  @ApiProperty({ type: String, example: '' })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ type: String, example: '' })
  @IsPhoneNumber()
  readonly phone: string;
  @ApiProperty({ type: String, example: '' })
  readonly address: string;
}
