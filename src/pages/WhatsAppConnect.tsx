
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { QrCode, Smartphone, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhatsAppConnect = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [qrExpired, setQrExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // İlk yükleme sırasında localStorage'dan bağlantı durumunu kontrol et
  useEffect(() => {
    const storedStatus = localStorage.getItem('whatsappStatus');
    if (storedStatus === 'connected') {
      setConnectionStatus('connected');
    }
  }, []);

  const handleConnect = () => {
    setIsLoading(true);
    setConnectionStatus('connecting');
    toast({
      title: "QR Kodu Oluşturuluyor",
      description: "Lütfen WhatsApp uygulamanızdaki QR kod tarayıcı ile bağlanın.",
    });
    
    // QR kod oluşturma gecikmesini simüle et
    setTimeout(() => {
      setQrExpired(false);
      setIsLoading(false);
    }, 1500);
    
    // 1 dakika sonra QR kodun süresinin dolduğunu simüle et
    setTimeout(() => {
      if (connectionStatus !== 'connected') {
        setQrExpired(true);
        toast({
          title: "QR Kod Süresi Doldu",
          description: "Yeni bir QR kod oluşturmak için 'Yeni QR Kodu Oluştur' butonuna tıklayın.",
          variant: "destructive",
        });
      }
    }, 60000);
  };
  
  const handleRefreshQr = () => {
    setIsLoading(true);
    setQrExpired(false);
    toast({
      title: "QR Kodu Yenileniyor",
      description: "Yeni QR kodu oluşturuluyor...",
    });
    
    // QR yenileme gecikmesini simüle et
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "QR Kodu Hazır",
        description: "Lütfen WhatsApp uygulamanızdaki QR kod tarayıcı ile bağlanın.",
      });
    }, 1500);
    
    // 1 dakika sonra QR kodun süresinin dolduğunu simüle et
    setTimeout(() => {
      if (connectionStatus !== 'connected') {
        setQrExpired(true);
      }
    }, 60000);
  };
  
  const simulateConnection = () => {
    // Demo amaçlı - başarılı bağlantıyı simüle et
    setConnectionStatus('connected');
    // Bağlantı durumunu localStorage'a kaydet
    localStorage.setItem('whatsappStatus', 'connected');
    
    toast({
      title: "Bağlantı Başarılı",
      description: "WhatsApp hesabınız başarıyla EsnafPanel'e bağlandı.",
    });
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    // LocalStorage'dan bağlantı durumunu kaldır
    localStorage.removeItem('whatsappStatus');
    
    toast({
      title: "Bağlantı Kesildi",
      description: "WhatsApp hesabınızın bağlantısı kesildi.",
    });
  };

  const goToSettings = () => {
    navigate('/settings?tab=whatsapp');
  };

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
                İşletmenizin WhatsApp hesabını bağlamak için, "WhatsApp'a Bağlan" butonuna tıklayın ve telefonunuzdaki WhatsApp uygulamasından QR kodu tarayın.
              </p>
              <Button 
                onClick={handleConnect}
                className="bg-whatsapp hover:bg-whatsapp-dark w-full"
                disabled={isLoading}
              >
                <Smartphone className="h-5 w-5 mr-2" />
                {isLoading ? "Bağlanıyor..." : "WhatsApp'a Bağlan"}
              </Button>
            </>
          )}
          
          {connectionStatus === 'connecting' && !qrExpired && (
            <>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center mb-4" style={{height: "260px"}}>
                <div className="text-center">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                  ) : (
                    <QrCode className="h-24 w-24 mx-auto mb-4 text-gray-800" />
                  )}
                  <p className="text-sm text-gray-600">Bu QR kodu, WhatsApp uygulamanızın QR tarayıcısı ile tarayın.</p>
                  <p className="text-xs text-gray-500 mt-2">Bu QR kodun süresi 1 dakika içinde dolacak.</p>
                  <Button 
                    variant="link" 
                    size="sm"
                    onClick={simulateConnection}
                    className="mt-4 text-xs text-primary"
                  >
                    (Demo: Bağlantıyı Simüle Et)
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleRefreshQr} 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? "Yenileniyor..." : "QR Kodu Yenile"}
              </Button>
            </>
          )}
          
          {connectionStatus === 'connecting' && qrExpired && (
            <>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center mb-4" style={{height: "260px"}}>
                <div className="text-center">
                  <div className="text-destructive mb-2">QR Kod Süresi Doldu</div>
                  <p className="text-sm text-gray-600">Yeni bir QR kodu oluşturmak için aşağıdaki butona tıklayın.</p>
                </div>
              </div>
              
              <Button 
                onClick={handleRefreshQr} 
                className="w-full"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? "Oluşturuluyor..." : "Yeni QR Kodu Oluştur"}
              </Button>
            </>
          )}
          
          {connectionStatus === 'connected' && (
            <>
              <div className="flex items-center text-green-500 mb-4">
                <Smartphone className="h-5 w-5 mr-2" />
                <span>WhatsApp bağlantısı aktif</span>
              </div>
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
