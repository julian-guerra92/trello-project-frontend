export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
}

export interface TaskUser {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: TaskUser;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  userId: number;
}

export interface TaskFormData {
  title: string;
  description: string;
}
