
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { TaskType } from "@/types/task";

interface HeaderProps {
  onAddTask: (task: Omit<TaskType, "id">) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const navigate = useNavigate();
  
  const handleOpenAddTaskDialog = () => {
    // В реальном приложении здесь был бы вызов модального окна
    navigate('/add-task');
  };

  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 mr-8">
            <div className="text-blue-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <span className="font-bold text-xl text-blue-500">ТаскМенеджер</span>
          </Link>
          
          <nav className="flex space-x-4">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-blue-500">
              Задачи
            </Link>
            <Link to="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-500">
              Настройки
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenAddTaskDialog} className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Добавить задачу
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
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
              className="h-5 w-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};
