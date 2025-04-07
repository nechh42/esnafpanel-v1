
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Check, ChevronsRight, Store } from 'lucide-react';

const BusinessSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeStep, setActiveStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [wantsDemo, setWantsDemo] = useState('yes');
  
  const businessTypes = [
    { value: 'restaurant', label: 'Restoran & Cafe' },
    { value: 'retail', label: 'Perakende Mağaza' },
    { value: 'beauty', label: 'Güzellik & Bakım' },
    { value: 'health', label: 'Sağlık Hizmeti' },
    { value: 'education', label: 'Eğitim Kurumu' },
    { value: 'service', label: 'Hizmet Sektörü' },
    { value: 'other', label: 'Diğer' },
  ];
  
  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!businessName) {
        toast({
          title: "Hata",
          description: "Lütfen işletme adını girin.",
          variant: "destructive",
        });
        return;
      }
      
      if (!businessType) {
        toast({
          title: "Hata",
          description: "Lütfen işletme türünü seçin.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (activeStep === 2) {
      // Phone is optional, but validate format if provided
      if (businessPhone && !/^\+?[0-9\s\-()]{7,}$/.test(businessPhone)) {
        toast({
          title: "Hata",
          description: "Lütfen geçerli bir telefon numarası girin.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      completeSetup();
    }
  };
  
  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const completeSetup = () => {
    // Save business setup information
    const businessSetup = {
      name: businessName,
      type: businessType,
      phone: businessPhone,
      address: businessAddress,
      setupDate: new Date().toISOString(),
      subscriptionPlan: 'none',
      subscriptionStatus: 'inactive',
    };
    
    localStorage.setItem('businessSetup', JSON.stringify(businessSetup));
    
    // Set demo mode based on user selection
    const isDemoMode = wantsDemo === 'yes';
    localStorage.setItem('demoMode', JSON.stringify(isDemoMode));
    
    // Set demo start date for demo mode
    if (isDemoMode) {
      localStorage.setItem('demoStartDate', new Date().toISOString());
    }
    
    toast({
      title: "İşletme Kurulumu Tamamlandı",
      description: "EsnafPanel'e hoş geldiniz!",
    });
    
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Esnafpanel Kurulumuna Hoşgeldiniz</CardTitle>
          <CardDescription>
            İşletmenizi birkaç adımda sisteme ekleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className={`flex flex-col items-center ${activeStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {activeStep > 1 ? <Check className="h-6 w-6" /> : 1}
                </div>
                <span className="text-xs mt-2">İşletme Bilgileri</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${activeStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              
              <div className={`flex flex-col items-center ${activeStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {activeStep > 2 ? <Check className="h-6 w-6" /> : 2}
                </div>
                <span className="text-xs mt-2">İletişim Bilgileri</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${activeStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              
              <div className={`flex flex-col items-center ${activeStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {activeStep > 3 ? <Check className="h-6 w-6" /> : 3}
                </div>
                <span className="text-xs mt-2">Kullanım Tercihleri</span>
              </div>
            </div>
          </div>
          
          {activeStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="business-name">İşletme Adı</Label>
                <Input 
                  id="business-name" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="İşletmenizin adı"
                />
              </div>
              
              <div>
                <Label htmlFor="business-type">İşletme Türü</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="İşletme türünü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="business-phone">İşletme Telefon Numarası</Label>
                <Input 
                  id="business-phone" 
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  placeholder="+90 xxx xxx xx xx"
                />
              </div>
              
              <div>
                <Label htmlFor="business-address">İşletme Adresi</Label>
                <Input 
                  id="business-address" 
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Sokak adı, bina no, mahalle, ilçe, il"
                />
              </div>
            </div>
          )}
          
          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-700 mb-2">Demo Modu Hakkında</h3>
                <p className="text-sm text-blue-600">Demo modu, EsnafPanel'in tüm özelliklerini 10 gün boyunca ücretsiz kullanmanızı sağlar. 10 gün sonra abonelik seçeneklerinden birini seçerek kullanıma devam edebilirsiniz.</p>
              </div>
              
              <div>
                <Label>Demo Modu</Label>
                <RadioGroup 
                  value={wantsDemo}
                  onValueChange={setWantsDemo}
                  className="flex flex-col space-y-3 mt-2"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="yes" id="demo-yes" />
                    <Label htmlFor="demo-yes" className="cursor-pointer">
                      <div>
                        <h4 className="font-medium">Demo Modu Etkinleştir</h4>
                        <p className="text-sm text-muted-foreground">10 gün süreyle tüm özellikleri ücretsiz kullan</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="no" id="demo-no" />
                    <Label htmlFor="demo-no" className="cursor-pointer">
                      <div>
                        <h4 className="font-medium">Direkt Abonelik</h4>
                        <p className="text-sm text-muted-foreground">Bir abonelik planı seçerek hemen başla</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md space-y-2">
                <p className="text-sm">• WhatsApp entegrasyonu ile müşterilere otomatik bildirimler gönderin</p>
                <p className="text-sm">• Online rezervasyon ve sipariş takibi yapın</p>
                <p className="text-sm">• Müşteri ilişkilerini tek platformdan yönetin</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {activeStep > 1 && (
              <Button variant="outline" onClick={handlePreviousStep}>
                Geri
              </Button>
            )}
          </div>
          <Button onClick={handleNextStep}>
            {activeStep === 3 ? 'Kurulumu Tamamla' : 'İleri'}
            {activeStep < 3 && <ChevronsRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessSetup;
