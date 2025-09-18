import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('/home')
  @UseGuards(AuthGuard)
  async findHome() {
    return this.productsService.findHome(10);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOneById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}
