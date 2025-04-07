import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WhatsAppConnect = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  // Check if WhatsApp is already connected
  React.useEffect(() => {
    const whatsappConnection = localStorage.getItem('whatsappConnection');
    if (whatsappConnection) {
      const connectionData = JSON.parse(whatsappConnection);
      if (connectionData.connected) {
        setIsConnected(true);
        setPhoneNumber(connectionData.phoneNumber);
      }
    }
  }, []);

  const handleConnect = () => {
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Lütfen geçerli bir telefon numarası girin');
      return;
    }
    
    setIsConnecting(true);
    setError('');
    
    // Simulate connecting to WhatsApp
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      // Save connection state to localStorage
      const connectionData = {
        connected: true,
        phoneNumber,
        connectedAt: new Date().toISOString()
      };
      localStorage.setItem('whatsappConnection', JSON.stringify(connectionData));
      
      toast({
        title: "WhatsApp Bağlantısı Kuruldu",
        description: `${phoneNumber} numaralı WhatsApp hesabı başarıyla bağlandı.`,
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    // Remove WhatsApp connection
    localStorage.removeItem('whatsappConnection');
    setIsConnected(false);
    setPhoneNumber('');
    
    toast({
      title: "WhatsApp Bağlantısı Kesildi",
      description: "WhatsApp bağlantısı başarıyla kaldırıldı.",
    });
  };

  const formatPhoneNumber = (value) => {
    // Keep only digits
    const digits = value.replace(/\D/g, '');
    
    // Format as +XX XXX XXX XX XX
    let formattedValue = '';
    if (digits.length > 0) formattedValue += '+';
    if (digits.length > 0) formattedValue += digits.substring(0, 2) + ' ';
    if (digits.length > 2) formattedValue += digits.substring(2, 5) + ' ';
    if (digits.length > 5) formattedValue += digits.substring(5, 8) + ' ';
    if (digits.length > 8) formattedValue += digits.substring(8, 10) + ' ';
    if (digits.length > 10) formattedValue += digits.substring(10);
    
    return formattedValue.trim();
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">WhatsApp Bağlantısı</h1>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              <CardTitle>WhatsApp Business API</CardTitle>
            </div>
            <CardDescription>
              WhatsApp Business API'yi bağlayarak müşterilerinizle mesajlaşın ve otomatik mesajlar gönderin.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isConnected ? (
              <div>
                <div className="p-4 bg-green-50 rounded-lg mb-6 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">WhatsApp Bağlı</h3>
                    <p className="text-sm text-green-700">
                      {phoneNumber} numaralı WhatsApp hesabı bağlı. Artık mesajlarınızı ve bildirimlerinizi WhatsApp üzerinden yönetebilirsiniz.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Bağlantı Türü: WhatsApp Business API</p>
                    <p className="text-sm text-muted-foreground">Tüm özelliklerden yararlanabilirsiniz.</p>
                  </div>
                  
                  <Button variant="destructive" onClick={handleDisconnect}>
                    Bağlantıyı Kes
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone-number">WhatsApp Telefon Numarası</Label>
                    <div className="mt-1">
                      <Input
                        id="phone-number"
                        placeholder="+90 5xx xxx xx xx"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className={error ? "border-red-300" : ""}
                      />
                      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      WhatsApp Business API kayıtlı telefon numaranızı girin.
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="mt-2"
                  >
                    {isConnecting ? "Bağlanıyor..." : "WhatsApp'ı Bağla"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {isConnected && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mesaj Ayarları</CardTitle>
                <CardDescription>WhatsApp mesaj gönderim ayarlarınızı yapılandırın</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  WhatsApp üzerinden göndereceğiniz otomatik mesajları ve bilgilendirmeleri yönetin.
                </p>
                <Button className="mt-4" variant="outline">Mesaj Şablonlarını Düzenle</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bağlantı Bilgileri</CardTitle>
                <CardDescription>WhatsApp Business API bağlantı detayları</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm"><strong>Numara:</strong> {phoneNumber}</li>
                  <li className="text-sm"><strong>API Tipi:</strong> WhatsApp Business API</li>
                  <li className="text-sm"><strong>Durum:</strong> <span className="text-green-600">Aktif</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WhatsAppConnect;
