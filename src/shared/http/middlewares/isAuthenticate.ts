/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import AppError from '../../errors/AppError';

export default function isAuthenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, process.env.JWT_SECRET as string);

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}
