import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginResponse, User } from '../../core/models/user';
import { LoginRequest } from '../../core/models/login-request';
import { IAuthService } from '../../core/services/auth-service';
import { BASE_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private apiUrl = `${BASE_URL}/auth`;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ data: LoginResponse }>(`${this.apiUrl}/login`, request).pipe(
          map(res => res.data), 
          catchError(error => {
            console.error('Login failed:', error);
            return throwError(() => new Error('Login request failed. Please try again.'));
          })
        )
      );

      localStorage.setItem(this.tokenKey, JSON.stringify(response));

      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred.');
    }
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    const authData = localStorage.getItem(this.tokenKey);
    if (!authData) return null;

    try {
      const parsedData: LoginResponse = JSON.parse(authData);
      return parsedData.token ?? null;
    } catch {
      return null;
    }
  }
}
