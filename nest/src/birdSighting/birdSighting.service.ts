// user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { BirdSighting } from 'src/entities/birdSighting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BirdSightingService {
  constructor(
    @Inject('BIRD_SIGHTING_REPOSITORY')
    private birdSightingRepository: Repository<BirdSighting>,
  ) {}
  // async getUser(): string {
  //   return 'hello user';
  // }
  // async findAll(): Promise<BirdSighting[]> {
  //   return this.birdSightingRepository.findAll();
  // }
  // async createNewEntry(record: object): Promise<BirdSighting | undefined> {
  //   return this.birdSightingRepository.create({ record });
  // }
}

// import { User } from './entities/user.entity';

// // ...

// async someMethod() {
//   const userRepository = this.dataSource.getRepository(User);
//   // Use userRepository for database operations
// }
