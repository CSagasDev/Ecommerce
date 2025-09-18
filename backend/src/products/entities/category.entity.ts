import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 100 })
  name: string;

  @Index()
  @Column({ length: 120 })
  slug: string; // ej. "ropa-mujer", "electronicos"

  @OneToMany(() => Product, (p) => p.category)
  products: Product[];
}
