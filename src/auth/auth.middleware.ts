import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpResponse } from '../shared/response/http.response.js';

// Middleware to check if the user is authenticated using JWT
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Add user info to request if token is valid
  const authReq = req as Request & { user?: { id: string; role: string } };

  // Get the authorization header
  const authHeader = authReq.headers['authorization'];

  // Check if the header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return HttpResponse.Unauthorized(
      res,
      'Token de autorización no proporcionado o con formato incorrecto.'
    );
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET || 'DEFAULT_SECRET';

  try {
    // Verify the token and get user data
    const decodedPayload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };
    // Attach user info to request
    authReq.user = decodedPayload;
    next();
  } catch (error) {
    // If token is invalid or expired, block access
    return HttpResponse.Unauthorized(res, 'Token inválido o expirado.');
  }
};
