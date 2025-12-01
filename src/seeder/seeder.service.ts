import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VenueType } from '@prisma/client';

@Injectable()
export class VenueSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(VenueSeeder.name);

  constructor(private prisma: PrismaService) {}

  async onApplicationBootstrap() {
    await this.seedVenues();
  }

  private async seedVenues() {
    const existing = await this.prisma.venue.findFirst();

    if (existing) {
      this.logger.log('Venues already exist, skipping seeding.');
      return;
    }

    const venues = [
      {
        name: 'Sunset Beach Resort',
        city: 'Cox’s Bazar',
        country: 'Bangladesh',
        capacity: 150,
        pricePerNight: 250,
        description: 'A beachfront resort with modern conference rooms and luxury amenities.',
        imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
        type: VenueType.RESORT,
      },
      {
        name: 'Mountain View Hotel',
        city: 'Kathmandu',
        country: 'Nepal',
        capacity: 200,
        pricePerNight: 180,
        description: 'Beautiful mountain-side hotel perfect for corporate retreats.',
        imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
        type: VenueType.HOTEL,
      },
      {
        name: 'Lakefront Executive Villa',
        city: 'Pokhara',
        country: 'Nepal',
        capacity: 40,
        pricePerNight: 320,
        description: 'Private villa with a lakeside view and high-end facilities.',
        imageUrl: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg',
        type: VenueType.VILLA,
      },
      {
        name: 'Greenland Conference Center',
        city: 'Dhaka',
        country: 'Bangladesh',
        capacity: 500,
        pricePerNight: 400,
        description: 'Large conference center ideal for seminars and corporate workshops.',
        imageUrl: 'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg',
        type: VenueType.CONFERENCE_CENTER,
      },
      {
        name: 'Royal Heritage Resort',
        city: 'Jaipur',
        country: 'India',
        capacity: 120,
        pricePerNight: 270,
        description: 'A traditional palace resort fully equipped for offsite retreats.',
        imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
        type: VenueType.RESORT,
      },
      {
        name: 'Skyline Luxury Hotel',
        city: 'Singapore',
        country: 'Singapore',
        capacity: 300,
        pricePerNight: 450,
        description: 'High-rise hotel with breathtaking views and executive meeting halls.',
        imageUrl: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
        type: VenueType.HOTEL,
      },
      {
        name: 'Ocean Cliff Villa',
        city: 'Bali',
        country: 'Indonesia',
        capacity: 30,
        pricePerNight: 350,
        description: 'Cliffside villa overlooking the ocean with full retreat amenities.',
        imageUrl: 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
        type: VenueType.VILLA,
      },
      {
        name: 'TechHub Conference Arena',
        city: 'Bangalore',
        country: 'India',
        capacity: 600,
        pricePerNight: 500,
        description: 'State-of-the-art conference facilities tailored for tech events.',
        imageUrl: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg',
        type: VenueType.CONFERENCE_CENTER,
      },
      {
        name: 'Forest Edge Retreat',
        city: 'Chittagong',
        country: 'Bangladesh',
        capacity: 80,
        pricePerNight: 200,
        description: 'A peaceful retreat surrounded by lush forest scenery.',
        imageUrl: 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
        type: VenueType.RESORT,
      },
      {
        name: 'Urban Corporate Hotel',
        city: 'Kuala Lumpur',
        country: 'Malaysia',
        capacity: 250,
        pricePerNight: 260,
        description: 'Modern hotel in the city center with excellent meeting rooms.',
        imageUrl: 'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg',
        type: VenueType.HOTEL,
      },
    ];

    await this.prisma.venue.createMany({ data: venues });

    this.logger.log('10 venues seeded successfully!');
  }
}
