import { ISupplier } from '../User/ISupplier';

export interface ISupplierRepository {
  createSupplier(supplier: ISupplier): Promise<ISupplier>;
  getSupplierById(id: string): Promise<ISupplier | null>;
  updateSupplier(id: string, supplier: ISupplier): Promise<ISupplier | null>;
  deleteSupplier(id: string): Promise<boolean>;
  // Other supplier-specific methods as needed
}
