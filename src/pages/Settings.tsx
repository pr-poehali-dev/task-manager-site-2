
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header onAddTask={() => {}} />
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2">Настройки</h1>
        <p className="text-muted-foreground mb-6">
          Управляйте настройками приложения и персональными предпочтениями
        </p>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Темный режим</Label>
                  <p className="text-sm text-muted-foreground">
                    Включить темную тему оформления
                  </p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Уведомления</Label>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления о задачах
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Настройки отображения задач</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="completed-tasks">Показывать завершенные задачи</Label>
                  <p className="text-sm text-muted-foreground">
                    Отображать завершенные задачи в общем списке
                  </p>
                </div>
                <Switch id="completed-tasks" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="group-by-priority">Группировать по приоритету</Label>
                  <p className="text-sm text-muted-foreground">
                    Группировать задачи по уровню приоритета
                  </p>
                </div>
                <Switch id="group-by-priority" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Отменить</Button>
            <Button>Сохранить настройки</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
