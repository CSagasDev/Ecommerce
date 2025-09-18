import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity'; // ajusta ruta

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private readonly favRepo: Repository<Favorite>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async add(user: User, productId: string) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const existing = await this.favRepo.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
    });
    if (existing) throw new ConflictException('Ya está en favoritos');

    const fav = this.favRepo.create({ user, product });
    return this.favRepo.save(fav);
  }

  async remove(user: User, productId: string) {
    const existing = await this.favRepo.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
    });
    if (!existing) throw new NotFoundException('No está en favoritos');
    await this.favRepo.remove(existing);
    return { ok: true };
  }

  async list(user: User) {
    // Devuelve productos favoritos (puedes paginar si quieres)
    const favorites = await this.favRepo.find({
      where: { user: { id: user.id } },
      relations: ['product', 'product.category'],
      order: { createdAt: 'DESC' },
    });
    return favorites.map((f) => f.product);
  }
}
