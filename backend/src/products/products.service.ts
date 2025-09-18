import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { CreateProductDto } from './dto/create-product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: createProductDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }
      const product = this.productRepository.create({
        ...createProductDto,
        category,
        price: Number(createProductDto.price),
      });
      return await this.productRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(
        'Error al crear el producto. Valide los datos.',
      );
    }
  }

  async findHome(limit = 10) {
    return this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'c')
      .orderBy('RAND()')
      .take(limit)
      .getMany();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return product;
  }
}
