
import { TaskCard } from "@/components/TaskCard";
import { TaskType } from "@/types/task";

interface TaskListProps {
  tasks: TaskType[];
  onStatusChange: (taskId: number, newStatus: string) => void;
  onDeleteTask: (taskId: number) => void;
  onEditTask: (taskId: number) => void;
}

export const TaskList = ({ 
  tasks, 
  onStatusChange,
  onDeleteTask,
  onEditTask
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">Нет задач</h3>
        <p className="text-muted-foreground">
          Добавьте новую задачу, чтобы начать работу
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onStatusChange={onStatusChange}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
