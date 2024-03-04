import { Controller, Post, Body } from '@nestjs/common';
import { BirdSightingService } from './birdSighting.service';

@Controller('observations')
export class BirdSightingController {
  constructor(private readonly birdSightingService: BirdSightingService) {}
  // if I had more time I would create a DTO for the body
  @Post('new')
  submitBirdObs(@Body() body: any) {
    console.log('inside find all birds');
    const newObs = this.birdSightingService.submitBirdObs(body);
    return newObs;
  }
}
