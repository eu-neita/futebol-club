// import { IUsers } from '../migrations/IUsers';

export interface IUserModel {
  login(email: string, pass: string): Promise<string | object>,
}
