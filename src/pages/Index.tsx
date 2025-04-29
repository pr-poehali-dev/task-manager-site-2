
import { useState, useEffect } from "react";
import { TaskList } from "@/components/TaskList";
import { Header } from "@/components/Header";
import { TaskType } from "@/types/task";
import TaskDialog from "@/components/TaskDialog";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";

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
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showEditTaskDialog, setShowEditTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Сохраняем задачи в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Создаем событие для обновления данных между вкладками
    const event = new Event("tasksUpdated");
    window.dispatchEvent(event);
  }, [tasks]);

  useEffect(() => {
    // Загружаем задачи из localStorage при монтировании компонента
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    
    // Проверка URL для открытия модальных окон
    if (location.pathname === "/add-task") {
      setShowAddTaskDialog(true);
    } else if (location.pathname.startsWith("/edit-task/")) {
      const taskId = parseInt(location.pathname.split("/").pop() || "0");
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setEditingTask(task);
        setShowEditTaskDialog(true);
      }
    }
  }, [location]);

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAddTask = (newTask: Omit<TaskType, "id">) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    navigate('/');
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      navigate(`/edit-task/${taskId}`);
    }
  };

  const handleUpdateTask = (updatedTask: Omit<TaskType, "id">) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id 
            ? { ...updatedTask, id: editingTask.id } 
            : task
        )
      );
      setEditingTask(null);
      navigate('/');
    }
  };

  const handleCloseAddDialog = () => {
    setShowAddTaskDialog(false);
    navigate('/');
  };

  const handleCloseEditDialog = () => {
    setShowEditTaskDialog(false);
    setEditingTask(null);
    navigate('/');
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
      <Header showAddButton={true} />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Мои задачи</h1>
          <p className="text-muted-foreground">
            Управляйте своими задачами, отслеживайте прогресс и достигайте целей
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
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

            <DropdownMenu open={showStatusDropdown} onOpenChange={setShowStatusDropdown}>
              <DropdownMenuTrigger className="rounded-md border border-input px-4 py-2 flex items-center justify-between w-40">
                <span className="truncate">{statusFilter}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 ml-2 flex-shrink-0"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("Все статусы")}>
                  {statusFilter === "Все статусы" && <Check className="h-4 w-4 mr-2" />}
                  Все статусы
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("новая")}>
                  {statusFilter === "новая" && <Check className="h-4 w-4 mr-2" />}
                  Новые
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("в процессе")}>
                  {statusFilter === "в процессе" && <Check className="h-4 w-4 mr-2" />}
                  В процессе
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("завершена")}>
                  {statusFilter === "завершена" && <Check className="h-4 w-4 mr-2" />}
                  Завершенные
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={showPriorityDropdown} onOpenChange={setShowPriorityDropdown}>
              <DropdownMenuTrigger className="rounded-md border border-input px-4 py-2 flex items-center justify-between w-40">
                <span className="truncate">{priorityFilter}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 ml-2 flex-shrink-0"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setPriorityFilter("Все приоритеты")}>
                  {priorityFilter === "Все приоритеты" && <Check className="h-4 w-4 mr-2" />}
                  Все приоритеты
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("низкий")}>
                  {priorityFilter === "низкий" && <Check className="h-4 w-4 mr-2" />}
                  Низкий
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("средний")}>
                  {priorityFilter === "средний" && <Check className="h-4 w-4 mr-2" />}
                  Средний
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("высокий")}>
                  {priorityFilter === "высокий" && <Check className="h-4 w-4 mr-2" />}
                  Высокий
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </main>

      {/* Модальное окно добавления задачи */}
      <TaskDialog
        open={showAddTaskDialog}
        onOpenChange={handleCloseAddDialog}
        onSave={handleAddTask}
        title="Новая задача"
        description="Заполните необходимые поля для создания новой задачи"
        buttonText="Создать"
      />

      {/* Модальное окно редактирования задачи */}
      <TaskDialog
        open={showEditTaskDialog}
        onOpenChange={handleCloseEditDialog}
        onSave={handleUpdateTask}
        editingTask={editingTask}
        title="Редактирование задачи"
        description="Измените детали задачи и нажмите Сохранить"
        buttonText="Сохранить"
      />
    </div>
  );
};

export default Index;
