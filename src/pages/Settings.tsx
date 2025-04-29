
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("user@example.com");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState(username);
  
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const handleUpdateEmail = () => {
    // В реальном приложении здесь был бы API-запрос
    if (newEmail && newEmail.includes('@')) {
      setUsername(newEmail);
      setEmailChangeSuccess(true);
      
      toast({
        title: "Email успешно обновлен",
        description: "Ваш email был успешно изменен",
      });
      
      setTimeout(() => {
        setEmailChangeSuccess(false);
      }, 3000);
    }
  };

  const handleUpdatePassword = () => {
    // В реальном приложении здесь был бы API-запрос
    if (currentPassword && newPassword && newPassword === confirmPassword) {
      setPasswordChangeSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Пароль успешно обновлен",
        description: "Ваш пароль был успешно изменен",
      });
      
      setTimeout(() => {
        setPasswordChangeSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showAddButton={false} />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Настройки профиля</h1>
          <p className="text-muted-foreground">
            Управляйте настройками вашего аккаунта
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Изменение Email */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-blue-500" />
              <h3 className="text-xl font-bold">Изменить Email</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Обновите адрес электронной почты для вашего аккаунта
            </p>
            
            {emailChangeSuccess && (
              <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
                <AlertDescription>
                  Email успешно обновлен на {newEmail}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="newEmail" className="text-sm font-medium">Email</label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Введите новый email"
                />
              </div>
              
              <Button 
                className="w-full sm:w-auto" 
                onClick={handleUpdateEmail}
              >
                Сохранить изменения
              </Button>
            </div>
          </div>
          
          {/* Изменение пароля */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-blue-500" />
              <h3 className="text-xl font-bold">Сменить пароль</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Обновите пароль вашего аккаунта
            </p>
            
            {passwordChangeSuccess && (
              <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
                <AlertDescription>
                  Пароль успешно обновлен
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-sm font-medium">Текущий пароль</label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Введите текущий пароль"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium">Новый пароль</label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Введите новый пароль"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">Подтвердите новый пароль</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Повторите новый пароль"
                />
              </div>
              
              <Button 
                className="w-full sm:w-auto"
                onClick={handleUpdatePassword}
              >
                Обновить пароль
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
