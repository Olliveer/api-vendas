/* eslint-disable camelcase */
import { getCustomRepository, Repository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomersService {
  private customersRepository: Repository<Customer>;

  constructor() {
    this.customersRepository = getCustomRepository(CustomersRepository);
  }

  public async execute(): Promise<IPaginateCustomer> {
    const customers = await this.customersRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomersService;
