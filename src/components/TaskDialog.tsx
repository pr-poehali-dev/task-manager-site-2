
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { X, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { TaskType, TaskPriority, TaskStatus } from "@/types/task";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Omit<TaskType, "id">) => void;
  editingTask?: TaskType | null;
  title: string;
  description: string;
  buttonText: string;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  editingTask,
  title,
  description,
  buttonText
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<TaskPriority>("средний");
  const [status, setStatus] = useState<TaskStatus>("новая");

  // Установка значений полей при редактировании существующей задачи
  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.title);
      setTaskDescription(editingTask.description);
      
      // Преобразование строки даты в объект Date
      if (editingTask.dueDate) {
        const [day, month, year] = editingTask.dueDate.split('.');
        setDate(new Date(`${year}-${month}-${day}`));
      }
      
      setPriority(editingTask.priority as TaskPriority);
      setStatus(editingTask.status as TaskStatus);
    } else {
      // Значения по умолчанию для новой задачи
      setTaskName("");
      setTaskDescription("");
      setDate(undefined);
      setPriority("средний");
      setStatus("новая");
    }
  }, [editingTask, open]);

  const handleSave = () => {
    if (!taskName.trim()) return;
    
    const formattedDate = date ? format(date, 'dd.MM.yyyy') : '';
    
    onSave({
      title: taskName,
      description: taskDescription,
      dueDate: formattedDate,
      priority,
      status
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Название
            </label>
            <Input 
              id="name" 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Введите название задачи"
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Описание
            </label>
            <Textarea 
              id="description" 
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Описание задачи"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="dueDate" className="text-sm font-medium">
                Срок выполнения
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'dd.MM.yyyy') : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Приоритет
              </label>
              <Select
                value={priority}
                onValueChange={(val) => setPriority(val as TaskPriority)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="низкий">Низкий</SelectItem>
                  <SelectItem value="средний">Средний</SelectItem>
                  <SelectItem value="высокий">Высокий</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {editingTask && (
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Статус
              </label>
              <Select
                value={status}
                onValueChange={(val) => setStatus(val as TaskStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="новая">Новая</SelectItem>
                  <SelectItem value="в процессе">В процессе</SelectItem>
                  <SelectItem value="завершена">Завершена</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
