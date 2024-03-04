import { Controller, Post, Body } from '@nestjs/common';
import { BirdSightingService } from './birdSighting.service';

@Controller('observations')
export class BirdSightingController {
  constructor(private readonly birdSightingService: BirdSightingService) {}
  //find a user PUT request, if the user exists, update their record
  // if user doesn't exist, create a new record...upsert
  // @Get('recent')
  // getRecentObs() {
  //   console.log('inside recent obs');
  //   const birdFamily = this.birdSightingService.findBirdFamily();
  //   return birdFamily;
  // }
  // if I had more time I would create a DTO for the body
  @Post('new')
  submitBirdObs(@Body() body: any) {
    console.log('inside find all birds');
    const newObs = this.birdSightingService.submitBirdObs(body);
    return newObs;
  }
}
