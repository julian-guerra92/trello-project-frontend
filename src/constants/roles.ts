import { UserRole } from '@/types/auth.types';

export const ROLE_OPTIONS = [
  { value: UserRole.ADMIN, label: 'Administrador' },
  { value: UserRole.USER, label: 'Usuario' },
];
