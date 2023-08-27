import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class TeamController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.userLogin(email, password);
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response) {
    const { email } = req.params;
    const serviceResponse = await this.userService.userRole(email);
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
