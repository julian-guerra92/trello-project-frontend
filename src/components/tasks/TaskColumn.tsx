import { Task, TaskStatus } from '@/types/task.types';
import { TASK_STATUS_CONFIG } from '@/constants/tasks';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onDragStart: (task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
  onEdit,
  onDelete,
}) => {
  const config = TASK_STATUS_CONFIG[status];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{config.label}</h2>
          <span className={`badge ${config.badgeColor}`}>{tasks.length}</span>
        </div>
        <div className="h-1 w-full rounded-full bg-base-300"></div>
      </div>

      <div
        className="flex-1 space-y-3 overflow-y-auto pr-2 pb-4 min-h-[200px]"
        onDragOver={onDragOver}
        onDrop={() => onDrop(status)}
      >
        {tasks.length === 0 ? (
          <div className="text-center text-base-content/50 text-sm mt-8">
            No hay tareas
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
