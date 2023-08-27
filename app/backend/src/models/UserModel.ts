import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
// import { IUserModel } from '../Interfaces/teams/IUserModel';
import User from '../database/models/UserModel';
// import { IUsers } from '../Interfaces/migrations/IUsers';
// import { NewEntity } from '../Interfaces';

export default class UserModel {
  private model = User;
  async login(email: string, pass: string): Promise<string | object> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return 'User not found';
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      return 'Invalid password';
    }
    const tokenString = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'batatinha',
      { expiresIn: '3d' },
    );

    return { token: tokenString };
  }

  async getRole(email: string): Promise<string | object> {
    const user = await this.model.findOne({ where: { email } });
    return { role: user?.role };
  }
}
