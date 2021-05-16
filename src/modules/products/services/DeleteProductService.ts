import { getCustomRepository } from 'typeorm';
import redisCache from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequestProduct {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequestProduct): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
