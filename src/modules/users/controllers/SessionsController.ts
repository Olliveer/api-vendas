/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

class SessionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionsService();

    const user = await createSessionService.execute({ email, password });

    return res.json(user);
  }
}

export default SessionsController;
