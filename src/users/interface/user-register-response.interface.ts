import { ResponseInterface } from './response.interface';
import { User } from '../entity/user.entity';

export interface UserRegisterResponseInterface extends ResponseInterface {
  user: User;
}
