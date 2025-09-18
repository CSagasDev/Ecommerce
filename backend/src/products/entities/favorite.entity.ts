import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from '../../users/entities/user.entity'; // ajusta la ruta según tu proyecto

@Entity('favorites')
@Unique(['user', 'product'])
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Product, (p) => p.favorites, {
    eager: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
