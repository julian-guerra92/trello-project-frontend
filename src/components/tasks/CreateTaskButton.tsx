'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { TaskForm } from './TaskForm';
import { TaskFormData } from '@/types/task.types';
import { TaskService } from '@/services/task.service';
import { authStorage } from '@/utils/auth';

interface CreateTaskButtonProps {
  onTaskCreated: () => void;
}

export const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({
  onTaskCreated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleSubmit = async (data: TaskFormData) => {
    try {
      setError('');
      const user = authStorage.getUser();

      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      await TaskService.createTask({
        title: data.title,
        description: data.description,
        userId: user.userId,
      });

      handleCloseModal();
      onTaskCreated();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al crear la tarea');
      }
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="btn btn-circle btn-primary btn-lg fixed bottom-6 right-6 shadow-lg hover:shadow-xl z-40"
        aria-label="Crear nueva tarea"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Crear Nueva Tarea"
      >
        {error && (
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
            <span>{error}</span>
          </div>
        )}
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          submitLabel="Crear Tarea"
        />
      </Modal>
    </>
  );
};
