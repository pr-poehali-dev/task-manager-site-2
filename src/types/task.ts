
export type TaskStatus = "новая" | "в процессе" | "завершена";
export type TaskPriority = "низкий" | "средний" | "высокий";

export interface TaskType {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority | string;
  status: TaskStatus | string;
}
