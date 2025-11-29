import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookingInquiryDto {
  @ApiProperty({ example: "f3b77c82-1e21-42e9-b5d3-f85b3b18da55" })
  @IsString()
  @IsNotEmpty()
  venueId: string;

  @ApiProperty({ example: "Tech Innovators Ltd." })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: "contact@techinnovators.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "2025-12-01" })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: "2025-12-03" })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 150 })
  @IsInt()
  @Min(1)
  attendeeCount: number;
}
