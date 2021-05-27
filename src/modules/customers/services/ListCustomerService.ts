import { inject, injectable } from 'tsyringe';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import { ICustomersRepository } from '../domain/repositories/ICustomersRespository';

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<ICustomerPaginate> {
    const customers = await this.customersRepository.findAllPaginate();

    return customers as ICustomerPaginate;
  }
}

export default ListCustomersService;
