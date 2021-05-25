import { inject } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import CustomersRepository from '../../customers/infra/typeorm/repositories/CustomersRepository';
import ProductRepository from '../../products/infra/typeorm/repositories/ProductRepository';
import { ICreateOrder } from '../domain/Models/ICreateOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const productsExists = await productsRepository.findAllByIds(products);

    if (!productsExists.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const productsExistsIds = productsExists.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !productsExistsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
    }

    const quantityAvailable = products.filter(
      (product) => productsExists.filter(
        (p) => p.id === product.id,
      )[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantity  ${quantityAvailable[0].quantity}
       is not available for ${quantityAvailable[0].id}`);
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter((p) => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(
      (product) => ({
        id: product.product_id,
        quantity: productsExists.filter(
          (p) => p.id === product.product_id,
        )[0].quantity - product.quantity,
      }),
    );

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
