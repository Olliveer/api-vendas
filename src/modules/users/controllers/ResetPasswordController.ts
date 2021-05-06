/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

class ResetPasswordController {
  async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      token,
      password,
    });

    return res.status(204).json();
  }
}

export default ResetPasswordController;
