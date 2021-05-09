import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ id });

    return customer;
  }

  async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ email });

    return customer;
  }
}

export default CustomersRepository;
