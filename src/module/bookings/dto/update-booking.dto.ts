import { PartialType } from '@nestjs/swagger';
import { CreateBookingInquiryDto } from './create-booking.dto';


export class UpdateBookingInquiryDto extends PartialType(CreateBookingInquiryDto) {}
