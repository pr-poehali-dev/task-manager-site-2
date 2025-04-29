
import { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { Header } from "@/components/Header";
import { TaskType } from "@/types/task";

const Index = () => {
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
    {
      id: 3,
      title: "Написать документацию API",
      description: "Подготовить техническую документацию по всем эндпоинтам API",
      dueDate: "15.05.2025",
      priority: "низкий",
      status: "завершена",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Все статусы");
  const [priorityFilter, setPriorityFilter] = useState("Все приоритеты");

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAddTask = (newTask: TaskType) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId: number) => {
    // В реальном приложении тут будет открываться диалог редактирования
    console.log("Редактирование задачи", taskId);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "Все статусы" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "Все приоритеты" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header onAddTask={handleAddTask} />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Мои задачи</h1>
          <p className="text-muted-foreground">
            Управляйте своими задачами, отслеживайте прогресс и достигайте целей
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Поиск задач..."
                className="w-full rounded-md border border-input px-4 py-2 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              className="rounded-md border border-input px-4 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Все статусы</option>
              <option>новая</option>
              <option>в процессе</option>
              <option>завершена</option>
            </select>
            <select
              className="rounded-md border border-input px-4 py-2"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option>Все приоритеты</option>
              <option>низкий</option>
              <option>средний</option>
              <option>высокий</option>
            </select>
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </main>
    </div>
  );
};

export default Index;
