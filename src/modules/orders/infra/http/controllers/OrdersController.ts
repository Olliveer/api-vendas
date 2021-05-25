import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import ListOrderService from '../../../services/ListOrderService';
import ShowOrderService from '../../../services/ShowOrderService';

class OrdersController {
  async index(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute();

    return res.status(200).json(orders);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return res.status(200).json(order);
  }

  async create(req: Request, res: Response) {
    const { customer_id, products } = req.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return res.status(201).json(order);
  }
}
export default OrdersController;
