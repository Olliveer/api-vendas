/* eslint-disable class-methods-use-this */
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

class SessionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionsService();

    const user = await createSessionService.execute({ email, password });

    return res.json(classToClass(user));
  }
}

export default SessionsController;
