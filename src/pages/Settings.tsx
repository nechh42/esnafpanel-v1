
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Bell, Shield, UserCog, Building, Phone, Globe } from 'lucide-react';

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
  const [language, setLanguage] = useState('tr');

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

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Dil değiştirildi",
      description: "Uygulama dili güncellendi",
    });
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
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Dil
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
                  {businessSetup?.businessType === 'parfumery' && 'Parfümeri / Kozmetik'}
                  {businessSetup?.businessType === 'barber' && 'Berber'}
                  {businessSetup?.businessType === 'pharmacy' && 'Eczane'}
                  {businessSetup?.businessType === 'bakery' && 'Fırın / Pastane'}
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
                      {isPremium ? 'Premium Paket' : 'Başlangıç Paketi (Demo)'}
                    </h3>
                    <p className="text-gray-500">
                      {isPremium 
                        ? 'Tüm özelliklere tam erişim' 
                        : 'Sınırlı özellikler, 14 gün ücretsiz deneme'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {isPremium ? 'Aylık 900 ₺' : 'Ücretsiz'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isPremium && 'Bir sonraki ödeme: 15 Temmuz 2023'}
                    </p>
                  </div>
                </div>
              </div>

              {!isPremium && (
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-medium mb-2">Premium Pakete Yükseltin</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Daha fazla müşteri yönetin, sınırsız mesaj gönderin ve tüm özelliklere erişin.
                  </p>
                  <Button onClick={handleUpgradeToPremium} className="bg-whatsapp hover:bg-whatsapp-dark">
                    Premium'a Yükselt
                  </Button>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Ücretlendirme Paketleri</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Başlangıç Paketi */}
                  <Card className="border-2 border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Başlangıç Paketi</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-2">
                        <span className="text-3xl font-bold">250 ₺</span>
                        <span className="text-gray-500 ml-1">/ ay</span>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-3">
                        <p>3 Aylık: 675 ₺ (%10 indirim)</p>
                        <p>6 Aylık: 1.200 ₺ (%20 indirim)</p>
                      </div>
                      
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> 1 Kullanıcı Hesabı
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> 300 müşteri kaydı
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Temel WhatsApp sistemleri
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Günlük 20 Hatırlatma Mesajı
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Web Arayüzü (Mobil uyumlu)
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Seç</Button>
                    </CardFooter>
                  </Card>
                  
                  {/* İşletme Paketi */}
                  <Card className="border-2 border-primary">
                    <CardHeader className="pb-2 bg-primary/5">
                      <CardTitle className="text-lg">İşletme Paketi</CardTitle>
                      <CardDescription>En Popüler</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-2">
                        <span className="text-3xl font-bold">500 ₺</span>
                        <span className="text-gray-500 ml-1">/ ay</span>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-3">
                        <p>3 Aylık: 1.350 ₺ (%10 indirim)</p>
                        <p>6 Aylık: 2.400 ₺ (%20 indirim)</p>
                      </div>
                      
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> 3 Kullanıcı hesabı
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> 1.000 müşteri kaydı
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Gelişmiş WhatsApp İndirme
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Sınırsız hatırlatma mesajları
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Mobil uygulama
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Öncelikli destek (24 saat)
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Seç</Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Premium Paket */}
                  <Card className="border-2 border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Premium Paket</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-2">
                        <span className="text-3xl font-bold">900 ₺</span>
                        <span className="text-gray-500 ml-1">/ ay</span>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-3">
                        <p>3 Aylık: 2.430 ₺ (%10 indirim)</p>
                        <p>6 Aylık: 4.320 ₺ (%20 indirim)</p>
                      </div>
                      
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> 5 Kullanıcı hesabı
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Sınırsız müşteri kaydı
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Tam WhatsApp özellikleri
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Gelişmiş analitik ve raporlama
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> Markalı mobil uygulama
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span> VIP desteği (12 saat yanıt)
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Seç</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Lansman Özel Kampanyası</h4>
                  <p className="text-sm text-gray-600">İlk 3 ay için tüm paketlerde %25 indirim! 6 aylık alımlarda ek %10 indirim.</p>
                  <Button variant="link" className="px-0 text-primary">Detayları Gör</Button>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Sektörel Ek Paketler</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p className="font-medium">Berber/Kuaför Paketi +100 ₺/ay</p>
                      <p className="text-gray-600 mt-1">Randevu sistemi, hizmet kaydı ve müşteri geçmişi</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p className="font-medium">Kafe/Restoran Paketi +150 ₺/ay</p>
                      <p className="text-gray-600 mt-1">Masa yönetimi, sipariş geçmişi, menü seçenekleri</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p className="font-medium">Serbest Çalışan Paketi +120 ₺/ay</p>
                      <p className="text-gray-600 mt-1">Proje takibi, fatura ve tahsilat, sözleşme</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p className="font-medium">Kozmetik/Bakım Paketi +130 ₺/ay</p>
                      <p className="text-gray-600 mt-1">Ürün stok takibi, müşteri bakım geçmişi</p>
                    </div>
                  </div>
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

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Dil Ayarları</CardTitle>
              <CardDescription>
                Uygulama dilini değiştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Uygulama Dili</Label>
                <Select
                  value={language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Dil seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-2">Seçtiğiniz dil tüm uygulama arayüzünde kullanılacaktır.</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium mb-2 text-yellow-800">Dil Desteği</h4>
                <p className="text-sm text-yellow-700">Şu anda uygulamamız sadece Türkçe dilinde tam olarak desteklenmektedir. Diğer diller için çalışmalarımız devam etmektedir.</p>
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
