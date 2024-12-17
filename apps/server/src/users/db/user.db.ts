import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firsname: string;

  @Column('text')
  lastname: string;
}
