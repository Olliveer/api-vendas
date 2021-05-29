import { v4 as uuid } from 'uuid';
import Customer from '../../../infra/typeorm/entities/Customer';
import { ICreateCustomer } from '../../models/ICreateCustomer';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';
import { ICustomersRepository } from '../ICustomersRespository';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuid();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      (findCustomer) => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  async remove(customer: Customer): Promise<void> {
    return undefined;
  }

  async findAll(): Promise<Customer[] | undefined> {
    return undefined;
  }

  public async findAllPaginate(): Promise<ICustomerPaginate> {
    const customersPaginate = {
      from: 1,
      to: 1,
      per_page: 1,
      total: 1,
      current_page: 1,
      prev_page: null,
      next_page: null,
      data: this.customers,
    };

    return customersPaginate;
  }

  async findById(id: string): Promise<Customer | undefined> {
    const customerId = this.customers.find((customer) => customer.id === id);

    return customerId;
  }

  async findByName(name: string): Promise<Customer | undefined> {
    const customerName = this.customers.find((customer) => customer.name === name);

    return customerName;
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customerEmail = this.customers.find((customer) => customer.email === email);

    return customerEmail;
  }
}

export default FakeCustomersRepository;
