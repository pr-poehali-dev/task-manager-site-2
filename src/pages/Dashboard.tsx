
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import { TaskType } from "@/types/task";

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    // При монтировании компонента получаем задачи из localStorage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    // Подписываемся на изменения в localStorage
    const handleStorageChange = () => {
      const updatedTasks = localStorage.getItem("tasks");
      if (updatedTasks) {
        setTasks(JSON.parse(updatedTasks));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Создаем собственное событие для обновления данных между вкладками
    window.addEventListener("tasksUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tasksUpdated", handleStorageChange);
    };
  }, []);

  const completedTasks = tasks.filter(task => task.status === "завершена");
  const inProgressTasks = tasks.filter(task => task.status === "в процессе");
  const newTasks = tasks.filter(task => task.status === "новая");
  
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const remainingCount = totalTasks - completedCount;
  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header showAddButton={false} />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Дашборд</h1>
          <p className="text-muted-foreground">
            Обзор ваших задач и текущей активности
          </p>
        </div>

        {/* Статусы задач */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Завершено</h3>
              <span className="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{completedTasks.length}</span>
              <span className="text-sm text-muted-foreground">задач выполнено</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">В процессе</h3>
              <span className="text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{inProgressTasks.length}</span>
              <span className="text-sm text-muted-foreground">задач выполняются</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Новые</h3>
              <span className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{newTasks.length}</span>
              <span className="text-sm text-muted-foreground">задач не начаты</span>
            </div>
          </div>
        </div>

        {/* Прогресс выполнения */}

        {/* Прогресс выполнения */}
        <div className="bg-white p-6 rounded-lg border shadow-sm max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-1">Общий прогресс выполнения</h3>
          <p className="text-sm text-muted-foreground mb-4">Процент выполненных задач</p>
          
          <div className="mb-3">
            <Progress value={completionPercentage} className="h-2 mb-1" />
            <div className="text-right text-sm">{completionPercentage}%</div>
          </div>
          
          <div className="grid grid-cols-3 text-center mt-4">
            <div>
              <div className="text-sm text-muted-foreground">Всего</div>
              <div className="font-bold">{totalTasks}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Завершено</div>
              <div className="font-bold">{completedCount}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Осталось</div>
              <div className="font-bold">{remainingCount}</div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
