import { Router } from 'express';
import customersRouter from '../../../../modules/customers/infra/http/routes/customers.routes';
import orderRouter from '../../../../modules/orders/infra/http/routes/order.routes';
import productsRouter from '../../../../modules/products/infra/http/routes/products.routes';
import passwordRouter from '../../../../modules/users/infra/http/routes/password.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', orderRouter);

export default routes;
