import { BadRequestException, Injectable, NotFoundException,InternalServerErrorException } from '@nestjs/common';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { ListVenuesDto } from './dto/ist-venues.dto';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVenueDto) {
    try {
      return await this.prisma.venue.create({ data: dto });
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException(
        error?.message || 'Failed to create venue.',
      );
    }
  }

  async findAll(filters: ListVenuesDto) {
    try {
      return await this.prisma.venue.findMany({
        where: {
          city: filters.city
            ? { contains: filters.city, mode: 'insensitive' }
            : undefined,
          capacity: filters.minCapacity
            ? { gte: filters.minCapacity }
            : undefined,
          pricePerNight: filters.maxPrice
            ? { lte: filters.maxPrice }
            : undefined,
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch venues.',
      );
    }
  }

  async findOne(id: string) {
    try {
      if (!id) throw new BadRequestException('ID is required');

      const venue = await this.prisma.venue.findUnique({ where: { id } });

      if (!venue) throw new NotFoundException('Venue not found');

      return venue;
    } catch (error) {
      console.error(error);

      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch venue.',
      );
    }
  }
  async update(id: string, dto: UpdateVenueDto) {
    try {
      if (!id) throw new BadRequestException('ID is required');

      const venue = await this.prisma.venue.findUnique({ where: { id } });
      if (!venue)
        throw new NotFoundException('Venue with this ID does not exist.');

      return await this.prisma.venue.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      console.error(error);

      if (error.code === 'P2025') {
        throw new NotFoundException('Venue not found or already deleted.');
      }

      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        error?.message || 'Failed to update venue.',
      );
    }
  }

  async remove(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }
      const venue = await this.prisma.venue.findUnique({ where: { id } });
      if (!venue) {
        throw new NotFoundException('Venue with this ID Not exists.');
      }
      await this.findOne(id);
      return this.prisma.venue.delete({ where: { id } });

    } catch (error) {
      console.error(error);
      // Prisma known errors
      if (error.code === 'P2025') {
        throw new NotFoundException('Venue not found or already deleted.');
      }

      // (BadRequest, NotFound)
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      // Fallback internal server error
      throw new InternalServerErrorException(
        error?.message || 'Failed to delete venue.'
      );
    }
  }
}
