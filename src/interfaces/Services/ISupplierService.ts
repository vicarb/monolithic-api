import { SupplierDTO } from '../../dtos/SupplierDTO';

export interface ISupplierService {
  registerSupplier(supplier: SupplierDTO): Promise<void>;
  authenticateSupplier(email: string, password: string): Promise<string>;
}
