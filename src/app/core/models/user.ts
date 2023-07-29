import { Role } from './role';

export class User {
  user_id: number;
  img?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role_id: Role;
  token?: string;
}
