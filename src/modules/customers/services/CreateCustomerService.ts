import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequestCustomer {
  name: string;
  email: string;
}

class CreateCustomerService {
  // eslint-disable-next-line class-methods-use-this
  async execute({ name, email }: IRequestCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
