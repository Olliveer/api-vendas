import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import { ICreateOrder } from '../../../domain/Models/ICreateOrder';
import { IOrderPaginate } from '../../../domain/Models/IOrderPaginate';
import { IOrdersRepository } from '../../../domain/repositories/IOrdersRepository';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async findAllPaginate(): Promise<IOrderPaginate> {
    const orders = await this.ormRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.customer', 'customer')
      .leftJoinAndSelect('orders.order_products', 'order_products')
      .paginate();

    return orders as IOrderPaginate;
  }

  async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
