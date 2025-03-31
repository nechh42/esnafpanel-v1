
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Bell, Shield, UserCog, Building, Phone } from 'lucide-react';

interface BusinessSetup {
  businessName: string;
  businessType: string;
  whatsappNumber: string;
  subscriptionPlan: string;
}

const Settings = () => {
  const { toast } = useToast();
  const [businessSetup, setBusinessSetup] = useState<BusinessSetup | null>(null);
  const [notifications, setNotifications] = useState({
    newMessages: true,
    newOrders: true,
    statusUpdates: false,
    marketing: false
  });

  useEffect(() => {
    const savedSetup = localStorage.getItem('businessSetup');
    if (savedSetup) {
      setBusinessSetup(JSON.parse(savedSetup));
    }
  }, []);

  const isPremium = businessSetup?.subscriptionPlan === 'premium';

  const handleSaveProfile = () => {
    // Burada normalde API'ye kaydetme işlemi yapılır
    localStorage.setItem('businessSetup', JSON.stringify(businessSetup));
    toast({
      title: "Profil güncellendi",
      description: "İşletme bilgileriniz başarıyla güncellendi",
    });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));

    toast({
      title: "Bildirim ayarları güncellendi",
      description: "Bildirim tercihleriniz kaydedildi",
    });
  };

  const handleUpgradeToPremium = () => {
    if (businessSetup) {
      const updatedSetup = { ...businessSetup, subscriptionPlan: 'premium' };
      localStorage.setItem('businessSetup', JSON.stringify(updatedSetup));
      setBusinessSetup(updatedSetup);
      
      toast({
        title: "Premium'a yükseltildi",
        description: "Artık tüm özelliklere erişebilirsiniz!",
      });
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Ayarlar</h1>
        <p className="text-gray-600">EsnafPanel ayarlarınızı yönetin</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            İşletme Profili
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Abonelik
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Bildirimler
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Güvenlik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>İşletme Profili</CardTitle>
              <CardDescription>
                İşletmenizin temel bilgilerini güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">İşletme Adı</Label>
                <Input 
                  id="businessName" 
                  value={businessSetup?.businessName || ''} 
                  onChange={(e) => setBusinessSetup(prev => prev ? {...prev, businessName: e.target.value} : null)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Telefon Numarası</Label>
                <Input 
                  id="whatsappNumber" 
                  value={businessSetup?.whatsappNumber || ''} 
                  onChange={(e) => setBusinessSetup(prev => prev ? {...prev, whatsappNumber: e.target.value} : null)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>İşletme Türü</Label>
                <p className="text-gray-500 text-sm p-2 bg-gray-50 rounded border">
                  {businessSetup?.businessType === 'retail' && 'Perakende Mağaza'}
                  {businessSetup?.businessType === 'beauty' && 'Güzellik / Kuaför'}
                  {businessSetup?.businessType === 'cafe' && 'Kafe / Restoran'}
                  {businessSetup?.businessType === 'clothing' && 'Giyim Mağazası'}
                  {businessSetup?.businessType === 'gift' && 'Hediyelik Eşya'}
                  {businessSetup?.businessType === 'food' && 'Gıda Satışı'}
                  {businessSetup?.businessType === 'education' && 'Eğitim / Kurs'}
                  {businessSetup?.businessType === 'other' && 'Diğer'}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>Değişiklikleri Kaydet</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Abonelik Planı</CardTitle>
              <CardDescription>
                Mevcut aboneliğinizi görüntüleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">
                      {isPremium ? 'Gerçek Mod (Premium)' : 'Demo Mod'}
                    </h3>
                    <p className="text-gray-500">
                      {isPremium 
                        ? 'Tüm özelliklere tam erişim' 
                        : 'Sınırlı özellikler, 7 gün ücretsiz deneme'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {isPremium ? 'Aylık 10$' : 'Ücretsiz'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isPremium && 'Bir sonraki ödeme: 15 Temmuz 2025'}
                    </p>
                  </div>
                </div>
              </div>

              {!isPremium && (
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-medium mb-2">Premium'a Yükseltin</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Daha fazla müşteri yönetin, sınırsız mesaj gönderin ve tüm özelliklere erişin.
                  </p>
                  <Button onClick={handleUpgradeToPremium} className="bg-whatsapp hover:bg-whatsapp-dark">
                    Premium'a Yükselt (Aylık 10$)
                  </Button>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Özellik Karşılaştırması</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="font-medium">Özellik</div>
                  <div className="font-medium text-center">Demo</div>
                  <div className="font-medium text-center">Premium</div>

                  <div>Maksimum müşteri sayısı</div>
                  <div className="text-center">10</div>
                  <div className="text-center">Sınırsız</div>

                  <div>Günlük mesaj limiti</div>
                  <div className="text-center">50</div>
                  <div className="text-center">Sınırsız</div>

                  <div>Toplu mesaj gönderimi</div>
                  <div className="text-center">❌</div>
                  <div className="text-center">✅</div>

                  <div>Gelişmiş raporlama</div>
                  <div className="text-center">❌</div>
                  <div className="text-center">✅</div>

                  <div>Çoklu kullanıcı</div>
                  <div className="text-center">❌</div>
                  <div className="text-center">✅</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Hangi bildirimler alacağınızı ayarlayın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newMessages">Yeni Mesajlar</Label>
                  <p className="text-sm text-gray-500">Yeni bir WhatsApp mesajı geldiğinde bildirim alın</p>
                </div>
                <Switch 
                  id="newMessages" 
                  checked={notifications.newMessages}
                  onCheckedChange={() => handleNotificationChange('newMessages')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newOrders">Yeni Siparişler</Label>
                  <p className="text-sm text-gray-500">Yeni bir sipariş oluşturulduğunda bildirim alın</p>
                </div>
                <Switch 
                  id="newOrders" 
                  checked={notifications.newOrders}
                  onCheckedChange={() => handleNotificationChange('newOrders')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="statusUpdates">Durum Güncellemeleri</Label>
                  <p className="text-sm text-gray-500">Sipariş durumu değiştiğinde bildirim alın</p>
                </div>
                <Switch 
                  id="statusUpdates" 
                  checked={notifications.statusUpdates}
                  onCheckedChange={() => handleNotificationChange('statusUpdates')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing">Pazarlama Bildirimleri</Label>
                  <p className="text-sm text-gray-500">Öneriler ve yeni özellikler hakkında bildirim alın</p>
                </div>
                <Switch 
                  id="marketing" 
                  checked={notifications.marketing}
                  onCheckedChange={() => handleNotificationChange('marketing')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
              <CardDescription>
                Hesap güvenliğinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">Yeni Şifre</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <Button 
                onClick={() => toast({ 
                  title: "Şifre güncellendi", 
                  description: "Şifreniz başarıyla değiştirildi" 
                })}
                className="mt-2"
              >
                Şifreyi Güncelle
              </Button>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label className="font-medium">İki Faktörlü Doğrulama</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Hesabınızı daha güvenli hale getirmek için iki faktörlü doğrulamayı etkinleştirin
                </p>
                <Button variant="outline" onClick={() => toast({ 
                  title: "Yakında", 
                  description: "Bu özellik yakında kullanıma sunulacaktır."
                })}>
                  İki Faktörlü Doğrulamayı Etkinleştir
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
