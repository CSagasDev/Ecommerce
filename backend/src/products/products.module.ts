import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Favorite } from './entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Favorite])],
  controllers: [ProductsController, FavoritesController],
  providers: [ProductsService, FavoritesService],
  exports: [ProductsService],
})
export class ProductsModule {}
