
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { AlarmClock, CreditCard, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import PricingPlans from '@/components/Settings/PricingPlans';

const SubscriptionRequired = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user already has a subscription
    const businessSetupStr = localStorage.getItem('businessSetup');
    if (businessSetupStr) {
      const businessSetup = JSON.parse(businessSetupStr);
      const hasSubscription = businessSetup.subscriptionPlan && 
                             businessSetup.subscriptionPlan !== 'none' &&
                             businessSetup.subscriptionStatus === 'active';
      
      // If user already has an active subscription, redirect to home
      if (hasSubscription) {
        navigate('/');
      }
    }
  }, [navigate]);
  
  const handleSelectPlan = () => {
    navigate('/settings?tab=subscription');
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card className="mb-8">
          <CardHeader className="bg-amber-50">
            <div className="flex items-center">
              <AlarmClock className="h-6 w-6 text-amber-500 mr-2" />
              <CardTitle>Demo Süreniz Doldu</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Uygulama Süresi Doldu</h2>
              <p className="text-gray-600 mb-4">
                EsnafPanel'in demo süresi (10 gün) dolmuştur. Uygulamayı kullanmaya devam etmek için
                lütfen bir abonelik planı seçin.
              </p>
              <Button 
                onClick={handleSelectPlan}
                className="bg-primary flex items-center mx-auto"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Abonelik Planı Seç
              </Button>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Neden Abonelik Planı Seçmelisiniz?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Sürekli Erişim</h4>
                    <p className="text-sm text-gray-600">Uygulamaya kesintisiz olarak erişim sağlayın</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Tüm Özellikler</h4>
                    <p className="text-sm text-gray-600">Tüm özelliklere tam erişim</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Teknik Destek</h4>
                    <p className="text-sm text-gray-600">Öncelikli teknik destek ve yardım</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-bold mb-6">Abonelik Planları</h2>
        <PricingPlans />
      </div>
    </MainLayout>
  );
};

export default SubscriptionRequired;
