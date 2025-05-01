
export type TaskStatus = "новая" | "в процессе" | "завершена";
export type TaskPriority = "низкий" | "средний" | "высокий";

export interface TaskType {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority | string;
  status: TaskStatus | string;
  deleted?: boolean;
  deletedAt?: string;
}

export interface TaskHistoryEntry {
  id: number;
  taskId: number;
  taskTitle: string;
  action: "создана" | "изменена" | "удалена" | "восстановлена" | "статус изменен";
  timestamp: string;
  details?: string;
}
