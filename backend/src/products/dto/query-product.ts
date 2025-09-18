import { IsInt, IsOptional, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryProductsDto {
  @IsOptional() @IsString() q?: string; // búsqueda por texto (name/description)
  @IsOptional() @IsString() category?: string; // slug de categoría: "ropa-mujer", "electronicos"

  @IsOptional()
  @IsIn(['price', 'createdAt', 'popularity'])
  sortBy?: 'price' | 'createdAt' | 'popularity' = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';

  @IsOptional() @Type(() => Number) @IsInt() page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() limit?: number = 12;
}
