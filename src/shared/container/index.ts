import { container } from 'tsyringe';
import { ICustomersRepository } from '../../modules/customers/domain/repositories/ICustomersRespository';
import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IOrdersRepository } from '../../modules/orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '../../modules/orders/infra/typeorm/repositories/OrdersRepository';
import { IProductsRepository } from '../../modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '../../modules/products/infra/typeorm/repositories/ProductsRepository';
import { IUsersRepository } from '../../modules/users/domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../../modules/users/domain/repositories/IUserTokensRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import UsersTokenRepository from '../../modules/users/infra/typeorm/repositories/UsersTokenRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UsersTokenRepository,
);
