import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BirdSighting } from './birdSighting.entity';

@Entity()
export class BirdSpeciesVT {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  firstName: string;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  lastName: string;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  email: string;

  @Column({ nullable: false })
  location: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => BirdSighting, (birdSighting) => birdSighting.species)
  birdSightings: BirdSighting[];
}

//one bird can have many sightings
