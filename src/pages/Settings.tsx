
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import MainLayout from '@/components/Layout/MainLayout';
import { Globe, CreditCard, Bell, Shield, Languages, BellRing, Phone, User, Building, Instagram } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PricingPlans from '@/components/Settings/PricingPlans';
import ProfileSettings from '@/components/Settings/ProfileSettings';
import NotificationSettings from '@/components/Settings/NotificationSettings';
import SecuritySettings from '@/components/Settings/SecuritySettings';
import LanguageSettings from '@/components/Settings/LanguageSettings';
import WhatsAppSettings from '@/components/Settings/WhatsAppSettings';
import BusinessSettings from '@/components/Settings/BusinessSettings';
import InstagramSettings from '@/components/Settings/InstagramSettings';

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  const { toast } = useToast();
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get business data from localStorage
    const businessSetupStr = localStorage.getItem('businessSetup');
    if (businessSetupStr) {
      setBusinessData(JSON.parse(businessSetupStr));
    }
    setLoading(false);
    
    // We'll also fetch business data from Supabase in a real implementation
    // This is just a placeholder for now
    const fetchBusinessData = async () => {
      try {
        // In a real implementation, this would be:
        // const { data, error } = await supabase
        //   .from('businesses')
        //   .select('*')
        //   .eq('id', businessId)
        //   .single();
      } catch (error) {
        console.error('Error fetching business data:', error);
        toast({
          title: 'Hata',
          description: 'İşletme verilerini alırken bir hata oluştu.',
          variant: 'destructive',
        });
      }
    };
    
    // Comment out for now since we're using localStorage
    // fetchBusinessData();
  }, []);

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden md:inline">İşletme</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Abonelik</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Bildirimler</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Güvenlik</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">Dil</span>
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              <span className="hidden md:inline">Instagram</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileSettings businessData={businessData} />
          </TabsContent>
          
          <TabsContent value="business">
            <BusinessSettings businessData={businessData} />
          </TabsContent>
          
          <TabsContent value="subscription">
            <PricingPlans businessData={businessData} />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="language">
            <LanguageSettings />
          </TabsContent>
          
          <TabsContent value="whatsapp">
            <WhatsAppSettings />
          </TabsContent>

          <TabsContent value="instagram">
            <InstagramSettings businessData={businessData} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
