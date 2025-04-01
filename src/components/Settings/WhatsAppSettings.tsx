
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { Phone, MessageSquare, Zap, RefreshCw } from 'lucide-react';

const WhatsAppSettings = () => {
  const { toast } = useToast();
  const [connectedNumber, setConnectedNumber] = useState('');
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected'); // connected, disconnected, connecting
  
  const [settings, setSettings] = useState({
    autoReply: true,
    welcomeMessage: true,
    outOfHoursMessage: false,
    receiveNotifications: true,
  });
  
  const [templates, setTemplates] = useState({
    welcome: 'Merhaba {{customer_name}}, EsnafPanel'e hoşgeldiniz! Size nasıl yardımcı olabiliriz?',
    outOfHours: 'Merhaba {{customer_name}}, şu anda çalışma saatleri dışındayız. En kısa sürede size dönüş yapacağız.',
    orderConfirmation: 'Merhaba {{customer_name}}, {{order_id}} numaralı siparişiniz alındı. Toplam tutar: {{total_amount}} TL',
    followUp: 'Merhaba {{customer_name}}, hizmetimizden memnun kaldınız mı? Geri bildiriminiz bizim için değerli!'
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTemplates(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveTemplates = () => {
    toast({
      title: "Şablonlar kaydedildi",
      description: "WhatsApp mesaj şablonlarınız başarıyla güncellendi.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Ayarlar güncellendi",
      description: "WhatsApp ayarlarınız başarıyla kaydedildi.",
    });
  };

  const handleConnect = () => {
    if (!connectedNumber) {
      toast({
        title: "Hata",
        description: "Lütfen bir telefon numarası girin.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would initiate the WhatsApp QR code flow
    setWhatsappStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setWhatsappStatus('connected');
      toast({
        title: "WhatsApp Bağlandı",
        description: `${connectedNumber} numaralı WhatsApp hesabınız başarıyla bağlandı.`,
      });
    }, 3000);
  };

  const handleDisconnect = () => {
    // In a real app, this would disconnect the WhatsApp connection
    setWhatsappStatus('disconnected');
    toast({
      title: "WhatsApp Bağlantısı Kesildi",
      description: "WhatsApp bağlantınız başarıyla kesildi.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Bağlantısı</CardTitle>
          <CardDescription>
            İşletmenize ait WhatsApp hesabını bağlayın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {whatsappStatus === 'disconnected' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Telefon Numarası</Label>
                <div className="flex space-x-2">
                  <Input
                    id="whatsappNumber"
                    placeholder="+90 5XX XXX XX XX"
                    value={connectedNumber}
                    onChange={(e) => setConnectedNumber(e.target.value)}
                  />
                  <Button onClick={handleConnect}>Bağlan</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  WhatsApp Business API hesabınızı bağlamak için geçerli bir telefon numarası girin.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">WhatsApp Nasıl Bağlanır?</h4>
                <ol className="list-decimal list-inside text-sm space-y-2">
                  <li>İşletme telefon numaranızı girin</li>
                  <li>"Bağlan" butonuna tıklayın</li>
                  <li>Telefonunuzdan WhatsApp uygulamasını açın</li>
                  <li>Ayarlar &gt; Bağlı Cihazlar &gt; Cihaz Bağla seçeneğine gidin</li>
                  <li>Görüntülenen QR kodu telefonunuzla tarayın</li>
                </ol>
              </div>
            </div>
          ) : whatsappStatus === 'connecting' ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <h3 className="text-lg font-medium">WhatsApp'a Bağlanıyor...</h3>
              <p className="text-sm text-muted-foreground mt-2">Lütfen telefonunuzdaki QR kodu tarayın</p>
              
              <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-md mt-6 flex items-center justify-center">
                <p className="text-sm text-gray-500">QR Kod Yükleniyor...</p>
              </div>
              
              <Button variant="outline" onClick={() => setWhatsappStatus('disconnected')} className="mt-6">
                İptal
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
                <Phone className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">WhatsApp Bağlantısı Aktif</h4>
                  <p className="text-sm text-green-700 mt-1">
                    <strong>{connectedNumber}</strong> numaralı WhatsApp hesabınız başarıyla bağlandı.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Bağlantı Durumu</h4>
                  <p className="text-sm text-muted-foreground">WhatsApp API bağlantınız aktif</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => toast({ title: "Yenileniyor...", description: "WhatsApp bağlantınız yenileniyor." })}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Yenile
                  </Button>
                  <Button size="sm" variant="destructive" onClick={handleDisconnect}>
                    Bağlantıyı Kes
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted p-4 rounded-md flex flex-col">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-medium">Gönderilen Mesajlar</h4>
                  </div>
                  <div className="text-2xl font-bold">137</div>
                  <p className="text-sm text-muted-foreground">Son 30 gün</p>
                </div>
                
                <div className="bg-muted p-4 rounded-md flex flex-col">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-medium">API Kredisi</h4>
                  </div>
                  <div className="text-2xl font-bold">863</div>
                  <p className="text-sm text-muted-foreground">Kalan mesaj hakkı</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {whatsappStatus === 'connected' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Ayarları</CardTitle>
              <CardDescription>
                WhatsApp mesajlaşma tercihlerinizi özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoReply">Otomatik Yanıt</Label>
                    <p className="text-sm text-muted-foreground">
                      Gelen mesajlara otomatik yanıt verin
                    </p>
                  </div>
                  <Switch
                    id="autoReply"
                    checked={settings.autoReply}
                    onCheckedChange={() => handleToggle('autoReply')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="welcomeMessage">Karşılama Mesajı</Label>
                    <p className="text-sm text-muted-foreground">
                      Yeni müşterilere otomatik karşılama mesajı gönderin
                    </p>
                  </div>
                  <Switch
                    id="welcomeMessage"
                    checked={settings.welcomeMessage}
                    onCheckedChange={() => handleToggle('welcomeMessage')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="outOfHoursMessage">Çalışma Saatleri Dışı Mesajı</Label>
                    <p className="text-sm text-muted-foreground">
                      Çalışma saatleri dışında gelen mesajlara özel yanıt gönderin
                    </p>
                  </div>
                  <Switch
                    id="outOfHoursMessage"
                    checked={settings.outOfHoursMessage}
                    onCheckedChange={() => handleToggle('outOfHoursMessage')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="receiveNotifications">WhatsApp Bildirimleri</Label>
                    <p className="text-sm text-muted-foreground">
                      Yeni WhatsApp mesajlarında bildirim alın
                    </p>
                  </div>
                  <Switch
                    id="receiveNotifications"
                    checked={settings.receiveNotifications}
                    onCheckedChange={() => handleToggle('receiveNotifications')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>Ayarları Kaydet</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Mesaj Şablonları</CardTitle>
              <CardDescription>
                Otomatik mesajlar için şablonlarınızı düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="welcome" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                  <TabsTrigger value="welcome">Karşılama</TabsTrigger>
                  <TabsTrigger value="outOfHours">Çalışma Saati Dışı</TabsTrigger>
                  <TabsTrigger value="orderConfirmation">Sipariş Onayı</TabsTrigger>
                  <TabsTrigger value="followUp">Takip Mesajı</TabsTrigger>
                </TabsList>
                
                <TabsContent value="welcome" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="welcomeTemplate">Karşılama Mesajı</Label>
                    <Textarea
                      id="welcomeTemplate"
                      name="welcome"
                      value={templates.welcome}
                      onChange={handleTemplateChange}
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      Kullanılabilir değişkenler: {{'{{'}}customer_name{{'}}'}}, {{'{{'}}business_name{{'}}'}}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="outOfHours" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="outOfHoursTemplate">Çalışma Saati Dışı Mesajı</Label>
                    <Textarea
                      id="outOfHoursTemplate"
                      name="outOfHours"
                      value={templates.outOfHours}
                      onChange={handleTemplateChange}
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      Kullanılabilir değişkenler: {{'{{'}}customer_name{{'}}'}}, {{'{{'}}business_name{{'}}'}}, {{'{{'}}working_hours{{'}}'}}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="orderConfirmation" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orderConfirmationTemplate">Sipariş Onayı Mesajı</Label>
                    <Textarea
                      id="orderConfirmationTemplate"
                      name="orderConfirmation"
                      value={templates.orderConfirmation}
                      onChange={handleTemplateChange}
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      Kullanılabilir değişkenler: {{'{{'}}customer_name{{'}}'}}, {{'{{'}}order_id{{'}}'}}, {{'{{'}}total_amount{{'}}'}}, {{'{{'}}order_items{{'}}'}}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="followUp" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="followUpTemplate">Takip Mesajı</Label>
                    <Textarea
                      id="followUpTemplate"
                      name="followUp"
                      value={templates.followUp}
                      onChange={handleTemplateChange}
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      Kullanılabilir değişkenler: {{'{{'}}customer_name{{'}}'}}, {{'{{'}}order_id{{'}}'}}, {{'{{'}}days_since_purchase{{'}}'}}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveTemplates}>Şablonları Kaydet</Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default WhatsAppSettings;
