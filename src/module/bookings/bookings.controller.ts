import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateBookingInquiryDto } from './dto/create-booking.dto';
import { ListBookingInquiryDto } from './dto/list-booking-inquiries.dto';
import { UpdateBookingInquiryDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Booking inquiry created successfully' })
  async create(@Body() dto: CreateBookingInquiryDto, @Res() res: Response) {
    const data = await this.service.create(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Booking inquiry created successfully',
      data
    });
  }

  @Get()
  @ApiQuery({ name: "city", required: false })
  @ApiQuery({ name: "companyName", required: false })
  async findAll(@Query() filters: ListBookingInquiryDto, @Res() res: Response) {
    //console.log(filters);
    const data = await this.service.findAll(filters);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Booking inquiries retrieved successfully',
      data
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.service.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Booking inquiry retrieved successfully',
      data
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookingInquiryDto, @Res() res: Response) {
    const data = await this.service.update(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Booking inquiry updated successfully',
      data
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.service.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Booking inquiry deleted successfully',
      data
    });
  }
}
