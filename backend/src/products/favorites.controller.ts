import { Controller, Post, Delete, Get, Param, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Request } from 'express';
import { User } from '../users/entities/user.entity'; // Ajusta la ruta según tu estructura

interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller('me/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':productId')
  add(@Param('productId') productId: string, @Req() req: AuthenticatedRequest) {
    return this.favoritesService.add(req.user, productId);
  }

  @Delete(':productId')
  remove(
    @Param('productId') productId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.favoritesService.remove(req.user, productId);
  }

  @Get()
  list(@Req() req: AuthenticatedRequest) {
    return this.favoritesService.list(req.user);
  }
}
