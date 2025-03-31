
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { QrCode, Smartphone, RefreshCw } from 'lucide-react';

const WhatsAppConnect = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [qrExpired, setQrExpired] = useState(false);

  const handleConnect = () => {
    setConnectionStatus('connecting');
    toast({
      title: "QR Kodu Oluşturuluyor",
      description: "Lütfen WhatsApp uygulamanızdaki QR kod tarayıcı ile bağlanın.",
    });
    
    // Simulate QR code generation delay
    setTimeout(() => {
      setQrExpired(false);
    }, 1500);
    
    // Simulate QR code expiration after 1 minute
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
    setQrExpired(false);
    toast({
      title: "QR Kodu Yenileniyor",
      description: "Yeni QR kodu oluşturuluyor...",
    });
    
    // Simulate QR refresh delay
    setTimeout(() => {
      toast({
        title: "QR Kodu Hazır",
        description: "Lütfen WhatsApp uygulamanızdaki QR kod tarayıcı ile bağlanın.",
      });
    }, 1500);
    
    // Simulate QR code expiration after 1 minute
    setTimeout(() => {
      if (connectionStatus !== 'connected') {
        setQrExpired(true);
      }
    }, 60000);
  };
  
  const simulateConnection = () => {
    // For demo purposes only - simulates successful connection
    setConnectionStatus('connected');
    toast({
      title: "Bağlantı Başarılı",
      description: "WhatsApp hesabınız başarıyla EsnafPanel'e bağlandı.",
    });
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
              >
                <Smartphone className="h-5 w-5 mr-2" />
                WhatsApp'a Bağlan
              </Button>
            </>
          )}
          
          {connectionStatus === 'connecting' && !qrExpired && (
            <>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center mb-4" style={{height: "260px"}}>
                <div className="text-center">
                  <QrCode className="h-24 w-24 mx-auto mb-4 text-gray-800" />
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
              
              <Button onClick={handleRefreshQr} variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                QR Kodu Yenile
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
              
              <Button onClick={handleRefreshQr} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Yeni QR Kodu Oluştur
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
              <Button 
                variant="outline" 
                className="w-full text-destructive hover:text-destructive"
                onClick={() => setConnectionStatus('disconnected')}
              >
                Bağlantıyı Kes
              </Button>
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
