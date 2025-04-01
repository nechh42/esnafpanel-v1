
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';

const SecuritySettings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: true,
    passwordExpiry: false,
    loginNotifications: true,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleToggle = (key: string) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = () => {
    // In a real application, this would validate and save the new password
    // For now, just check if the new password and confirm password match
    
    if (!passwordData.currentPassword) {
      toast({
        title: "Hata",
        description: "Mevcut şifrenizi girmelisiniz.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Hata",
        description: "Yeni şifre ve şifre tekrarı eşleşmiyor.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Hata",
        description: "Şifreniz en az 8 karakter olmalıdır.",
        variant: "destructive",
      });
      return;
    }
    
    // Reset the form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    toast({
      title: "Şifre güncellendi",
      description: "Şifreniz başarıyla değiştirildi.",
    });
  };

  const saveSecuritySettings = () => {
    toast({
      title: "Güvenlik ayarları güncellendi",
      description: "Güvenlik tercihleriniz başarıyla kaydedildi.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Şifre Değiştir</CardTitle>
          <CardDescription>
            Güvenliğiniz için şifrenizi düzenli olarak değiştirmenizi öneririz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mevcut Şifre</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={handleInputChange}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">Yeni Şifre</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Şifreniz:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>En az 8 karakter olmalıdır</li>
              <li>En az bir büyük harf içermelidir</li>
              <li>En az bir sayı içermelidir</li>
              <li>En az bir özel karakter içermelidir</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handlePasswordChange}>Şifreyi Değiştir</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Güvenlik Ayarları</CardTitle>
          <CardDescription>
            Hesap güvenliğinizi artıracak ek önlemler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorAuth">İki Faktörlü Kimlik Doğrulama</Label>
                <p className="text-sm text-muted-foreground">
                  Hesabınıza erişirken ekstra güvenlik için SMS veya uygulama ile doğrulama ekleyin
                </p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={() => handleToggle('twoFactorAuth')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sessionTimeout">Oturum Zaman Aşımı</Label>
                <p className="text-sm text-muted-foreground">
                  30 dakika hareketsizlikten sonra otomatik olarak oturumu kapatır
                </p>
              </div>
              <Switch
                id="sessionTimeout"
                checked={securitySettings.sessionTimeout}
                onCheckedChange={() => handleToggle('sessionTimeout')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="passwordExpiry">Şifre Sona Erme</Label>
                <p className="text-sm text-muted-foreground">
                  Her 3 ayda bir şifre değişikliği gerektirir
                </p>
              </div>
              <Switch
                id="passwordExpiry"
                checked={securitySettings.passwordExpiry}
                onCheckedChange={() => handleToggle('passwordExpiry')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="loginNotifications">Giriş Bildirimleri</Label>
                <p className="text-sm text-muted-foreground">
                  Hesabınıza her yeni giriş için e-posta bildirimi alın
                </p>
              </div>
              <Switch
                id="loginNotifications"
                checked={securitySettings.loginNotifications}
                onCheckedChange={() => handleToggle('loginNotifications')}
              />
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
            <ShieldAlert className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Güvenlik Hatırlatması</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Şifrenizi hiç kimseyle paylaşmayın ve her cihaz için farklı şifreler kullanmaya özen gösterin. 
                Güvenliğiniz için düzenli olarak şifrenizi değiştirmenizi öneririz.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={saveSecuritySettings}>Ayarları Kaydet</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecuritySettings;
