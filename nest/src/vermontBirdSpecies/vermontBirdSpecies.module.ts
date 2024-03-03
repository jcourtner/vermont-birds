import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
// import { AppService } from 'src/app.service';
import { birdSpeciesProviders } from './vermontBirdSpecies.provider';

@Module({
  providers: [...birdSpeciesProviders],
})
export class UserModule {}

// imports: [AppService],
// controllers: [UserController],
// exports: [UserService],
