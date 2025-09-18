import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Category } from './category.entity';
import { Favorite } from './favorite.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Index()
  @Column({ length: 180 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string | null) =>
        value !== null ? parseFloat(value) : null,
    },
  })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column('simple-array', { nullable: true })
  images?: string[];

  @ManyToOne(() => Category, (c) => c.products, {
    eager: true,
    nullable: false,
  })
  category: Category;

  @OneToMany(() => Favorite, (f) => f.product)
  favorites: Favorite[];
}
