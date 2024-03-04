import { Module } from '@nestjs/common';
import { BirdSightingService } from './birdSighting.service';
import { birdSightingProviders } from './birdSighting.provider';
import { BirdSightingController } from './birdSighting.controller';

@Module({
  providers: [...birdSightingProviders, BirdSightingService],
  controllers: [BirdSightingController],
})
export class BirdSightingModule {}
