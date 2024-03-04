import { Controller, Get } from '@nestjs/common';
import { BirdService } from './vermontBirdSpecies.service';

@Controller('birds')
export class BirdSpeciesController {
  constructor(private readonly birdService: BirdService) {}
  //find a user PUT request, if the user exists, update their record
  // if user doesn't exist, create a new record...upsert
  @Get('family')
  findBirdFamily() {
    console.log('inside find bird fam');
    const birdFamily = this.birdService.findBirdFamily();
    return birdFamily;
  }
  @Get('species')
  findAllBirds() {
    console.log('inside find all birds');
    const birdSpecies = this.birdService.findAllBirds();
    return birdSpecies;
  }
  @Get(':familyName')
  findSpeciesByFamily() {
    console.log('inside find birds');
    const birdSpecies = this.birdService.findSpeciesByFamily();
    return birdSpecies;
  }
  // @Get('user')
  // getUser(): string {
  //   return this.userService.getUser();
  // }

  // @Post()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
