import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import RedisCache from '../../../shared/cache/RedisCache';

class ListProductService {
  // eslint-disable-next-line class-methods-use-this
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    const products = await productRepository.find();

    await redisCache.save('text', 'text');

    return products;
  }
}

export default ListProductService;
