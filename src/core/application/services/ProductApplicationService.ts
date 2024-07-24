import { ProductApplication } from '../ProductApplication';
import {
  ProductService,
  CategoryService,
  SupplierService,
} from '../../domain/ports/inbound';
import { Product } from 'src/core/domain/entities/Product';
import { NewProductDTO } from '../../shared/dto/createProductDto';
import { ProductApplicationError } from 'src/core/shared/error/ProductApplicationError';

export class ProductApplicationService implements ProductApplication {
  constructor(
    private product: ProductService,
    private category: CategoryService,
    private supplier: SupplierService,
  ) {}

  async createProduct(newProduct: NewProductDTO) {
    const category = await this.category.findById(newProduct.categoryId);

    if (!category) {
      throw new ProductApplicationError(
        `Category with id: ${newProduct.categoryId} not found.`,
      );
    }

    const supplier = await this.supplier.findById(newProduct.supplierId);

    if (!supplier) {
      throw new ProductApplicationError(
        `Supplier with id: ${newProduct.supplierId} not found.`,
      );
    }

    const entity = Product.create(newProduct.name, category, supplier);
    const saved = await this.product.save(entity);
    return saved.productId;
  }
}
