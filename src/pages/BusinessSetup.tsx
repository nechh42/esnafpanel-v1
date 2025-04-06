
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BusinessSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState('business');
  const [language, setLanguage] = useState('tr');
  
  // Form states
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    type: '',
    phone: '',
    email: '',
    address: '',
    logo: null as File | null,
  });
  
  const [ownerInfo, setOwnerInfo] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
  });
  
  const [whatsappInfo, setWhatsappInfo] = useState({
    whatsappNumber: '',
    autoReplies: true,
    notificationSettings: 'all',
  });
  
  // Get saved language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleOwnerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwnerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleWhatsappInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWhatsappInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBusinessTypeChange = (value: string) => {
    setBusinessInfo(prev => ({ ...prev, type: value }));
  };
  
  const nextStep = () => {
    if (currentStep === 'business') {
      if (!businessInfo.name || !businessInfo.type) {
        toast({
          title: language === 'tr' ? "Eksik Bilgi" : "Missing Information",
          description: language === 'tr' ? "İşletme adı ve türü zorunludur." : "Business name and type are required.",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep('owner');
    } else if (currentStep === 'owner') {
      if (!ownerInfo.ownerName) {
        toast({
          title: language === 'tr' ? "Eksik Bilgi" : "Missing Information",
          description: language === 'tr' ? "İşletme sahibinin adı zorunludur." : "Owner name is required.",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep('whatsapp');
    }
  };
  
  const previousStep = () => {
    if (currentStep === 'owner') {
      setCurrentStep('business');
    } else if (currentStep === 'whatsapp') {
      setCurrentStep('owner');
    }
  };
  
  const completeSetup = () => {
    // Combine all data and save to localStorage
    const businessSetup = {
      ...businessInfo,
      ...ownerInfo,
      ...whatsappInfo,
      setupDate: new Date().toISOString(),
      subscriptionPlan: 'none',
      subscriptionStatus: 'inactive'
    };
    
    localStorage.setItem('businessSetup', JSON.stringify(businessSetup));
    
    // Show success toast
    toast({
      title: language === 'tr' ? "Kurulum Tamamlandı" : "Setup Completed",
      description: language === 'tr' ? "EsnafPanel hesabınız başarıyla kuruldu." : "Your EsnafPanel account has been successfully set up.",
    });
    
    // Redirect to dashboard
    navigate('/');
  };
  
  const businessTypes = [
    { value: "retail", label: language === 'tr' ? "Perakende Mağaza" : "Retail Store" },
    { value: "restaurant", label: language === 'tr' ? "Restoran/Kafe" : "Restaurant/Cafe" },
    { value: "beauty", label: language === 'tr' ? "Güzellik Salonu/Kuaför" : "Beauty Salon/Hairdresser" },
    { value: "health", label: language === 'tr' ? "Sağlık Hizmetleri" : "Health Services" },
    { value: "education", label: language === 'tr' ? "Eğitim/Kurs" : "Education/Training" },
    { value: "service", label: language === 'tr' ? "Hizmet Sektörü" : "Service Sector" },
    { value: "other", label: language === 'tr' ? "Diğer" : "Other" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex justify-center">
          <img src="/logo.svg" alt="EsnafPanel" className="h-12 w-12" />
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {language === 'tr' ? 'EsnafPanel Kurulumuna Hoşgeldiniz' : 'Welcome to EsnafPanel Setup'}
            </CardTitle>
            <CardDescription>
              {language === 'tr' ? 'İşletmenizi yönetmeye başlamak için aşağıdaki bilgileri doldurun.' :
              'Fill in the information below to start managing your business.'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={currentStep} onValueChange={setCurrentStep}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="business">
                  {language === 'tr' ? '1. İşletme Bilgileri' : '1. Business Info'}
                </TabsTrigger>
                <TabsTrigger value="owner">
                  {language === 'tr' ? '2. Kullanıcı Bilgileri' : '2. Owner Info'}
                </TabsTrigger>
                <TabsTrigger value="whatsapp">
                  {language === 'tr' ? '3. WhatsApp Ayarları' : '3. WhatsApp Settings'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="business" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === 'tr' ? 'İşletme Adı' : 'Business Name'}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={language === 'tr' ? "İşletmenizin adını girin" : "Enter your business name"}
                    value={businessInfo.name}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">
                    {language === 'tr' ? 'İşletme Türü' : 'Business Type'}
                  </Label>
                  <Select onValueChange={handleBusinessTypeChange} value={businessInfo.type}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder={language === 'tr' ? "İşletme türünü seçin" : "Select business type"} />
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
                
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === 'tr' ? 'İşletme Telefonu' : 'Business Phone'}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder={language === 'tr' ? "İşletme telefon numarası" : "Business phone number"}
                    value={businessInfo.phone}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'tr' ? 'İşletme E-posta' : 'Business Email'}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={language === 'tr' ? "İşletme e-posta adresi" : "Business email address"}
                    value={businessInfo.email}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">
                    {language === 'tr' ? 'İşletme Adresi' : 'Business Address'}
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder={language === 'tr' ? "İşletme adresi" : "Business address"}
                    value={businessInfo.address}
                    onChange={handleBusinessInfoChange}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="owner" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">
                    {language === 'tr' ? 'Ad Soyad' : 'Full Name'}
                  </Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    placeholder={language === 'tr' ? "İşletme sahibinin adı soyadı" : "Business owner's full name"}
                    value={ownerInfo.ownerName}
                    onChange={handleOwnerInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">
                    {language === 'tr' ? 'Telefon' : 'Phone'}
                  </Label>
                  <Input
                    id="ownerPhone"
                    name="ownerPhone"
                    placeholder={language === 'tr' ? "Telefon numarası" : "Phone number"}
                    value={ownerInfo.ownerPhone}
                    onChange={handleOwnerInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">
                    {language === 'tr' ? 'E-posta' : 'Email'}
                  </Label>
                  <Input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    placeholder={language === 'tr' ? "E-posta adresi" : "Email address"}
                    value={ownerInfo.ownerEmail}
                    onChange={handleOwnerInfoChange}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="whatsapp" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">
                    {language === 'tr' ? 'WhatsApp Numarası' : 'WhatsApp Number'}
                  </Label>
                  <Input
                    id="whatsappNumber"
                    name="whatsappNumber"
                    placeholder={language === 'tr' ? "WhatsApp telefon numarası" : "WhatsApp phone number"}
                    value={whatsappInfo.whatsappNumber}
                    onChange={handleWhatsappInfoChange}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'tr' 
                      ? "WhatsApp numaranızı ülke koduyla birlikte girin (örn. +90505XXXXXXX)" 
                      : "Enter your WhatsApp number with country code (e.g. +90505XXXXXXX)"}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                  <h4 className="text-sm font-medium text-green-800 mb-2">
                    {language === 'tr' ? 'WhatsApp Bağlantısı Hakkında' : 'About WhatsApp Connection'}
                  </h4>
                  <p className="text-xs text-green-700">
                    {language === 'tr' 
                      ? "Müşterilerinizle WhatsApp üzerinden iletişim kurmak için işletmenizin WhatsApp telefonunu bağlamak gereklidir. WhatsApp'ta kullandığınız telefon numarasını girin ve kurulum tamamlandıktan sonra 'WhatsApp Bağlantısı' sayfasından devam edin."
                      : "To communicate with your customers via WhatsApp, it is necessary to connect your business WhatsApp phone. Enter the phone number you use on WhatsApp and continue from the 'WhatsApp Connection' page after the setup is completed."}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {currentStep !== 'business' ? (
              <Button variant="outline" onClick={previousStep}>
                {language === 'tr' ? 'Geri' : 'Back'}
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep !== 'whatsapp' ? (
              <Button onClick={nextStep}>
                {language === 'tr' ? 'İlerle' : 'Next'}
              </Button>
            ) : (
              <Button onClick={completeSetup}>
                {language === 'tr' ? 'Kurulumu Tamamla' : 'Complete Setup'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BusinessSetup;
