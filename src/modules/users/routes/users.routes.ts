import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import isAuthenticate from '../../../shared/http/middlewares/isAuthenticate';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', isAuthenticate, usersController.index);

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}), usersController.create);

export default usersRouter;
