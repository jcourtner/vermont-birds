import { DataSource } from 'typeorm';
import { BirdSighting } from '../entities/birdSighting.entity';

export const birdSightingProviders = [
  {
    provide: 'BIRD_SIGHTING_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BirdSighting),
    inject: [DataSource],
  },
];
