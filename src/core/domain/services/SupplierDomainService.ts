import { SupplierService } from '../ports/inbound/SupplierService';
import { SupplierRepository } from '../ports/outbound/SupplierRepository';
import { Supplier } from '../entities/Supplier';

export class SupplierDomainService implements SupplierService {
  constructor(private repository: SupplierRepository) {}

  findById(id: number): Promise<Supplier> {
    return this.repository.findById(id);
  }
}
