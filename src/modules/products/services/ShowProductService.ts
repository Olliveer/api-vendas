import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequestProduct {
  id: string;
}

class ShowProductService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ id }: IRequestProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;