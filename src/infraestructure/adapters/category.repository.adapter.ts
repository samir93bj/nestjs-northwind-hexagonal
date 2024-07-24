import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/domain/entities/Category';
import { CategoryRepository } from 'src/core/domain/ports/outbound';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../northwind-database/entities';

@Injectable()
export class CategoryRepositoryAdapter implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async findById(id: number): Promise<Category> {
    return this.repository.findOneBy({ categoryId: id });
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }
}
