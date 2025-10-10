export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  roleId: string;
}

export enum UserRole {
  ADMIN = '1',
  USER = '2',
}
