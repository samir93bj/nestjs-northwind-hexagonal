import { ProductService } from '../../domain/ports/inbound/ProductService';
import { ProductRepository } from '../../domain/ports/outbound/ProductRepository';
import { Product } from '../../domain/entities/Product';
import { BadRequestException } from '@nestjs/common';

export class ProductDomainService implements ProductService {
  constructor(private repository: ProductRepository) {}

  async save(product: Product): Promise<Product> {
    if (this.validateProductPrice(product)) {
      return this.repository.save(product);
    }
    throw new BadRequestException(
      'Product price cannot be negative or equal to zero',
    );
  }

  validateProductPrice(product: Product): boolean {
    return product.unitPrice > 0;
  }
}
