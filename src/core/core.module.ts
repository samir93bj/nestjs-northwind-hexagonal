import { DynamicModule, Module, Type } from '@nestjs/common';
import {
  CategoryRepository,
  ProductRepository,
  SupplierRepository,
} from './domain/ports/outbound';

import {
  CategoryDomainService,
  ProductDomainService,
  SupplierDomainService,
} from './domain/services';

import { ProductApplicationService } from './application/services/ProductApplicationService';

export type CoreModuleOptions = {
  modules: Type[];
  adapters?: {
    productRepository: Type<ProductRepository>;
    categoryRepository: Type<CategoryRepository>;
    supplierRepository: Type<SupplierRepository>;
  };
};

// Application service reference
export const PRODUCT_APPLICATION = 'PRODUCT_APPLICATION';
// domain services references
export const CATEGORY_SERVICE = 'CATEGORY_SERVICE';
export const PRODUCT_SERVICE = 'PRODUCT_SERVICE';
export const SUPPLIER_SERVICE = 'SUPPLIER_SERVICE';

@Module({})
export class CoreModule {
  static register({ modules, adapters }: CoreModuleOptions): DynamicModule {
    const { categoryRepository, productRepository, supplierRepository } =
      adapters;

    const ProductApplicationProvider = {
      provide: PRODUCT_APPLICATION,
      useFactory(
        product: ProductDomainService,
        category: CategoryDomainService,
        supplier: SupplierDomainService,
      ) {
        return new ProductApplicationService(product, category, supplier);
      },
      inject: [PRODUCT_SERVICE, CATEGORY_SERVICE, SUPPLIER_SERVICE],
    };

    const CategoryServiceProvider = {
      provide: CATEGORY_SERVICE,
      useFactory(repository: CategoryRepository) {
        return new CategoryDomainService(repository);
      },
      inject: [categoryRepository],
    };

    const SupplierServiceProvider = {
      provide: PRODUCT_SERVICE,
      useFactory(repository: ProductRepository) {
        return new ProductDomainService(repository);
      },
      inject: [productRepository],
    };

    const ProductServiceProvider = {
      provide: SUPPLIER_SERVICE,
      useFactory(repository: SupplierRepository) {
        return new SupplierDomainService(repository);
      },
      inject: [supplierRepository],
    };

    return {
      module: CoreModule,
      imports: [...modules],
      providers: [
        ProductApplicationProvider,
        CategoryServiceProvider,
        SupplierServiceProvider,
        ProductServiceProvider,
      ],
      exports: [PRODUCT_APPLICATION],
    };
  }
}
