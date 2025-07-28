import { Type } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  id: number;

  @Column({ length: 100 })
  user: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  password: string;
}
