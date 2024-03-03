/* seed the initial data for VT bird species table

https://api.ebird.org/v2/product/spplist/US-VT

// use this command to run the script npx ts-node src/databases/vermontBirdSpecies.seed.ts
*/

import { DataSource } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as fs from 'node:fs';
import { join } from 'path';
import { json2csv } from 'json-2-csv';

const runSeeds = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const configService = app.get(ConfigService);

  const apiToken = configService.get<string>('EBIRD_API_TOKEN');
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
      species: resp.data.toString(),
      fmt: 'json',
    };
    const customHeaders = {
      'X-eBirdApiToken': apiToken,
    };
    const birds = await axios.get(
      'https://api.ebird.org/v2/ref/taxonomy/ebird?',
      {
        headers: customHeaders,
        params: queryParams,
      },
    );
    console.log('resp', birds.data[0]);

    const finalJson = [];
    birds.data.map((obj) => {
      const {
        category,
        taxonOrder,
        bandingCodes,
        comNameCodes,
        sciNameCodes,
        order,
        familyCode,
        familySciName,
        ...newObject
      } = obj;
      finalJson.push(newObject);
    });

    const csv = await json2csv(finalJson);
    fs.writeFileSync('./src/databases/birdSpecies.csv', csv);
    const filePath = join(__dirname, 'birdSpecies.csv');
    await dataSource.query(
      `COPY bird_species_vt("sciName", "comName", "speciesCode", "familyComName") FROM '${filePath}' DELIMITER ',' CSV HEADER;`,
    );
    await app.close();
  } catch (err) {
    console.log('error from axios request', err);
  }
};

runSeeds().catch((error) => {
  console.error('Seed error:', error);
});
