import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '../../../shared/cache/RedisCache';

interface IRequestProduct {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ name, price, quantity }: IRequestProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const redisCache = new RedisCache();

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
