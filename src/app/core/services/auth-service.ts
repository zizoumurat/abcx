import { LoginResponse } from '../models/user';
import { LoginRequest } from '../models/login-request';

export interface IAuthService {
  login(request: LoginRequest): Promise<LoginResponse>;
  logout(): void;
  isAuthenticated(): boolean;
  getToken(): string | null;
}


