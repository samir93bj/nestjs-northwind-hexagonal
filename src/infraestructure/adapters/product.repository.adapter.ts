import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../northwind-database/entities';
import { ProductRepository } from '../../core/domain/ports/outbound';
import { Product } from '../../core/domain/entities/Product';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }
}
