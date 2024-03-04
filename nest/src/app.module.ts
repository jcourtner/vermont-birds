import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

import { join } from 'path';
import { userProviders } from './user/user.provider';
import { birdSpeciesProviders } from './vermontBirdSpecies/vermontBirdSpecies.provider';
import { BirdService } from './vermontBirdSpecies/vermontBirdSpecies.service';
import { BirdSpeciesController } from './vermontBirdSpecies/vermontBirdSpecies.controller';
import { BirdSightingService } from './birdSighting/birdSighting.service';
import { birdSightingProviders } from './birdSighting/birdSighting.provider';
import { BirdSightingController } from './birdSighting/birdSighting.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables globally available
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: '',
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, // set to false for production
    }),
  ],
  providers: [
    AppService,
    UserService,
    ...userProviders,
    ...birdSpeciesProviders,
    BirdService,
    BirdSightingService,
    ...birdSightingProviders,
  ],
  controllers: [
    AppController,
    UserController,
    BirdSpeciesController,
    BirdSightingController,
  ],
})
export class AppModule {}
