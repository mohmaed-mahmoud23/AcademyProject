// src/types/auth.ts

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  roles: string[];
}

export interface LoginResponse {
  data: LoginData;
  message: string;
  isSuccess: boolean;
  statusCode: number;
  errors: string[];
  timestamp: string;
}
