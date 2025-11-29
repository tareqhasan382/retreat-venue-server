import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from "class-validator";

export class ListBookingInquiryDto {
  @ApiPropertyOptional({ example: "Dhaka" })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: "Tech" })
  @IsOptional()
  @IsString()
  companyName?: string;
}
