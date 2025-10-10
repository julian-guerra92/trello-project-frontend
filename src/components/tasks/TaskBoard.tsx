'use client';

import { useEffect, useState } from 'react';
import { Task, TaskStatus, TaskFormData } from '@/types/task.types';
import { TaskService } from '@/services/task.service';
import { TaskColumn } from './TaskColumn';
import { CreateTaskButton } from './CreateTaskButton';
import { Modal } from '@/components/ui/Modal';
import { TaskForm } from './TaskForm';

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>('');
  const [updateError, setUpdateError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [updating, setUpdating] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string>('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setLoadError('');
      const data = await TaskService.getTasks();
      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        setLoadError(err.message);
      } else {
        setLoadError('Error al cargar las tareas');
      }
    } finally {
      setLoading(false);
    }
  };

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (newStatus: TaskStatus) => {
    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null);
      return;
    }

    setUpdating(true);
    const oldTasks = [...tasks];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      )
    );

    try {
      await TaskService.updateTask(draggedTask.id, { status: newStatus });
    } catch (err) {
      setTasks(oldTasks);
      if (err instanceof Error) {
        setUpdateError(err.message);
      } else {
        setUpdateError('Error al actualizar la tarea');
      }
      setTimeout(() => setUpdateError(''), 3000);
    } finally {
      setDraggedTask(null);
      setUpdating(false);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
    setModalError('');
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
    setModalError('');
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;

    try {
      setModalError('');
      await TaskService.updateTask(editingTask.id, {
        title: data.title,
        description: data.description,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, title: data.title, description: data.description }
            : task
        )
      );

      setSuccessMessage('Tarea actualizada correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      handleCloseEditModal();
    } catch (err) {
      if (err instanceof Error) {
        setModalError(err.message);
      } else {
        setModalError('Error al actualizar la tarea');
      }
    }
  };

  const handleDelete = async (taskId: number) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar esta tarea?'
    );

    if (!confirmed) return;

    setUpdating(true);
    const oldTasks = [...tasks];

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    try {
      await TaskService.deleteTask(taskId);
      setSuccessMessage('Tarea eliminada correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setTasks(oldTasks);
      if (err instanceof Error) {
        setUpdateError(err.message);
      } else {
        setUpdateError('Error al eliminar la tarea');
      }
      setTimeout(() => setUpdateError(''), 3000);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{loadError}</span>
        <button onClick={loadTasks} className="btn btn-sm">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {updating && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-info">
            <span className="loading loading-spinner loading-sm"></span>
            <span>Procesando...</span>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {updateError && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{updateError}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        <div className="bg-base-100 rounded-lg p-4 shadow-sm">
          <TaskColumn
            status={TaskStatus.PENDING}
            tasks={getTasksByStatus(TaskStatus.PENDING)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div className="bg-base-100 rounded-lg p-4 shadow-sm">
          <TaskColumn
            status={TaskStatus.IN_PROGRESS}
            tasks={getTasksByStatus(TaskStatus.IN_PROGRESS)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div className="bg-base-100 rounded-lg p-4 shadow-sm">
          <TaskColumn
            status={TaskStatus.COMPLETED}
            tasks={getTasksByStatus(TaskStatus.COMPLETED)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div className="bg-base-100 rounded-lg p-4 shadow-sm">
          <TaskColumn
            status={TaskStatus.CLOSED}
            tasks={getTasksByStatus(TaskStatus.CLOSED)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <CreateTaskButton onTaskCreated={loadTasks} />

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Editar Tarea"
      >
        {modalError && (
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{modalError}</span>
          </div>
        )}
        {editingTask && (
          <TaskForm
            initialData={{
              title: editingTask.title,
              description: editingTask.description,
            }}
            onSubmit={handleUpdateTask}
            onCancel={handleCloseEditModal}
            submitLabel="Actualizar Tarea"
          />
        )}
      </Modal>
    </div>
  );
};
