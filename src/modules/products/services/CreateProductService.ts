import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import Product from '../typeorm/entities/Product';

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

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
