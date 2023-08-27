import { ISupplierService } from '../interfaces/Services/ISupplierService';
import { SupplierDTO } from '../dtos/SupplierDTO';
import { SupplierRepository } from '../repositories/SupplierRepository';  // Assuming you have this repository

export class SupplierService implements ISupplierService {
  private supplierRepository: SupplierRepository;

  constructor(supplierRepository: SupplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  async registerSupplier(supplier: SupplierDTO): Promise<void> {
    // Data validation, company name checks, industry validation, etc.
    const supplierEntity = new Supplier(supplier); // Assuming that Supplier is an entity class
    await this.supplierRepository.save(supplierEntity);
  }

  async authenticateSupplier(email: string, password: string): Promise<string> {
    // Check credentials, hash password, compare, etc.
    // Return a token or user information
  }

  async getAllSuppliers(): Promise<SupplierDTO[]> {
    return await this.supplierRepository.findAll();
  }

  async getSupplierById(id: string): Promise<SupplierDTO | null> {
    return await this.supplierRepository.findById(id);
  }

  async createSupplier(data: SupplierDTO): Promise<SupplierDTO> {
    return await this.supplierRepository.create(data);
  }

  async updateSupplier(id: string, data: SupplierDTO): Promise<SupplierDTO | null> {
    return await this.supplierRepository.updateById(id, data);
  }

  async deleteSupplier(id: string): Promise<void> {
    await this.supplierRepository.deleteById(id);
  }
}
