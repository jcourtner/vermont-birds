import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Timestamp,
} from 'typeorm';
import { User } from './user.entity';
import { BirdSpeciesVT } from './vermontBirdSpecies.entity';

@Entity()
export class BirdSighting {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  locName: string;

  @Column({ type: 'timestamp', nullable: false })
  obsDt: Timestamp;

  @Column({ nullable: false })
  howMany: number;

  @Column({ type: 'varchar', length: 300 })
  fieldNotes: string;

  @ManyToOne(() => User, (user) => user.birdSightings)
  user: User;

  @ManyToOne(() => BirdSpeciesVT, (species) => species.birdSightings)
  species: BirdSpeciesVT;
}
