

import { comparePasswords } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { Repository } from 'typeorm';
import { AppDataSource } from '../connection/database'
import { User } from '../models/user';

export class AuthService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user);
    return { accessToken: token, user };
  }
}
