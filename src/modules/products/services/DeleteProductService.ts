import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequestProduct {
  id: string;
}

class DeleteProductService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ id }: IRequestProduct): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
