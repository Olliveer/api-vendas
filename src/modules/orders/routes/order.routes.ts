import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import isAuthenticate from '../../../shared/http/middlewares/isAuthenticate';
import OrdersController from '../controllers/OrdersController';

const orderRouter = Router();
const ordersController = new OrdersController();

orderRouter.use(isAuthenticate);
orderRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show);

orderRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create);

export default orderRouter;
