import { Task } from '@/types/task.types';

interface TaskCardProps {
  task: Task;
  onDragStart: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
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
      className="card bg-base-300 shadow-md hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={() => onDragStart(task)}
    >
      <div className="card-body p-4">
        <h3 className="card-title text-base">{task.title}</h3>
        <p className="text-sm text-base-content/70 line-clamp-3">
          {task.description}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-6 h-6 text-center leading-6">
              <span className="text-xs">{task.user.name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <span className="text-xs text-base-content/60">{task.user.name}</span>
        </div>
        <div className="text-xs text-base-content/50 mt-2">
          {formatDate(task.createdAt)}
        </div>
      </div>
    </div>
  );
};
