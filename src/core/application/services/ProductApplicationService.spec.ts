import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/ports/outbound';
import { ProductDomainService } from '../../domain/services';
import { ProductServiceError } from '../../shared/error/ProductServiceError';

function ProductrepositoryMock(product: Product): ProductRepository {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
}

let repositoryMock;
let service: InstanceType<typeof ProductDomainService>;

beforeAll(() => {
  repositoryMock = ProductrepositoryMock({ productId: 1 } as Product);
  service = new ProductDomainService(repositoryMock);
});

describe('ProductDomainService', () => {
  it('should call ProductRepository.save()"', async () => {
    await service.save({ productId: 1, unitPrice: 100 } as Product);

    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it('should return true productService.validateProductPrice() when unitPrice is greater than 0 "', async () => {
    const result = service.validateProductPrice({
      productId: 1,
      unitPrice: 100,
    } as Product);

    expect(result).toBe(true);
  });

  it('should throw ProductServiceError when unitPrice is negative or zero"', async () => {
    await expect(
      service.save({ productId: 1, unitPrice: 0 } as Product),
    ).rejects.toThrow(ProductServiceError);

    await expect(
      service.save({ productId: 1, unitPrice: -10 } as Product),
    ).rejects.toThrow(ProductServiceError);
  });
});
