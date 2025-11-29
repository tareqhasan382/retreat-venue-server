import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { VenueType } from '@prisma/client';

export class CreateVenueDto {
  @ApiProperty({ example: "Oceanview Resort" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Cox's Bazar" })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: "Bangladesh" })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 120 })
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({ example: 300 })
  @IsInt()
  @Min(1)
  pricePerNight: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    example: VenueType.RESORT,
    required: false,
    enum: VenueType
  })
  @IsOptional()
  @IsEnum(VenueType)
  type?: VenueType;
}
