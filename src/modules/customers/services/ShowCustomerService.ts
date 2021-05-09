/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequestCustomer {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequestCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
