
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BusinessType } from '@/components/Dashboard/BusinessTypeInfo';
import { AlertCircle } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // İşletme verilerini yükleme
  useEffect(() => {
    try {
      setIsLoading(true);
      const savedData = localStorage.getItem('businessData');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Eğer businessType tanımsız ya da boşsa, varsayılan değer olarak 'retail' ata
        if (!parsedData.businessType || parsedData.businessType === '') {
          parsedData.businessType = 'retail';
        }
        
        setFormData(prevData => ({
          ...prevData,
          ...parsedData
        }));
      }
      
      // BusinessSetup verilerini de kontrol et
      const businessSetup = localStorage.getItem('businessSetup');
      if (businessSetup) {
        const parsedSetup = JSON.parse(businessSetup);
        if (parsedSetup.businessType && parsedSetup.businessType !== '') {
          setFormData(prevData => ({
            ...prevData,
            businessType: parsedSetup.businessType,
            businessName: parsedSetup.businessName || prevData.businessName
          }));
        }
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error("İşletme verilerini yüklerken hata:", error);
      setError("İşletme verileri yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    try {
      console.log(`İşletme türü değiştiriliyor: ${value}`);
      setFormData(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.error("İşletme türünü değiştirirken hata:", error);
      setError("İşletme türü değiştirilemedi.");
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Eğer işletme türü tanımsız ya da boş ise, varsayılan değer ata
      const businessType = formData.businessType || 'retail';
      
      const dataToSave = {
        ...formData,
        businessType
      };
      
      localStorage.setItem('businessData', JSON.stringify(dataToSave));
      
      try {
        // BusinessSetup verilerini de güncelle
        const businessSetup = localStorage.getItem('businessSetup');
        if (businessSetup) {
          const parsedSetup = JSON.parse(businessSetup);
          parsedSetup.businessType = businessType;
          parsedSetup.businessName = dataToSave.businessName;
          localStorage.setItem('businessSetup', JSON.stringify(parsedSetup));
        }
      } catch (err) {
        console.error("Setup senkronizasyon hatası:", err);
      }
      
      toast({
        title: "İşletme güncellendi",
        description: "İşletme bilgileriniz başarıyla kaydedildi.",
      });
    } catch (error) {
      setError("İşletme bilgileriniz kaydedilemedi.");
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

  const businessTypes = [
    { id: 'retail', name: 'Perakende Satış' },
    { id: 'restaurant', name: 'Restoran' },
    { id: 'cafe', name: 'Kafe' },
    { id: 'beauty', name: 'Güzellik/Kuaför' },
    { id: 'barber', name: 'Berber' },
    { id: 'clothing', name: 'Giyim Mağazası' },
    { id: 'gift', name: 'Hediyelik Eşya' },
    { id: 'food', name: 'Gıda Satışı' },
    { id: 'bakery', name: 'Fırın/Pastane' },
    { id: 'parfumery', name: 'Parfümeri/Kozmetik' },
    { id: 'pharmacy', name: 'Eczane' },
    { id: 'health', name: 'Sağlık Hizmetleri' },
    { id: 'education', name: 'Eğitim/Kurs' },
    { id: 'service', name: 'Hizmet Sektörü' },
    { id: 'other', name: 'Diğer' },
  ];

  if (!isInitialized && isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md mb-4 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
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
                  value={formData.businessType || 'retail'}
                  onValueChange={(value) => handleSelectChange('businessType', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="İşletme türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
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
