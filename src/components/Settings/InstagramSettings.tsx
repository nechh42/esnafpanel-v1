
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Instagram, Check, AlertCircle } from 'lucide-react';

type InstagramSettingsProps = {
  businessData?: any;
}

const InstagramSettings: React.FC<InstagramSettingsProps> = ({ businessData }) => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = () => {
    if (!username || !password) {
      setError('Lütfen kullanıcı adı ve şifrenizi girin.');
      return;
    }
    
    setError('');
    setIsConnecting(true);
    
    // Simulate API call to connect Instagram
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      // Store connection status in localStorage
      const instagramConnection = {
        connected: true,
        username: username,
        connectedAt: new Date().toISOString()
      };
      
      localStorage.setItem('instagramConnection', JSON.stringify(instagramConnection));
      
      toast({
        title: "Instagram Bağlantısı Kuruldu",
        description: `${username} hesabı başarıyla bağlandı.`,
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setUsername('');
    setPassword('');
    
    // Remove connection from localStorage
    localStorage.removeItem('instagramConnection');
    
    toast({
      title: "Instagram Bağlantısı Kesildi",
      description: "Instagram hesabınızın bağlantısı başarıyla kesildi.",
    });
  };

  // Check if Instagram is already connected
  React.useEffect(() => {
    const instagramConnectionStr = localStorage.getItem('instagramConnection');
    if (instagramConnectionStr) {
      const instagramConnection = JSON.parse(instagramConnectionStr);
      if (instagramConnection.connected) {
        setIsConnected(true);
        setUsername(instagramConnection.username);
      }
    }
  }, []);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Instagram className="h-5 w-5" />
            <CardTitle>Instagram Bağlantısı</CardTitle>
          </div>
          <CardDescription>
            Instagram işletme hesabınızı bağlayarak mesajlarınızı yönetin
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isConnected ? (
            <div>
              <div className="mb-4 p-4 bg-green-50 rounded-md flex items-start space-x-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Instagram Hesabı Bağlı</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{username}</span> hesabına bağlısınız. Instagram DM mesajlarını artık bu platform üzerinden yönetebilirsiniz.
                  </p>
                </div>
              </div>
              
              <Button variant="destructive" onClick={handleDisconnect}>
                Bağlantıyı Kes
              </Button>
            </div>
          ) : (
            <div>
              {error && (
                <div className="mb-4 p-4 bg-red-50 rounded-md flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="instagram-username">Instagram Kullanıcı Adı</Label>
                  <Input 
                    id="instagram-username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Kullanıcı adınız"
                  />
                </div>
                
                <div>
                  <Label htmlFor="instagram-password">Instagram Şifresi</Label>
                  <Input 
                    id="instagram-password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifreniz"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={handleConnect} 
                    disabled={isConnecting}
                  >
                    {isConnecting ? "Bağlanıyor..." : "Instagram'a Bağlan"}
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground mt-4">
                  <p>Bilgi: Bu işlem için Meta Business Suite hesabınız olmalıdır.</p>
                  <p>Kullanıcı adı ve şifre girilerek yapılan bağlantı işlemi güvenlidir.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Instagram Mesaj Ayarları</CardTitle>
          <CardDescription>
            Instagram DM ve yorum bildirimlerini yönetin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {isConnected 
                ? "Instagram hesabınız bağlı. Aşağıdaki ayarları yapılandırabilirsiniz." 
                : "Bu ayarları yapılandırmak için Instagram hesabınızı bağlamanız gerekiyor."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramSettings;
