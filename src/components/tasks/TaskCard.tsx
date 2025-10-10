import { Task } from '@/types/task.types';

interface TaskCardProps {
  task: Task;
  onDragStart: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDragStart,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div
      className="card bg-base-300 shadow-md hover:shadow-lg transition-shadow"
      draggable
      onDragStart={() => onDragStart(task)}
    >
      <div
        className="card-body p-4 cursor-grab active:cursor-grabbing"
        onDragStart={() => onDragStart(task)}
      >
        <h3 className="card-title text-base">{task.title}</h3>
        <p className="text-sm text-base-content/70 line-clamp-3">
          {task.description}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-6 h-6 text-center leading-6">
              <span className="text-xs">
                {task.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <span className="text-xs text-base-content/60">{task.user.name}</span>
        </div>
        <div className="text-xs text-base-content/50 mt-2">
          {formatDate(task.createdAt)}
        </div>

        <div className="card-actions justify-end mt-3 pt-3 border-t border-base-content/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="btn btn-xs btn-ghost text-info"
            title="Editar tarea"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Editar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="btn btn-xs btn-ghost text-error"
            title="Eliminar tarea"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
