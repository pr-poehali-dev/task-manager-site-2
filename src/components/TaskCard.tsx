
import { Pencil, Trash2, Check, Clock } from "lucide-react";
import { TaskType } from "@/types/task";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: TaskType;
  onStatusChange: (taskId: number, newStatus: string) => void;
  onDelete: (taskId: number) => void;
  onEdit: (taskId: number) => void;
}

export const TaskCard = ({ 
  task, 
  onStatusChange,
  onDelete,
  onEdit 
}: TaskCardProps) => {
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "высокий":
        return "bg-red-100 text-red-800";
      case "средний":
        return "bg-yellow-100 text-yellow-800";
      case "низкий":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "завершена":
        return "bg-green-100 text-green-800";
      case "в процессе":
        return "bg-purple-100 text-purple-800";
      case "новая":
        return "bg-violet-100 text-violet-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4">
        <div className="flex gap-2 flex-wrap mb-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
        </div>
        <h3 className="text-lg font-medium mb-2">{task.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{task.description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>до {task.dueDate}</span>
        </div>
      </div>
      <div className="border-t p-3 flex justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Check className="h-4 w-4 mr-1" /> Изменить статус
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onStatusChange(task.id, "новая")}>
              Новая
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(task.id, "в процессе")}>
              В процессе
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(task.id, "завершена")}>
              Завершена
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(task.id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
