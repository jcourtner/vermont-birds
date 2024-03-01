import { DataSource } from 'typeorm';
import { join } from 'path';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        database: 'vermont_birds',
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      });

      const final = await dataSource
        .initialize()
        .then(() => {
          console.log('database initialized');
        })
        .catch((error) => console.log(error));
      return final;
    },
  },
];

// entities: [__dirname + '/../**/*.entity{.ts,.js}'],
