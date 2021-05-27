import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';

class ProfileController {
  async show(req: Request, res: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const user_id = req.user.id;

    const user = await showProfile.execute({ user_id });

    return res.json(classToClass(user));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const {
      name, email, password, old_password,
    } = req.body;
    const user_id = req.user.id;

    const showProfile = container.resolve(UpdateProfileService);

    const user = await showProfile.execute({
      user_id, name, email, password, old_password,
    });

    return res.json(classToClass(user));
  }
}

export default ProfileController;
