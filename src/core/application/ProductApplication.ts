export interface ProductApplication {
  createProduct(newProduct: NewProductDTO): Promise<number>;
}
