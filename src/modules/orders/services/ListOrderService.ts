import { inject, injectable } from 'tsyringe';
import { IOrderPaginate } from '../domain/Models/IOrderPaginate';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(): Promise<IOrderPaginate> {
    const orders = await this.ordersRepository.findAllPaginate();

    return orders;
  }
}

export default ListOrderService;
