
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type WhatsAppSettingsProps = {
  businessData?: any;
}

const WhatsAppSettings: React.FC<WhatsAppSettingsProps> = ({ businessData }) => {
  const { toast } = useToast();
  const [whatsappNumber, setWhatsappNumber] = useState(businessData?.whatsappNumber || '');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Check if WhatsApp is already connected on component mount
  React.useEffect(() => {
    const whatsappConnectionStr = localStorage.getItem('whatsappConnection');
    if (whatsappConnectionStr) {
      const whatsappConnection = JSON.parse(whatsappConnectionStr);
      if (whatsappConnection.connected) {
        setIsConnected(true);
        setWhatsappNumber(whatsappConnection.number);
      }
    }
  }, []);

  const handleConnect = () => {
    if (!whatsappNumber) {
      toast({
        title: "Lütfen telefon numarası girin",
        description: "WhatsApp bağlantısı için telefon numarası gerekli.",
        variant: "destructive",
      });
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate API call to connect WhatsApp
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      // Store connection status in localStorage
      const whatsappConnection = {
        connected: true,
        number: whatsappNumber,
        connectedAt: new Date().toISOString()
      };
      
      localStorage.setItem('whatsappConnection', JSON.stringify(whatsappConnection));
      
      toast({
        title: "WhatsApp Bağlantısı Kuruldu",
        description: `${whatsappNumber} numarası başarıyla bağlandı.`,
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    
    // Remove connection from localStorage
    localStorage.removeItem('whatsappConnection');
    
    toast({
      title: "WhatsApp Bağlantısı Kesildi",
      description: "WhatsApp hesabınızın bağlantısı başarıyla kesildi.",
    });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <CardTitle>WhatsApp İşletme API</CardTitle>
          </div>
          <CardDescription>
            WhatsApp üzerinden müşterilerinizle iletişime geçin
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div>
              <div className="mb-4 p-4 bg-green-50 rounded-md flex items-start space-x-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">WhatsApp Hesabı Bağlı</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{whatsappNumber}</span> numarasına bağlısınız. WhatsApp mesajlarını artık bu platform üzerinden yönetebilirsiniz.
                  </p>
                </div>
              </div>
              
              <Button variant="destructive" onClick={handleDisconnect}>
                Bağlantıyı Kes
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                WhatsApp Business API bağlantısı için gerekli bilgileri girin
              </p>
              <div>
                <Label htmlFor="whatsapp-number">İşletme Telefon Numarası</Label>
                <Input 
                  id="whatsapp-number" 
                  placeholder="Örn: +905xxxxxxxxx" 
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleConnect}
                disabled={isConnecting}
              >
                {isConnecting ? "Bağlanıyor..." : "WhatsApp Hesabına Bağlan"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSettings;
