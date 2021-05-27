import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductService from '../../../services/ListProductService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';

class ProductsController {
  async index(req: Request, res: Response) {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return res.status(200).json(products);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ id });

    return res.status(200).json(product);
  }

  async create(req: Request, res: Response) {
    const { name, price, quantity } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({ name, price, quantity });

    return res.status(200).json(product);
  }

  async update(req: Request, res: Response) {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id, name, price, quantity,
    });

    return res.status(200).json(product);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return res.status(200).json({ message: 'Deleted' });
  }
}

export default ProductsController;
