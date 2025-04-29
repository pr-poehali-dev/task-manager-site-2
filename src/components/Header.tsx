
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut } from "lucide-react";

interface HeaderProps {
  showAddButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showAddButton = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleOpenAddTaskDialog = () => {
    navigate('/add-task');
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
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
            <span className="font-medium">ТаскМенеджер</span>
          </Link>
          
          <nav className="flex space-x-4">
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                isActive('/dashboard') ? 'text-blue-500' : 'text-muted-foreground'
              }`}
            >
              Дашборд
            </Link>
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                isActive('/') ? 'text-blue-500' : 'text-muted-foreground'
              }`}
            >
              Задачи
            </Link>
            <Link 
              to="/settings"
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                isActive('/settings') ? 'text-blue-500' : 'text-muted-foreground'
              }`}
            >
              Настройки
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          {showAddButton && (
            <Button variant="default" onClick={handleOpenAddTaskDialog} className="gap-1" size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Добавить задачу
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
