import { Module } from '@nestjs/common';
import { birdSpeciesProviders } from './vermontBirdSpecies.provider';
import { BirdService } from './vermontBirdSpecies.service';
import { BirdSpeciesController } from './vermontBirdSpecies.controller';

@Module({
  providers: [...birdSpeciesProviders, BirdService],
  controllers: [BirdSpeciesController],
})
export class UserModule {}
