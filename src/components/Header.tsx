
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
          <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full" title="Выйти">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

          <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full" title="Выйти">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
