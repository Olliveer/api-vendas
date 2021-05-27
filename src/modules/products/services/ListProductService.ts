import { inject, injectable } from 'tsyringe';
import { IProductPaginate } from '../domain/models/IProductPaginate';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(): Promise<IProductPaginate> {
    // let products = await redisCache.recover<Product[]>('api-vendas-PRODUCTS_LIST');

    const products = await this.productsRepository.findAllPaginate();

    // await redisCache.save('api-vendas-PRODUCTS_LIST', products);

    return products;
  }
}

export default ListProductService;
