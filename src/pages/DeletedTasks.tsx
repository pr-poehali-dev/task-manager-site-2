
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TaskType } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const DeletedTasks = () => {
  const [deletedTasks, setDeletedTasks] = useState<TaskType[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Загружаем удаленные задачи из localStorage
    const tasksJson = localStorage.getItem("tasks");
    const historyJson = localStorage.getItem("taskHistory");
    
    if (tasksJson) {
      const allTasks: TaskType[] = JSON.parse(tasksJson);
      setDeletedTasks(allTasks.filter(task => task.deleted));
    }
  }, []);

  const handlePermanentDelete = (taskId: number) => {
    // Получаем текущие задачи
    const tasksJson = localStorage.getItem("tasks");
    if (!tasksJson) return;
    
    const allTasks: TaskType[] = JSON.parse(tasksJson);
    const updatedTasks = allTasks.filter(task => task.id !== taskId);
    
    // Обновляем localStorage и состояние
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setDeletedTasks(deletedTasks.filter(task => task.id !== taskId));
    
    // Добавляем запись в историю об окончательном удалении
    addHistoryEntry(taskId, "Окончательно удалена");
    
    toast({
      title: "Задача удалена",
      description: "Задача была окончательно удалена",
    });
  };

  const handleRestore = (taskId: number) => {
    // Получаем текущие задачи
    const tasksJson = localStorage.getItem("tasks");
    if (!tasksJson) return;
    
    const allTasks: TaskType[] = JSON.parse(tasksJson);
    const updatedTasks = allTasks.map(task => 
      task.id === taskId ? { ...task, deleted: false, deletedAt: undefined } : task
    );
    
    // Обновляем localStorage и состояние
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setDeletedTasks(deletedTasks.filter(task => task.id !== taskId));
    
    // Добавляем запись в историю о восстановлении
    addHistoryEntry(taskId, "Восстановлена");
    
    toast({
      title: "Задача восстановлена",
      description: "Задача была успешно восстановлена",
    });
  };

  const addHistoryEntry = (taskId: number, action: string) => {
    const tasksJson = localStorage.getItem("tasks");
    if (!tasksJson) return;
    
    const allTasks: TaskType[] = JSON.parse(tasksJson);
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return;
    
    const historyJson = localStorage.getItem("taskHistory");
    const history: any[] = historyJson ? JSON.parse(historyJson) : [];
    
    const newEntry = {
      id: Date.now(),
      taskId,
      taskTitle: task.title,
      action: action === "Восстановлена" ? "восстановлена" : "удалена",
      timestamp: new Date().toLocaleString("ru-RU"),
      details: action
    };
    
    const updatedHistory = [newEntry, ...history].slice(0, 50); // Храним только последние 50 записей
    localStorage.setItem("taskHistory", JSON.stringify(updatedHistory));
    
    // Уведомляем другие компоненты об изменениях
    window.dispatchEvent(new Event("historyUpdated"));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showAddButton={false} />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Удаленные задачи</h1>
          <p className="text-muted-foreground">
            Здесь находятся удаленные задачи. Вы можете восстановить их или удалить окончательно.
          </p>
        </div>

        {deletedTasks.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">Корзина пуста</h3>
            <p className="text-muted-foreground mb-4">
              Удаленные задачи будут отображаться здесь
            </p>
            <Button variant="outline" onClick={() => navigate('/')}>
              Вернуться к задачам
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deletedTasks.map((task) => (
              <div key={task.id} className="border rounded-lg overflow-hidden bg-white/80">
                <div className="p-4">
                  <div className="flex gap-2 flex-wrap mb-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                      Удалена {task.deletedAt || ""}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{task.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{task.description}</p>
                </div>
                <div className="border-t p-3 flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleRestore(task.id)}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Восстановить
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePermanentDelete(task.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Удалить навсегда
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DeletedTasks;
