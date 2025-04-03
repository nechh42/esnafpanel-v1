import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Image, Link2, RefreshCw, Users, MessageSquare, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

type InstagramSettingsProps = {
  businessData?: any;
}

const InstagramSettings: React.FC<InstagramSettingsProps> = ({ businessData }) => {
  const { toast } = useToast();
  const [instagramStatus, setInstagramStatus] = useState('disconnected'); // connected, disconnected, connecting
  const [instagramUsername, setInstagramUsername] = useState('');
  
  const [settings, setSettings] = useState({
    autoPost: false,
    syncProducts: true,
    syncStories: false,
    sharePromotions: true,
    syncComments: true
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConnect = () => {
    if (!instagramUsername) {
      toast({
        title: "Hata",
        description: "Lütfen bir Instagram kullanıcı adı girin.",
        variant: "destructive",
      });
      return;
    }
    
    // Connect directly without OAuth
    setInstagramStatus('connected');
    toast({
      title: "Instagram Bağlandı",
      description: `@${instagramUsername} Instagram hesabınız başarıyla bağlandı.`,
    });
  };

  const handleDisconnect = () => {
    setInstagramStatus('disconnected');
    toast({
      title: "Instagram Bağlantısı Kesildi",
      description: "Instagram bağlantınız başarıyla kesildi.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Ayarlar kaydedildi",
      description: "Instagram entegrasyon ayarlarınız başarıyla güncellendi.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Instagram Bağlantısı</CardTitle>
          <CardDescription>
            İşletmenize ait Instagram hesabını bağlayın ve müşterilerinizle etkileşime geçin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {instagramStatus === 'disconnected' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagramUsername">Instagram Kullanıcı Adı</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                    <Input
                      id="instagramUsername"
                      placeholder="kullaniciadi"
                      value={instagramUsername}
                      onChange={(e) => setInstagramUsername(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button onClick={handleConnect}>
                    <Instagram className="mr-2 h-4 w-4" />
                    Bağlan
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Instagram işletme hesabınızı bağlayarak müşterilerinizle daha etkili iletişim kurabilirsiniz.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Instagram Nasıl Bağlanır?</h4>
                <ol className="list-decimal list-inside text-sm space-y-2">
                  <li>Instagram işletme hesabı kullanıcı adınızı girin</li>
                  <li>"Bağlan" butonuna tıklayın</li>
                  <li>Bağlantı sağlandıktan sonra Instagram gönderilerinizi yönetebilirsiniz</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#FEEDE4] border border-[#F9DBCC] rounded-md p-4 flex items-start">
                <Instagram className="h-5 w-5 text-[#E1306C] mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Instagram Bağlantısı Aktif</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>@{instagramUsername}</strong> Instagram işletme hesabınız başarıyla bağlandı.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-[#E1306C] text-white">IG</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">@{instagramUsername}</h3>
                  <p className="text-sm text-muted-foreground">İşletme Hesabı</p>
                  <div className="flex space-x-4 mt-1">
                    <div className="text-sm">
                      <span className="font-medium">1,243</span> Takipçi
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">567</span> Gönderi
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Bağlantı Durumu</h4>
                  <p className="text-sm text-muted-foreground">Instagram API bağlantınız aktif</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => toast({ title: "Yenileniyor...", description: "Instagram bağlantınız yenileniyor." })}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Yenile
                  </Button>
                  <Button size="sm" variant="destructive" onClick={handleDisconnect}>
                    Bağlantıyı Kes
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-muted p-4 rounded-md flex flex-col">
                  <div className="flex items-center mb-2">
                    <Image className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-medium">Gönderiler</h4>
                  </div>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-sm text-muted-foreground">Son 30 gün</p>
                </div>
                
                <div className="bg-muted p-4 rounded-md flex flex-col">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-medium">Takipçi Artışı</h4>
                  </div>
                  <div className="text-2xl font-bold">+76</div>
                  <p className="text-sm text-muted-foreground">Son 30 gün</p>
                </div>
                
                <div className="bg-muted p-4 rounded-md flex flex-col">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-medium">Yorumlar</h4>
                  </div>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-sm text-muted-foreground">Son 30 gün</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {instagramStatus === 'connected' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Instagram Entegrasyon Ayarları</CardTitle>
              <CardDescription>
                Instagram hesabınızın EsnafPanel ile nasıl etkileşime geçeceğini özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoPost">Otomatik Gönderi Paylaşımı</Label>
                    <p className="text-sm text-muted-foreground">
                      Yeni ürünleri Instagram'da otomatik olarak paylaş
                    </p>
                  </div>
                  <Switch
                    id="autoPost"
                    checked={settings.autoPost}
                    onCheckedChange={() => handleToggle('autoPost')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="syncProducts">Ürün Senkronizasyonu</Label>
                    <p className="text-sm text-muted-foreground">
                      Ürünlerinizi Instagram alışveriş özelliği ile senkronize edin
                    </p>
                  </div>
                  <Switch
                    id="syncProducts"
                    checked={settings.syncProducts}
                    onCheckedChange={() => handleToggle('syncProducts')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="syncStories">Hikaye Paylaşımı</Label>
                    <p className="text-sm text-muted-foreground">
                      Önemli duyurular için otomatik Instagram hikayeleri oluşturun
                    </p>
                  </div>
                  <Switch
                    id="syncStories"
                    checked={settings.syncStories}
                    onCheckedChange={() => handleToggle('syncStories')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sharePromotions">Promosyon Paylaşımı</Label>
                    <p className="text-sm text-muted-foreground">
                      İndirim ve kampanyalarınızı Instagram'da otomatik paylaşın
                    </p>
                  </div>
                  <Switch
                    id="sharePromotions"
                    checked={settings.sharePromotions}
                    onCheckedChange={() => handleToggle('sharePromotions')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="syncComments">Yorum Senkronizasyonu</Label>
                    <p className="text-sm text-muted-foreground">
                      Instagram yorumlarını EsnafPanel mesaj kutunuzda görüntüleyin
                    </p>
                  </div>
                  <Switch
                    id="syncComments"
                    checked={settings.syncComments}
                    onCheckedChange={() => handleToggle('syncComments')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link2 className="mr-2 h-4 w-4" />
                Instagram Hesabını Görüntüle
              </Button>
              <Button onClick={handleSaveSettings}>
                <Settings className="mr-2 h-4 w-4" />
                Ayarları Kaydet
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Yaklaşan Paylaşımlar</CardTitle>
              <CardDescription>
                Planlanmış Instagram gönderilerinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <Image className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Yeni Koleksiyon Duyurusu</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Yeni yaz koleksiyonumuz hazır! #YazModası #YeniGelenler
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
                            Planlandı: 15.07.2023, 14:30
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">Düzenle</Button>
                      <Button size="sm" variant="ghost" className="text-destructive">İptal</Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <Image className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">%20 İndirim Kampanyası</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tüm ürünlerde geçerli %20 indirim kampanyamız başladı! Sadece bu haftaya özel.
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
                            Planlandı: 18.07.2023, 09:00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">Düzenle</Button>
                      <Button size="sm" variant="ghost" className="text-destructive">İptal</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Instagram className="mr-2 h-4 w-4" />
                Yeni Gönderi Planla
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default InstagramSettings;
