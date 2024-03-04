// user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BirdSpeciesVT } from '../entities/vermontBirdSpecies.entity';

@Injectable()
export class BirdService {
  constructor(
    @Inject('BIRD_SPECIES_REPOSITORY')
    private birdSpeciesRepository: Repository<BirdSpeciesVT>,
  ) {}

  async findBirdFamily(): Promise<BirdSpeciesVT[]> {
    return this.birdSpeciesRepository
      .createQueryBuilder('bird')
      .select('bird.familyComName')
      .distinctOn(['bird.familyComName'])
      .getRawMany();
  }

  async findAllBirds(): Promise<BirdSpeciesVT[]> {
    const result = await this.birdSpeciesRepository
      .createQueryBuilder('bird')
      .select(['bird.id', 'bird.comName'])
      .orderBy('RANDOM()')
      .limit(20)
      .getRawMany();
    return result;
  }
  async findSpeciesByFamily(): Promise<BirdSpeciesVT[]> {
    return this.birdSpeciesRepository.find();
  }
}
