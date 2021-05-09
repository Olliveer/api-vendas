import { getCustomRepository, Repository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ListCustomersService {
  private customersRepository: Repository<Customer>;

  constructor() {
    this.customersRepository = getCustomRepository(CustomersRepository);
  }

  public async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.find();

    return customers;
  }
}

export default ListCustomersService;
