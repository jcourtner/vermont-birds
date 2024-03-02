/* seed the initial data for bird species table

https://api.ebird.org/v2/product/spplist/US-VT

//get all taxonomy names for species in vermont
// iterate through the list and concat onto the url string

https://api.ebird.org/v2/ref/taxonomy/ebird?species=emu1, fuwduc

// src/seeds/user.seed.ts


// use this command to run the script npx ts-node src/databases/vermontBirdSpecies.seed.ts
*/

/* todo
seed the database with at least one entry per table
see the db with all the vermont bird species... do this by querying the ebird api
*/
// import { DataSource } from 'typeorm';
// import { User } from '../entities/user.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

// @Injectable()
// export class YourService {
//   constructor(private dataSource: DataSource) {}

// }

// const seedUsers = async (dataSource: DataSource): Promise<void> => {
//   const userRepository = dataSource.getRepository(User);
//   console.log('userRepository', userRepository);

//   const myUser = {
//     firstName: 'Jennifer',
//     lastName: 'Courtner',
//     email: 'jmichele.courtner@gmail.com',
//     location: 'US-VT',
//     isActive: true,
//   };

//   await userRepository.save(myUser);
// };

const runSeeds = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  // const dataSource = app.get(DataSource);
  const configService = app.get(ConfigService);

  const apiToken = configService.get<string>('EBIRD_API_TOKEN');
  // await seedUsers(dataSource);
  try {
    const resp = await axios.get(
      'https://api.ebird.org/v2/product/spplist/US-VT',
      {
        headers: {
          'X-eBirdApiToken': apiToken,
        },
      },
    );
    const queryParams = {
      species: 'emu1, bbwduc, fuwduc',
      fmt: 'json',
    };
    const customHeaders = {
      'X-eBirdApiToken': apiToken,
    };
    console.log('querparams', queryParams);
    const birds = await axios.get(
      'https://api.ebird.org/v2/ref/taxonomy/ebird?',
      {
        headers: customHeaders,
        params: queryParams,
      },
    );
    console.log('resp', birds.data);
  } catch (err) {
    console.log('error from axios request', err);
  }

  // await app.close();
};

runSeeds().catch((error) => {
  console.error('Seed error:', error);
});
