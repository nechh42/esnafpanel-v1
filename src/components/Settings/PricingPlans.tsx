
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingPlans = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [language, setLanguage] = useState('tr');
  
  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Load selected plan from localStorage
    const businessSetupStr = localStorage.getItem('businessSetup');
    if (businessSetupStr) {
      const businessSetup = JSON.parse(businessSetupStr);
      if (businessSetup.subscriptionPlan) {
        setSelectedPlan(businessSetup.subscriptionPlan);
      }
    }
  }, []);

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    
    // Update businessSetup in localStorage
    const businessSetupStr = localStorage.getItem('businessSetup');
    if (businessSetupStr) {
      const businessSetup = JSON.parse(businessSetupStr);
      const updatedBusinessSetup = {
        ...businessSetup,
        subscriptionPlan: plan,
        subscriptionStatus: 'active',
        subscriptionStartDate: new Date().toISOString()
      };
      
      localStorage.setItem('businessSetup', JSON.stringify(updatedBusinessSetup));
      localStorage.setItem('demoMode', JSON.stringify(false));
      
      toast({
        title: language === 'tr' ? "Abonelik Planı Güncellendi" : "Subscription Plan Updated",
        description: language === 'tr' 
          ? `${getLocalizedPlanName(plan)} planına başarıyla abone oldunuz.`
          : `You have successfully subscribed to the ${plan} plan.`,
      });
    }
  };
  
  const getLocalizedPlanName = (plan: string) => {
    if (language === 'tr') {
      switch (plan) {
        case 'starter': return 'Başlangıç';
        case 'business': return 'İşletme';
        case 'premium': return 'Premium';
        default: return plan;
      }
    }
    return plan;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'tr' ? 'Abonelik Planı' : 'Subscription Plan'}</CardTitle>
          <CardDescription>
            {language === 'tr' 
              ? 'İşletmeniz için en uygun abonelik planını seçin'
              : 'Choose the most suitable subscription plan for your business'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-center">
            <Tabs 
              value={billingCycle} 
              onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">{language === 'tr' ? 'Aylık' : 'Monthly'}</TabsTrigger>
                <TabsTrigger value="yearly">{language === 'tr' ? 'Yıllık' : 'Yearly'}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Başlangıç Paketi */}
            <Card className={`border ${selectedPlan === 'starter' ? 'border-primary ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'tr' ? 'Başlangıç Paketi' : 'Starter Package'}
                </CardTitle>
                <CardDescription>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">115 ₺</span>
                    <span className="text-muted-foreground">/{language === 'tr' ? 'ay' : 'month'}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'tr' 
                    ? 'Küçük işletmeler için temel özellikler'
                    : 'Basic features for small businesses'}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'WhatsApp entegrasyonu' : 'WhatsApp integration'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Müşteri yönetimi' : 'Customer management'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Temel raporlar' : 'Basic reports'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? '500 mesaj/ay' : '500 messages/month'}
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={selectedPlan === 'starter' ? 'outline' : 'default'}
                  onClick={() => handleSelectPlan('starter')}
                >
                  {selectedPlan === 'starter' 
                    ? (language === 'tr' ? 'Seçildi' : 'Selected') 
                    : (language === 'tr' ? 'Planı Seç' : 'Select Plan')}
                </Button>
              </CardFooter>
            </Card>

            {/* İşletme Paketi */}
            <Card className={`border ${selectedPlan === 'business' ? 'border-primary ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <div className="bg-primary/10 text-primary text-xs rounded px-2 py-1 w-fit">
                  {language === 'tr' ? 'Popüler' : 'Popular'}
                </div>
                <CardTitle className="text-lg">
                  {language === 'tr' ? 'İşletme Paketi' : 'Business Package'}
                </CardTitle>
                <CardDescription>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">295 ₺</span>
                    <span className="text-muted-foreground">/{language === 'tr' ? 'ay' : 'month'}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'tr' 
                    ? 'Büyüyen işletmeler için gelişmiş özellikler'
                    : 'Advanced features for growing businesses'}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Tüm başlangıç özellikleri' : 'All starter features'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Instagram entegrasyonu' : 'Instagram integration'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Otomatik yanıtlar' : 'Automatic responses'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? '2500 mesaj/ay' : '2500 messages/month'}
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={selectedPlan === 'business' ? 'outline' : 'default'}
                  onClick={() => handleSelectPlan('business')}
                >
                  {selectedPlan === 'business' 
                    ? (language === 'tr' ? 'Seçildi' : 'Selected') 
                    : (language === 'tr' ? 'Planı Seç' : 'Select Plan')}
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Paket */}
            <Card className={`border ${selectedPlan === 'premium' ? 'border-primary ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'tr' ? 'Premium Paket' : 'Premium Package'}
                </CardTitle>
                <CardDescription>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">585 ₺</span>
                    <span className="text-muted-foreground">/{language === 'tr' ? 'ay' : 'month'}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'tr' 
                    ? 'Profesyonel işletmeler için tam kapsamlı çözüm'
                    : 'Comprehensive solution for professional businesses'}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Tüm işletme özellikleri' : 'All business features'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Çoklu kullanıcı erişimi' : 'Multi-user access'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Özelleştirilebilir raporlar' : 'Customizable reports'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    <span className="text-sm">
                      {language === 'tr' ? 'Sınırsız mesaj' : 'Unlimited messages'}
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={selectedPlan === 'premium' ? 'outline' : 'default'}
                  onClick={() => handleSelectPlan('premium')}
                >
                  {selectedPlan === 'premium' 
                    ? (language === 'tr' ? 'Seçildi' : 'Selected') 
                    : (language === 'tr' ? 'Planı Seç' : 'Select Plan')}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-6 p-4 border rounded-md bg-blue-50 border-blue-200">
            <div className="flex">
              <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">{language === 'tr' ? 'Geliştirici' : 'Developer'}</p>
                <p>NECHH</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingPlans;
