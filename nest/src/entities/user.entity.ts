import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BirdSighting } from './birdSighting.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  lastName: string;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  email: string;

  @Column({ nullable: false })
  location: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => BirdSighting, (birdSighting) => birdSighting.user)
  birdSightings: BirdSighting[];
}
