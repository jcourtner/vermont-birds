/* seed the initial data for bird species table

https://api.ebird.org/v2/product/spplist/US-VT

//get all taxonomy names for species in vermont
// iterate through the list and concat onto the url string

https://api.ebird.org/v2/ref/taxonomy/ebird?species=emu1, fuwduc

// src/seeds/user.seed.ts

// use this command to run the script npx ts-node src/databases/user.seed.ts
*/

/* todo
seed the database with at least one entry per table
see the db with all the vermont bird species... do this by querying the ebird api
*/
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
// @Injectable()
// export class YourService {
//   constructor(private dataSource: DataSource) {}

// }

const seedUsers = async (dataSource: DataSource): Promise<void> => {
  const userRepository = dataSource.getRepository(User);
  console.log('userRepository', userRepository);

  const myUser = {
    firstName: 'Jennifer',
    lastName: 'Courtner',
    email: 'jmichele.courtner@gmail.com',
    location: 'US-VT',
    isActive: true,
  };

  await userRepository.save(myUser);
};

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

const runSeeds = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  await seedUsers(dataSource);

  await app.close();
};

runSeeds().catch((error) => {
  console.error('Seed error:', error);
});
