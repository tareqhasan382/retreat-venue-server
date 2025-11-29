import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, Res } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ListVenuesDto } from './dto/ist-venues.dto';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @ApiResponse({ status: 201, description: "Venue created successfully" })
  async create(@Body() dto: CreateVenueDto,@Res() res: Response) {
    const data = await this.venuesService.create(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Venue created successfully.',
      data: data,
    });
  }

  @Get()
  @ApiQuery({ name: "city", required: false })
  @ApiQuery({ name: "minCapacity", required: false })
  @ApiQuery({ name: "maxPrice", required: false })
  async findAll(@Query() filters: ListVenuesDto,@Res() res: Response) {
    const data = await this.venuesService.findAll(filters);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Venues Retrieve successfully.',
      data: data,
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const data = await this.venuesService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Venue Retrieve successfully.',
      data: data,
    });
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateVenueDto,@Res() res: Response) {
    const data = await this.venuesService.update(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Venue Updated successfully.',
      data: data,
    });
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response) {
    const data = await this.venuesService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Venue Deleted successfully.',
      data: data,
    });
  }
}
