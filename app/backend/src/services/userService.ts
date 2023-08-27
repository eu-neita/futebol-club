import { ServiceResponse } from '../Interfaces/serviceResponse';
import { IUserModel } from '../Interfaces/teams/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async userLogin(email: string, pass: string): Promise<ServiceResponse<string | object>> {
    const token = await this.userModel.login(email, pass);
    if (token === 'User not found' || token === 'Invalid password') {
      return { status: 401, data: { message: token } };
    }
    return { status: 200, data: token };
  }
}
