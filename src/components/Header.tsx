
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TaskType } from "@/types/task";
import { Check } from "lucide-react";

interface HeaderProps {
  onAddTask: (task: TaskType) => void;
}

export const Header = ({ onAddTask }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<TaskType, "id">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "средний",
    status: "новая",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTask as TaskType);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "средний",
      status: "новая",
    });
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Check className="h-6 w-6 text-blue-500" />
          <a href="/" className="text-xl font-bold">
            ТаскМенеджер
          </a>
          <nav className="ml-6 flex items-center gap-6">
            <a href="/" className="font-medium">
              Задачи
            </a>
            <a href="/settings" className="text-muted-foreground">
              Настройки
            </a>
          </nav>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Check className="mr-1 h-4 w-4" /> Добавить задачу
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новую задачу</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название</Label>
                <Input
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Срок выполнения</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="text"
                  placeholder="ДД.ММ.ГГГГ"
                  value={newTask.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Приоритет</Label>
                <select
                  id="priority"
                  name="priority"
                  className="w-full rounded-md border border-input px-3 py-2"
                  value={newTask.priority}
                  onChange={handleChange}
                >
                  <option value="низкий">Низкий</option>
                  <option value="средний">Средний</option>
                  <option value="высокий">Высокий</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                Добавить задачу
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
