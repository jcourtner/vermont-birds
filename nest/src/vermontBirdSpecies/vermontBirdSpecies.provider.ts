import { DataSource } from 'typeorm';
import { BirdSpeciesVT } from '../entities/vermontBirdSpecies.entity';
export const birdSpeciesProviders = [
  {
    provide: 'BIRD_SPECIES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BirdSpeciesVT),
    inject: [DataSource],
  },
];
