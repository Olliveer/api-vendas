/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequestOrder {
  id: string;
}

class ShowOrderService {
  async execute({ id }: IRequestOrder): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
