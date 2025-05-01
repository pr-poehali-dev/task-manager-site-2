
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TaskHistoryEntry } from "@/types/task";
import { 
  AlertCircle, 
  Edit, 
  Trash2, 
  RefreshCw, 
  Check,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TaskHistory = () => {
  const [history, setHistory] = useState<TaskHistoryEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
    
    // Слушаем события обновления истории
    const handleHistoryUpdate = () => {
      loadHistory();
    };
    
    window.addEventListener("historyUpdated", handleHistoryUpdate);
    window.addEventListener("tasksUpdated", handleHistoryUpdate);
    
    return () => {
      window.removeEventListener("historyUpdated", handleHistoryUpdate);
      window.removeEventListener("tasksUpdated", handleHistoryUpdate);
    };
  }, []);

  const loadHistory = () => {
    const historyJson = localStorage.getItem("taskHistory");
    if (historyJson) {
      setHistory(JSON.parse(historyJson));
    }
  };

  const getActionIcon = (action: string) => {
    switch(action) {
      case "создана":
        return <AlertCircle className="h-4 w-4 text-green-500" />;
      case "изменена":
        return <Edit className="h-4 w-4 text-blue-500" />;
      case "удалена":
        return <Trash2 className="h-4 w-4 text-red-500" />;
      case "восстановлена":
        return <RefreshCw className="h-4 w-4 text-purple-500" />;
      case "статус изменен":
        return <Check className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatAction = (entry: TaskHistoryEntry) => {
    switch(entry.action) {
      case "создана":
        return `Создана новая задача "${entry.taskTitle}"`;
      case "изменена":
        return `Изменена задача "${entry.taskTitle}"`;
      case "удалена":
        return `Удалена задача "${entry.taskTitle}"`;
      case "восстановлена":
        return `Восстановлена задача "${entry.taskTitle}"`;
      case "статус изменен":
        return `Изменен статус задачи "${entry.taskTitle}" на "${entry.details}"`;
      default:
        return `Действие с задачей "${entry.taskTitle}"`;
    }
  };

  const clearHistory = () => {
    localStorage.setItem("taskHistory", JSON.stringify([]));
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showAddButton={false} />
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">История изменений</h1>
            <p className="text-muted-foreground">
              Отслеживайте все изменения, произведенные с задачами
            </p>
          </div>
          {history.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearHistory}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Очистить историю
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">История пуста</h3>
            <p className="text-muted-foreground mb-4">
              Здесь будут отображаться все изменения задач
            </p>
            <Button variant="outline" onClick={() => navigate('/')}>
              Вернуться к задачам
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-white border rounded-lg p-4 flex items-start gap-3"
              >
                <div className="mt-1">
                  {getActionIcon(entry.action)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{formatAction(entry)}</p>
                  {entry.details && entry.action !== "статус изменен" && (
                    <p className="text-sm text-muted-foreground mt-1">{entry.details}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{entry.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskHistory;
