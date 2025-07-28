import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new BadRequestException(
        'No se pudo crear el usuario. Revise los datos.',
      );
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new BadRequestException('No se pudieron obtener los usuarios');
    }
  }

  async findOneByUser(user: string): Promise<Users> {
    try {
      const usuario = await this.userRepository.findOneBy({ user });
      if (!usuario) {
        throw new BadRequestException('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      console.error('Error al encontrar usuario:', error);
      throw new BadRequestException('Usuario no encontrado');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
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
