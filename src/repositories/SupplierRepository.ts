import { ISupplier } from '../interfaces/User/ISupplier';
import { ISupplierRepository } from '../interfaces/Repositories/ISupplierRepository';
import SupplierModel from '../models/Supplier'; // Assuming you have a Supplier model

export class SupplierRepository implements ISupplierRepository {
  async createSupplier(supplier: ISupplier): Promise<ISupplier> {
    return await SupplierModel.create(supplier);
  }

  async getSupplierById(id: string): Promise<ISupplier | null> {
    return await SupplierModel.findById(id);
  }

  async updateSupplier(id: string, supplier: ISupplier): Promise<ISupplier | null> {
    return await SupplierModel.findByIdAndUpdate(id, supplier, { new: true });
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const result = await SupplierModel.findByIdAndDelete(id);
    return !!result;
  }
  // Other supplier-specific methods implementation
}
