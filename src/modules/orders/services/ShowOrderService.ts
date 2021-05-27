import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IOrder } from '../domain/Models/IOrder';
import { IShowOrder } from '../domain/Models/IShowOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
