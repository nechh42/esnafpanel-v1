
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Modify the type definition to make businessData optional
type ProfileSettingsProps = {
  businessData?: any;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ businessData }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [language, setLanguage] = useState('tr');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: businessData?.ownerName || '',
    email: businessData?.email || '',
    phone: businessData?.phone || '',
  });

  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Load saved profile image if exists
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
    
    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: language === 'tr' ? "Dosya çok büyük" : "File too large",
        description: language === 'tr' ? "Maksimum dosya boyutu 2MB'dir." : "Maximum file size is 2MB.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: language === 'tr' ? "Geçersiz dosya türü" : "Invalid file type",
        description: language === 'tr' ? "Lütfen bir resim dosyası yükleyin." : "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }
    
    // Read the file and convert to data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setProfileImage(dataUrl);
      // Store in localStorage
      localStorage.setItem('profileImage', dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // In a real application, save to Supabase and upload image
    // For now, just save to localStorage
    localStorage.setItem('profileData', JSON.stringify(formData));
    
    toast({
      title: language === 'tr' ? "Profil güncellendi" : "Profile updated",
      description: language === 'tr' ? "Profil bilgileriniz başarıyla kaydedildi." : "Your profile information has been saved successfully.",
    });
  };

  const getInitials = (name: string) => {
    if (!name) return 'KA';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'tr' ? 'Profil Bilgileri' : 'Profile Information'}</CardTitle>
          <CardDescription>
            {language === 'tr' ? 'Kişisel bilgilerinizi güncelleyin' : 'Update your personal information'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage || ""} alt="Profile" />
              <AvatarFallback className="text-lg">{getInitials(formData.fullName)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <input
                type="file"
                id="profile-image"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleImageUploadClick}
              >
                {language === 'tr' ? 'Fotoğraf Yükle' : 'Upload Photo'}
              </Button>
              <p className="text-sm text-muted-foreground">
                {language === 'tr' ? 'JPG, PNG veya GIF. Maksimum 2MB.' : 'JPG, PNG or GIF. Maximum 2MB.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">{language === 'tr' ? 'Ad Soyad' : 'Full Name'}</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{language === 'tr' ? 'E-posta' : 'Email'}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{language === 'tr' ? 'Telefon' : 'Phone'}</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>{language === 'tr' ? 'Kaydet' : 'Save'}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
