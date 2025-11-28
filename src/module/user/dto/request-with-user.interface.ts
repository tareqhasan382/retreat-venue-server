import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}
export interface GetMe extends Request {
  user: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    role: true,
    status: true,
    verified: true,
  };
}