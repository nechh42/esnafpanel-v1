
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type BusinessSettingsProps = {
  businessData: any;
}

const BusinessSettings: React.FC<BusinessSettingsProps> = ({ businessData }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: businessData?.name || '',
    businessType: businessData?.type || 'retail',
    address: businessData?.address || '',
    city: businessData?.city || '',
    description: businessData?.description || '',
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    
    try {
      // In a real application, save to Supabase
      // For now, just show a success toast and save to localStorage
      localStorage.setItem('businessData', JSON.stringify(formData));
      
      toast({
        title: "İşletme güncellendi",
        description: "İşletme bilgileriniz başarıyla kaydedildi.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "İşletme bilgileriniz kaydedilemedi. Lütfen daha sonra tekrar deneyin.",
      });
      console.error("İşletme bilgilerini kaydetme hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>İşletme Bilgileri</CardTitle>
          <CardDescription>
            İşletmenizin temel bilgilerini güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">İşletme Adı</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">İşletme Türü</Label>
                <Select 
                  value={formData.businessType || 'other'}
                  onValueChange={(value) => handleSelectChange('businessType', value)}
                >
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="İşletme türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Perakende Satış</SelectItem>
                    <SelectItem value="restaurant">Restoran/Kafe</SelectItem>
                    <SelectItem value="cafe">Kafe</SelectItem>
                    <SelectItem value="beauty">Güzellik/Kuaför</SelectItem>
                    <SelectItem value="barber">Berber</SelectItem>
                    <SelectItem value="clothing">Giyim Mağazası</SelectItem>
                    <SelectItem value="gift">Hediyelik Eşya</SelectItem>
                    <SelectItem value="food">Gıda Satışı</SelectItem>
                    <SelectItem value="bakery">Fırın/Pastane</SelectItem>
                    <SelectItem value="parfumery">Parfümeri/Kozmetik</SelectItem>
                    <SelectItem value="pharmacy">Eczane</SelectItem>
                    <SelectItem value="health">Sağlık Hizmetleri</SelectItem>
                    <SelectItem value="education">Eğitim/Kurs</SelectItem>
                    <SelectItem value="service">Hizmet Sektörü</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Şehir</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">İşletme Açıklaması</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="İşletmenizi kısaca tanımlayın..."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessSettings;
