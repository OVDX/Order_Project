import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
