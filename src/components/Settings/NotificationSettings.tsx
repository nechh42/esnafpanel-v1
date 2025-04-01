
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    newCustomer: true,
    newOrder: true,
    lowStock: true,
    paymentReminders: true,
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast({
      title: "Bildirim ayarları güncellendi",
      description: "Bildirim tercihleriniz başarıyla kaydedildi.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bildirim Ayarları</CardTitle>
          <CardDescription>
            Hangi konularda bildirim almak istediğinizi seçin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Bildirim Kanalları</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">E-posta Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Önemli güncellemeler ve bildirimler için e-posta alın
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Acil durumlar için SMS bildirimleri alın
                  </p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={() => handleToggle('smsNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Uygulama Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Mobil uygulamada anlık bildirimler alın
                  </p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle('pushNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Pazarlama E-postaları</Label>
                  <p className="text-sm text-muted-foreground">
                    Yeni özellikler, teklifler ve promosyonlar hakkında bilgi alın
                  </p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={settings.marketingEmails}
                  onCheckedChange={() => handleToggle('marketingEmails')}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Bildirim Türleri</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="newCustomer">Yeni Müşteri</Label>
                <Switch
                  id="newCustomer"
                  checked={settings.newCustomer}
                  onCheckedChange={() => handleToggle('newCustomer')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="newOrder">Yeni Sipariş</Label>
                <Switch
                  id="newOrder"
                  checked={settings.newOrder}
                  onCheckedChange={() => handleToggle('newOrder')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="lowStock">Düşük Stok Uyarıları</Label>
                <Switch
                  id="lowStock"
                  checked={settings.lowStock}
                  onCheckedChange={() => handleToggle('lowStock')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="paymentReminders">Ödeme Hatırlatmaları</Label>
                <Switch
                  id="paymentReminders"
                  checked={settings.paymentReminders}
                  onCheckedChange={() => handleToggle('paymentReminders')}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>Kaydet</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationSettings;
