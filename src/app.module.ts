import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
// import { databaseProviders } from './databases/database.providers';
// import { DatabaseModule } from './databases/database.module';
// ok this worked, but why can't I used the database provider?? try to figure this out
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'vermont_birds',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, // use with caution; set to false for production
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
