import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const loginController = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;
    const { accessToken, user } = await authService.login( email, password );

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    return res.status(401).json({ message: err.message || 'Login failed' });
  }
};
