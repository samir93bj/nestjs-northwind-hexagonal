import { Supplier } from '../../Supplier';

export interface SupplierService {
  findById(id: number): Promise<Supplier>;
}
