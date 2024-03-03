import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BirdSpeciesVT } from './vermontBirdSpecies.entity';

@Entity()
export class BirdSighting {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  category: string;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  familyCommonName: string;

  @Column({ nullable: false })
  locationName: string;

  @Column({ nullable: false })
  howMany: number;

  @Column({ unique: true, type: 'varchar', length: 300, nullable: false })
  fieldNotes: string;

  @ManyToOne(() => User, (user) => user.birdSightings)
  user: User;

  @ManyToOne(() => BirdSpeciesVT, (species) => species.birdSightings)
  species: BirdSpeciesVT;
}
