import { Repository, getRepository } from 'typeorm';
import { ICreateCustomer } from '../../../domain/models/ICreateCustomer';
import { ICustomerPaginate } from '../../../domain/models/ICustomerPaginate';
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

  async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  async findAll(): Promise<Customer[] | undefined> {
    const customers = await this.ormRepository.find();

    return customers;
  }

  async findAllPaginate(): Promise<ICustomerPaginate> {
    const customers = await this.ormRepository.createQueryBuilder().paginate();

    return customers as ICustomerPaginate;
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
