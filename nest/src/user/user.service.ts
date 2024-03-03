// user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

// @Injectable()
// export class BirdsService {
//   constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
//     // Use dataSource here

//   }

//   // Service methods...
// }

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  getUser(): string {
    return 'hello user';
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}

// import { User } from './entities/user.entity';

// // ...

// async someMethod() {
//   const userRepository = this.dataSource.getRepository(User);
//   // Use userRepository for database operations
// }
