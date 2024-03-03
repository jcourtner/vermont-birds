import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BirdSighting } from './birdSighting.entity';

@Entity()
export class BirdSpeciesVT {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  speciesCode: string;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  sciName: string;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  commName: string;

  @Column({ nullable: false })
  familyName: string;

  @OneToMany(() => BirdSighting, (birdSighting) => birdSighting.species)
  birdSightings: BirdSighting[];
}

//one bird can have many sightings
