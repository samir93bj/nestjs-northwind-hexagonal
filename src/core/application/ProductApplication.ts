import { NewProductDTO } from '../shared/dto/createProductDto';

export interface ProductApplication {
  createProduct(newProduct: NewProductDTO): Promise<number>;
}
