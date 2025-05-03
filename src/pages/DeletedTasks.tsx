
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
    loadDeletedTasks();
    
    // Слушаем события обновления задач
    const handleTasksUpdated = () => {
      loadDeletedTasks();
    };
    
    window.addEventListener("tasksUpdated", handleTasksUpdated);
    
    return () => {
      window.removeEventListener("tasksUpdated", handleTasksUpdated);
    };
  }, []);

  const loadDeletedTasks = () => {
    // Загружаем удаленные задачи из localStorage
    const tasksJson = localStorage.getItem("tasks");
    
    if (tasksJson) {
      const allTasks: TaskType[] = JSON.parse(tasksJson);
      setDeletedTasks(allTasks.filter(task => task.deleted));
    }
  };

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
    
    // Оповещаем другие компоненты
    window.dispatchEvent(new Event("tasksUpdated"));
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
    
    // Оповещаем другие компоненты
    window.dispatchEvent(new Event("tasksUpdated"));
  };

  const handleClearTrash = () => {
    // Получаем текущие задачи
    const tasksJson = localStorage.getItem("tasks");
    if (!tasksJson) return;
    
    const allTasks: TaskType[] = JSON.parse(tasksJson);
    const updatedTasks = allTasks.filter(task => !task.deleted);
    
    // Обновляем localStorage и состояние
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setDeletedTasks([]);
    
    toast({
      title: "Корзина очищена",
      description: "Все задачи из корзины были удалены",
    });
    
    // Оповещаем другие компоненты
    window.dispatchEvent(new Event("tasksUpdated"));
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Удаленные задачи</h1>
            <p className="text-muted-foreground">
              Задачи, которые были удалены и могут быть восстановлены
            </p>
          </div>
          {deletedTasks.length > 0 && (
            <Button 
              onClick={handleClearTrash}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Очистить корзину
            </Button>
          )}
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
          <div className="space-y-6">
            {deletedTasks.map((task) => (
              <div key={task.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{task.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.status === "завершена" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {task.status || "новая"}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === "высокий" 
                        ? "bg-red-100 text-red-800" 
                        : task.priority === "средний" 
                          ? "bg-orange-100 text-orange-800" 
                          : "bg-blue-100 text-blue-800"
                    }`}>
                      {task.priority || "низкий"}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{task.description}</p>
                  {task.dueDate && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Срок: {new Date(task.dueDate).toLocaleDateString("ru-RU")}
                    </p>
                  )}
                </div>
                <div className="border-t p-4 flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleRestore(task.id)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Восстановить
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handlePermanentDelete(task.id)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить
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
