import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      newUser.password = await bcrypt.hash(createUserDto.password, 10);
      return await this.userRepository.save(newUser);
    } catch (error) {
      const existingUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
      if (existingUser) {
        throw new BadRequestException('El correo ya está en uso');
      }
      console.error('Error al crear usuario:', error);
      throw new BadRequestException(
        'No se pudo crear el usuario. Valide los datos.',
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new BadRequestException('No se pudieron obtener los usuarios');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const tempUser = await this.userRepository.findOneBy({ email });
      if (!tempUser) {
        throw new BadRequestException('Usuario no encontrado');
      }
      return tempUser;
    } catch (error) {
      console.error('Error al encontrar usuario:', error);
      throw new BadRequestException('Usuario no encontrado');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new BadRequestException('El usuario no existe');
      }
      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.userRepository.findOneBy({ id });
      return updatedUser!;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new BadRequestException('No se pudo actualizar el usuario');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new BadRequestException('El usuario no existe');
      }
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw new BadRequestException('No se pudo eliminar el usuario');
    }
  }
}
