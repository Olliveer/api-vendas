import { Repository, getRepository } from 'typeorm';
import { ICreateCustomer } from '../../../domain/models/ICreateCustomer';
import { ICustomersRepository } from '../../../domain/repositories/ICustomersRespository';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ id });

    return customer;
  }

  async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ email });

    return customer;
  }
}

export default CustomersRepository;
