/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequestCustomer {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequestCustomer): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
