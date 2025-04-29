
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("user@example.com");
  const [displayName, setDisplayName] = useState("Пользователь");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleLogout = () => {
    // Удаляем данные о входе в систему
    localStorage.removeItem("isLoggedIn");
    // Перенаправляем на страницу входа
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddTask={() => navigate('/add-task')} />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Настройки</h1>
          <p className="text-muted-foreground">
            Управляйте своим профилем и настройками приложения
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <div className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayName">Имя пользователя</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Текущий пароль</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Введите текущий пароль"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Введите новый пароль"
                />
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={handleLogout}>
                  Выйти из системы
                </Button>
                <Button>Сохранить изменения</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления о задачах по электронной почте
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Push-уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления в браузере
                  </p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              
              <div className="pt-4">
                <Button>Сохранить настройки</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Темная тема</Label>
                  <p className="text-sm text-muted-foreground">
                    Включить темную тему интерфейса
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="pt-4">
                <Button>Применить</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
