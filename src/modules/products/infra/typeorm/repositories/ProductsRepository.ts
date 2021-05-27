import {
  getRepository, In, Repository,
} from 'typeorm';
import { ICreateProduct } from '../../../domain/models/ICreateProduct';
import { IFindProducts } from '../../../domain/models/IFindProducts';
import { IProduct } from '../../../domain/models/IProduct';
import { IProductPaginate } from '../../../domain/models/IProductPaginate';
import { IUpdateStockProduct } from '../../../domain/models/IUpdateStockProduct';
import { IProductsRepository } from '../../../domain/repositories/IProductsRepository';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  async findById(id: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({ name });

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = this.ormRepository.find();

    return products;
  }

  async findAllPaginate(): Promise<IProductPaginate> {
    const products = await this.ormRepository.createQueryBuilder().paginate();

    return products as IProductPaginate;
  }

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map((product) => product.id);

    const productsExists = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return productsExists;
  }
}

export default ProductsRepository;
