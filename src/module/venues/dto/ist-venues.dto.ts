import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListVenuesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false, example: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  minCapacity?: number;

  @ApiProperty({ required: false, example: 300 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip ?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take ?: number = 9;
}
