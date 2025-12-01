import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { MailModule } from './module/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { VenuesModule } from './module/venues/venues.module';
import { BookingsModule } from './module/bookings/bookings.module';
import { VenueSeeder } from './seeder/seeder.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,      // makes ConfigService available everywhere
      envFilePath: '.env', // optional, default is .env
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          port: Number(config.get<string>('SMTP_PORT') || 587),
          secure: Number(config.get<string>('SMTP_PORT') || 587) === 465,
          auth: {
            user: config.get<string>('SMTP_USER'),
            pass: config.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: config.get<string>('SMTP_FROM') || config.get<string>('SMTP_USER'),
        },
      }),
    }),
      PrismaModule,
      UserModule,
      AuthModule,
      MailModule,
      VenuesModule,
      BookingsModule,
   
  ],
  controllers: [AppController],
  providers: [AppService,VenueSeeder],
})
export class AppModule {}
