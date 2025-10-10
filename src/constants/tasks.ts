import { TaskStatus } from '@/types/task.types';

export const TASK_STATUS_CONFIG = {
  [TaskStatus.PENDING]: {
    label: 'Pendiente',
    color: 'bg-gray-100 border-gray-300',
    badgeColor: 'badge-ghost',
  },
  [TaskStatus.IN_PROGRESS]: {
    label: 'En Progreso',
    color: 'bg-blue-50 border-blue-300',
    badgeColor: 'badge-info',
  },
  [TaskStatus.COMPLETED]: {
    label: 'Completada',
    color: 'bg-green-50 border-green-300',
    badgeColor: 'badge-success',
  },
  [TaskStatus.CLOSED]: {
    label: 'Cerrada',
    color: 'bg-red-50 border-red-300',
    badgeColor: 'badge-error',
  },
};
