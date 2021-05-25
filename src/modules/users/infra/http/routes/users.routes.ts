import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '../../../config/upload';
import isAuthenticate from '../../../shared/http/middlewares/isAuthenticate';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.get('/', isAuthenticate, usersController.index);

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}), usersController.create);

usersRouter.patch('/avatar', isAuthenticate, upload.single('avatar'), usersAvatarController.update);

export default usersRouter;
