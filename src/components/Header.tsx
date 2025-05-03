
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  LayoutGrid, 
  ListTodo, 
  Trash2, 
  Calendar, 
  Settings 
} from "lucide-react";

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
          <nav className="flex space-x-6">
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-blue-500 flex items-center gap-1.5 ${
                isActive('/dashboard') ? 'text-blue-500' : 'text-muted-foreground'
              }`}
            >
              <LayoutGrid className="h-5 w-5" />
              <span>Дашборд</span>
            </Link>
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-500 flex items-center gap-1.5 ${
                isActive('/') ? 'text-blue-500' : 'text-muted-foreground'
              }`}
            >
              <ListTodo className="h-5 w-5" />
              <span>Задачи</span>
            </Link>
            <Link 
              to="/deleted-tasks" 
              className={`text-sm font-medium transition-colors hover:text-blue-500 flex items-center gap-1.5 ${
                isActive('/deleted-tasks') ? 'text-blue-500' : 'text-muted-foreground'
              }`}
            >
              <Trash2 className="h-5 w-5" />
              <span>Корзина</span>
            </Link>
            <Link 
              to="/task-history" 
              className={`text-sm font-medium transition-colors hover:text-blue-500 flex items-center gap-1.5 ${
                isActive('/task-history') ? 'text-blue-500' : 'text-muted-foreground'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Календарь</span>
            </Link>
            <Link 
              to="/settings"
              className={`text-sm font-medium transition-colors hover:text-blue-500 flex items-center gap-1.5 ${
                isActive('/settings') ? 'text-blue-500' : 'text-muted-foreground'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Настройки</span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full" title="Выйти">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
