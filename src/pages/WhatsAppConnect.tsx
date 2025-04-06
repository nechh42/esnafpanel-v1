
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Smartphone, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WhatsAppConnect = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  // İlk yükleme sırasında localStorage'dan bağlantı durumunu kontrol et
  useEffect(() => {
    const storedStatus = localStorage.getItem('whatsappStatus');
    if (storedStatus === 'connected') {
      setConnectionStatus('connected');
      const storedPhone = localStorage.getItem('whatsappPhone');
      if (storedPhone) {
        setPhoneNumber(storedPhone);
      }
    }
  }, []);

  const handleConnect = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen bir telefon numarası girin.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setConnectionStatus('connecting');
    
    // Bağlantı sürecini simüle et
    setTimeout(() => {
      // Bağlantı başarılı
      setConnectionStatus('connected');
      // Bağlantı durumunu ve telefon numarasını localStorage'a kaydet
      localStorage.setItem('whatsappStatus', 'connected');
      localStorage.setItem('whatsappPhone', phoneNumber);
      
      setIsLoading(false);
      
      toast({
        title: "WhatsApp Bağlandı",
        description: "WhatsApp hesabınız başarıyla EsnafPanel'e bağlandı.",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsLoading(true);
    
    // Bağlantı kesme işlemini simüle et
    setTimeout(() => {
      setConnectionStatus('disconnected');
      // LocalStorage'dan bağlantı durumunu kaldır
      localStorage.removeItem('whatsappStatus');
      localStorage.removeItem('whatsappPhone');
      
      setIsLoading(false);
      
      toast({
        title: "Bağlantı Kesildi",
        description: "WhatsApp hesabınızın bağlantısı kesildi.",
      });
    }, 1000);
  };

  const goToSettings = () => {
    navigate('/settings?tab=whatsapp');
  };

  const { toast } = useToast();

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">WhatsApp Bağlantısı</h1>
        <p className="text-gray-600">İşletmenizin WhatsApp hesabını EsnafPanel'e bağlayın.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Bağlantı Durumu</h2>
          
          {connectionStatus === 'disconnected' && (
            <>
              <div className="flex items-center text-orange-500 mb-4">
                <Smartphone className="h-5 w-5 mr-2" />
                <span>WhatsApp bağlantısı kurulmadı</span>
              </div>
              <p className="text-gray-600 mb-4">
                İşletmenizin WhatsApp hesabını bağlamak için telefon numaranızı girin ve "WhatsApp'a Bağlan" butonuna tıklayın.
              </p>
              
              <div className="space-y-4 mb-4">
                <div>
                  <Label htmlFor="phoneNumber">WhatsApp Telefon Numarası</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+90 5XX XXX XX XX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-500">
                    WhatsApp'ta kullandığınız işletme telefon numaranızı girin.
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleConnect}
                className="bg-whatsapp hover:bg-whatsapp-dark w-full"
                disabled={isLoading}
              >
                <Phone className="h-5 w-5 mr-2" />
                {isLoading ? "Bağlanıyor..." : "WhatsApp'a Bağlan"}
              </Button>
            </>
          )}
          
          {connectionStatus === 'connecting' && (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mb-6"></div>
              <p className="text-center text-gray-600">
                WhatsApp hesabınız bağlanıyor. Lütfen bekleyin...
              </p>
            </div>
          )}
          
          {connectionStatus === 'connected' && (
            <>
              <div className="flex items-center text-green-500 mb-4">
                <Smartphone className="h-5 w-5 mr-2" />
                <span>WhatsApp bağlantısı aktif</span>
              </div>
              <p className="text-gray-600 mb-2">
                Bağlı telefon numarası: <strong>{phoneNumber}</strong>
              </p>
              <p className="text-gray-600 mb-4">
                WhatsApp hesabınız başarıyla bağlandı. Artık müşterilerinizle WhatsApp üzerinden iletişim kurabilirsiniz.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={goToSettings}
                  className="w-full bg-whatsapp hover:bg-whatsapp-dark"
                >
                  WhatsApp Ayarlarını Yönet
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-destructive hover:text-destructive"
                  onClick={handleDisconnect}
                >
                  Bağlantıyı Kes
                </Button>
              </div>
            </>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">WhatsApp Entegrasyonu Hakkında</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">WhatsApp İş Hesabı Gereklidir</h3>
              <p className="text-sm text-gray-600">Bu özelliği kullanmak için bir WhatsApp İş hesabınız olmalıdır.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Veri Güvenliği</h3>
              <p className="text-sm text-gray-600">Mesaj içerikleri sunucularımızda şifreli olarak saklanır ve yalnızca sizin erişiminize açıktır.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Mesaj Limitleri</h3>
              <p className="text-sm text-gray-600">WhatsApp İş hesabı ile günlük gönderebileceğiniz mesaj sayısında sınırlamalar olabilir.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">Otomatik Mesajlar</h3>
              <p className="text-sm text-gray-600">Çalışma saatleri dışında otomatik yanıtlar ve hoş geldin mesajları oluşturabilirsiniz.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WhatsAppConnect;
