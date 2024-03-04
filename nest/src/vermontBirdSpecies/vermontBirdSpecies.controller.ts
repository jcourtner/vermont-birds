import { Controller, Get } from '@nestjs/common';
import { BirdService } from './vermontBirdSpecies.service';

@Controller('birds')
export class BirdSpeciesController {
  constructor(private readonly birdService: BirdService) {}

  @Get('family')
  findBirdFamily() {
    const birdFamily = this.birdService.findBirdFamily();
    return birdFamily;
  }
  @Get('species')
  findAllBirds() {
    const birdSpecies = this.birdService.findAllBirds();
    return birdSpecies;
  }
  @Get(':familyName')
  findSpeciesByFamily() {
    const birdSpecies = this.birdService.findSpeciesByFamily();
    return birdSpecies;
  }
}
