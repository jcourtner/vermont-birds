/* seed the initial data for VT bird species table

https://api.ebird.org/v2/product/spplist/US-VT

// use this command to run the script npx ts-node src/databases/birdSighting.seed.ts
*/

import { DataSource } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
// import { BirdSighting } from '../entities/birdSighting.entity';
import { BirdSpeciesVT } from '../entities/vermontBirdSpecies.entity';
import * as fs from 'node:fs';
import { join } from 'path';
import { json2csv } from 'json-2-csv';

const runSeeds = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const configService = app.get(ConfigService);
  // const birdSightingRepository = dataSource.getRepository(BirdSighting);
  const birdSpeciesRepository = dataSource.getRepository(BirdSpeciesVT);

  const apiToken = configService.get<string>('EBIRD_API_TOKEN');
  try {
    const customHeaders = {
      'X-eBirdApiToken': apiToken,
    };
    const birds = await axios.get(
      'https://api.ebird.org/v2/data/obs/US-VT/recent',
      {
        headers: customHeaders,
      },
    );
    const finalJson = [];
    for (let i = 0; i < 20; i += 1) {
      const {
        speciesCode,
        comName,
        sciName,
        locId,
        lat,
        lng,
        obsValid,
        locationPrivate,
        subId,
        obsReviewed,
        exoticCategory,
        ...newObject
      } = birds.data[i];

      const { id } = await birdSpeciesRepository.findOne({
        select: { id: true },
        where: { speciesCode: `${speciesCode}` },
      });
      console.log('res', id);
      finalJson.push({
        ...newObject,
        fieldNotes: 'none',
        userId: 'c9334181-5b04-4e5d-a11f-30996c127b6c',
        speciesId: id,
      });
      // console.log('finalJson', finalJson);
    }

    //   console.log(speciesId);
    //   // finalJson.push({...newObject, fieldNotes: 'none', userId, speciesId});
    // });

    const csv = await json2csv(finalJson);
    fs.writeFileSync('./src/databases/birdSightings.csv', csv);
    const filePath = join(__dirname, 'birdSightings.csv');
    await dataSource.query(
      `COPY bird_sighting("locName", "obsDt", "howMany", "fieldNotes", "userId", "speciesId") FROM '${filePath}' DELIMITER ',' CSV HEADER;`,
    );
    await app.close();
  } catch (err) {
    console.log('error from axios request', err);
  }
};

runSeeds().catch((error) => {
  console.error('Seed error:', error);
});
