import { DataSource } from 'typeorm';
import { join } from 'path';
// not creating the tables! gotta debug this

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '',
        database: 'vermont_birds',
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      });

      return dataSource
        .initialize()
        .then(() => {
          console.log('database initialized');
        })
        .catch((error) => console.log(error));
    },
  },
];

// entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//create a new DataSource instance you must initialize its constructor by calling new DataSource and assigning to a global variable that you'll use across your application:
