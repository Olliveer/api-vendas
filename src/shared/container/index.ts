import { container } from 'tsyringe';
import { ICustomersRepository } from '../../modules/customers/domain/repositories/ICustomersRespository';
import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IOrdersRepository } from '../../modules/orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '../../modules/orders/infra/typeorm/repositories/OrdersRepository';
import { IProductRepository } from '../../modules/products/domain/repositories/IProductRepository';
import ProductRepository from '../../modules/products/infra/typeorm/repositories/ProductRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.resolve<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
