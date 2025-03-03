export interface User {
    id: number;
    email: string;
    token: string;
  }
  
  export interface LoginResponse {
    token: string;
    refreshToken: string;
    refreshTokenExpires: Date;
  }