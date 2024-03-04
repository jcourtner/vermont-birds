// user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { BirdSighting } from 'src/entities/birdSighting.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { BirdSpeciesVT } from 'src/entities/vermontBirdSpecies.entity';

@Injectable()
export class BirdSightingService {
  constructor(
    @Inject('BIRD_SIGHTING_REPOSITORY')
    private birdSightingRepository: Repository<BirdSighting>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('BIRD_SPECIES_REPOSITORY')
    private birdSpeciesRepository: Repository<BirdSpeciesVT>,
  ) {}

  async submitBirdObs(body): Promise<BirdSighting> {
    const { email, speciesId } = body;

    let user = await this.userRepository.findOneBy({ email });
    console.log('user', user);
    if (!user) {
      user = await this.userRepository.create({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        location: 'US-VT',
        isActive: true,
      });
      user = await this.userRepository.save(user);

      const species = await this.birdSpeciesRepository.findOneBy({
        id: speciesId,
      });

      const obsRecord = new BirdSighting();
      obsRecord.locName = body.locName;
      obsRecord.howMany = parseInt(body.howMany);
      obsRecord.fieldNotes = body.fieldNotes;
      obsRecord.user = user;
      obsRecord.species = species;

      console.log('obs record', obsRecord);
      return await this.birdSightingRepository.save(obsRecord);
    }
  }
}
