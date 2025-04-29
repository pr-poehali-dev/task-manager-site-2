
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Settings = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("user@example.com");
  const [displayName, setDisplayName] = useState("Пользователь");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  
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
      <Header />
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
            <TabsTrigger value="security">Безопасность</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <div className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <Label htmlFor="displayName">Имя пользователя</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              
              <div className="pt-4">
                <Button onClick={() => toast({ description: "Профиль обновлен" })}>
                  Сохранить изменения
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <div className="space-y-8 max-w-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Изменение Email</h3>
                
                {emailChangeSuccess && (
                  <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
                    <AlertDescription>
                      Email успешно обновлен на {newEmail}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="currentEmail">Текущий Email</Label>
                  <Input
                    id="currentEmail"
                    value={username}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newEmail">Новый Email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleUpdateEmail}>
                  Обновить Email
                </Button>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Изменение пароля</h3>
                
                {passwordChangeSuccess && (
                  <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
                    <AlertDescription>
                      Пароль успешно обновлен
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Текущий пароль</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Введите текущий пароль"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Введите новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Повторите новый пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleUpdatePassword}>
                  Обновить пароль
                </Button>
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
                <Button onClick={() => toast({ description: "Настройки уведомлений сохранены" })}>
                  Сохранить настройки
                </Button>
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
                  onCheckedChange={(checked) => {
                    setDarkMode(checked);
                    toast({ 
                      description: checked ? "Темная тема включена" : "Темная тема отключена" 
                    });
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
