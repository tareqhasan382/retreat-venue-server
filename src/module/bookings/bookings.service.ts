import { BadRequestException, Injectable,InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingInquiryDto } from './dto/create-booking.dto';
import { ListBookingInquiryDto } from './dto/list-booking-inquiries.dto';
import { UpdateBookingInquiryDto } from './dto/update-booking.dto';


@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookingInquiryDto) {
    try {
      const startDate = new Date(dto.startDate);
      const endDate = new Date(dto.endDate);

      if (startDate >= endDate) {
        throw new BadRequestException('End date must be after start date');
      }

      // Check for overlapping bookings
      const overlap = await this.prisma.bookingInquiry.findFirst({
        where: {
          venueId: dto.venueId,
          startDate: { lte: endDate },
          endDate: { gte: startDate },
        },
      });

      if (overlap) {
        throw new BadRequestException('Venue is already booked for these dates.');
      }

      return await this.prisma.bookingInquiry.create({
        data: {
          ...dto,
          startDate,
          endDate,
        },
      });
    } catch (error) {
      console.error(error);

      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException(
        error?.message || 'Failed to create booking inquiry',
      );
    }
  }


  async findAll(filters: ListBookingInquiryDto) {
    try {
      return await this.prisma.bookingInquiry.findMany({
        where: {
          companyName: filters.companyName
            ? { contains: filters.companyName, mode: 'insensitive' }
            : undefined,
          venue: filters.city
            ? { city: { contains: filters.city, mode: 'insensitive' } }
            : undefined
        },
        include: { venue: true },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch booking inquiries');
    }
  }

  async findOne(id: string) {
    try {
      const booking = await this.prisma.bookingInquiry.findUnique({
        where: { id },
        include: { venue: true }
      });

      if (!booking) throw new NotFoundException('Booking inquiry not found');

      return booking;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to retrieve booking inquiry');
    }
  }

  async update(id: string, dto: UpdateBookingInquiryDto) {
    try {
      const exists = await this.prisma.bookingInquiry.findUnique({ where: { id } });
      if (!exists) throw new NotFoundException('Booking inquiry not found');

      return await this.prisma.bookingInquiry.update({
        where: { id },
        data: dto
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to update booking inquiry');
    }
  }

  async remove(id: string) {
    try {
      const booking = await this.prisma.bookingInquiry.findUnique({ where: { id } });
      if (!booking) throw new NotFoundException('Booking inquiry not found');

      return await this.prisma.bookingInquiry.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Failed to delete booking inquiry');
    }
  }
}
