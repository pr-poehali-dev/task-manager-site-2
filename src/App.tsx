
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Проверка авторизации при загрузке приложения
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Публичные маршруты */}
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/" /> : <Login />} 
            />
            
            {/* Защищенные маршруты */}
            <Route 
              path="/" 
              element={isLoggedIn ? <Index /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/add-task" 
              element={isLoggedIn ? <Index /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/edit-task/:id" 
              element={isLoggedIn ? <Index /> : <Navigate to="/login" />} 
            />
            
            {/* Обработка несуществующих маршрутов */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
