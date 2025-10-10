import { Task, UpdateTaskDto, CreateTaskDto } from '@/types/task.types';
import { API_ENDPOINTS } from '@/constants/api';
import { authStorage } from '@/utils/auth';

export class TaskService {
  static async getTasks(): Promise<Task[]> {
    try {
      const token = authStorage.getToken();

      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(API_ENDPOINTS.TASKS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las tareas');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error de conexión con el servidor');
    }
  }

  static async updateTask(taskId: number, data: UpdateTaskDto): Promise<Task> {
    try {
      const token = authStorage.getToken();

      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_ENDPOINTS.TASKS}/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error de conexión con el servidor');
    }
  }

  static async createTask(data: CreateTaskDto): Promise<Task> {
    try {
      const token = authStorage.getToken();

      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(API_ENDPOINTS.TASKS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error de conexión con el servidor');
    }
  }

  static async deleteTask(taskId: number): Promise<void> {
    try {
      const token = authStorage.getToken();

      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_ENDPOINTS.TASKS}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error de conexión con el servidor');
    }
  }
}
