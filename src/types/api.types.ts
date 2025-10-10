export interface User {
  userId: number;
  email: string;
  roleId: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
