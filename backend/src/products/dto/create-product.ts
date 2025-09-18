import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  IsArray,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNumber({}, { message: 'price debe ser número' })
  @IsPositive()
  price: number;
  @IsInt()
  stock: number;
  @IsNumber()
  categoryId: number;
  @IsOptional()
  @IsArray()
  images?: string[];
}
