import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ListVenuesDto } from './dto/ist-venues.dto';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @ApiResponse({ status: 201, description: "Venue created successfully" })
  create(@Body() dto: CreateVenueDto) {
    return this.venuesService.create(dto);
  }

  @Get()
  @ApiQuery({ name: "city", required: false })
  @ApiQuery({ name: "minCapacity", required: false })
  @ApiQuery({ name: "maxPrice", required: false })
  findAll(@Query() filters: ListVenuesDto) {
    return this.venuesService.findAll(filters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.venuesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateVenueDto) {
    return this.venuesService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.venuesService.remove(id);
  }
}
