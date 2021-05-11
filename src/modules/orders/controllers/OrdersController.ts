/* eslint-disable camelcase */
import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

/* eslint-disable class-methods-use-this */
class OrdersController {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return res.status(200).json(order);
  }

  async create(req: Request, res: Response) {
    const { customer_id, products } = req.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return res.status(201).json(order);
  }
}
export default OrdersController;
