
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import { TaskType } from "@/types/task";

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      title: "Разработать дизайн главной страницы",
      description: "Создать макет и прототип главной страницы для нового проекта",
      dueDate: "05.05.2025",
      priority: "высокий",
      status: "в процессе",
    },
    {
      id: 2,
      title: "Настроить базу данных",
      description: "Установить и настроить MongoDB для нового проекта",
      dueDate: "10.05.2025",
      priority: "средний",
      status: "новая",
    },
  ]);

  const completedTasks = tasks.filter(task => task.status === "завершена");
  const inProgressTasks = tasks.filter(task => task.status === "в процессе");
  const newTasks = tasks.filter(task => task.status === "новая");
  
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const remainingCount = totalTasks - completedCount;
  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Подсчет процентного соотношения задач по статусам
  const completedPercentage = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  const inProgressPercentage = totalTasks > 0 ? Math.round((inProgressTasks.length / totalTasks) * 100) : 0;
  const newPercentage = totalTasks > 0 ? Math.round((newTasks.length / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
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

        {/* Прогресс выполнения и диаграмма */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-bold mb-1">Общий прогресс выполнения</h3>
            <p className="text-sm text-muted-foreground mb-6">Процент выполненных задач от общего количества</p>
            
            <div className="mb-4">
              <Progress value={completionPercentage} className="h-2 mb-2" />
              <div className="text-right text-sm">{completionPercentage}%</div>
            </div>
            
            <div className="grid grid-cols-3 text-center mt-8">
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

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-bold mb-1">Распределение задач</h3>
            <p className="text-sm text-muted-foreground mb-6">Соотношение задач по статусам</p>
            
            <div className="flex justify-center mb-6">
              <div className="relative w-44 h-44">
                {/* Имитация пирогового графика с использованием SVG */}
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  {/* Синий сектор для новых задач */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray={`${newPercentage}, 100`}
                  />
                  {/* Оранжевый сектор для задач в процессе */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeDasharray={`${inProgressPercentage}, 100`}
                    strokeDashoffset={`-${newPercentage}`}
                  />
                  {/* Зеленый сектор для завершенных задач */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeDasharray={`${completedPercentage}, 100`}
                    strokeDashoffset={`-${newPercentage + inProgressPercentage}`}
                  />
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Завершено</span>
                </div>
                <span>{completedPercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span>В процессе</span>
                </div>
                <span>{inProgressPercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Новые</span>
                </div>
                <span>{newPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
