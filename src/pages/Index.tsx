
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import RecentActivitiesList from '@/components/Dashboard/RecentActivitiesList';
import CustomerList from '@/components/Customers/CustomerList';
import BusinessTypeInfo from '@/components/Dashboard/BusinessTypeInfo';
import { User, MessageSquare, Calendar, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CustomerForm, { CustomerFormData } from '@/components/Customers/CustomerForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Customer } from '@/components/Customers/Customer';
import { Activity } from '@/components/Dashboard/Activity';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface BusinessSetup {
  businessName: string;
  businessType: string;
  whatsappNumber: string;
  subscriptionPlan?: string;
  subscriptionStatus?: string;
}

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [businessSetup, setBusinessSetup] = useState<BusinessSetup | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [showDemoExpiryAlert, setShowDemoExpiryAlert] = useState(false);
  const [isDemoExpired, setIsDemoExpired] = useState(false);
  const [demoExpiryDays, setDemoExpiryDays] = useState(10);
  const [isDemoMode, setIsDemoMode] = useState(true);
  
  useEffect(() => {
    const savedSetup = localStorage.getItem('businessSetup');
    
    if (savedSetup) {
      setBusinessSetup(JSON.parse(savedSetup));
    } else {
      navigate('/setup');
    }
    
    // Load demo mode status
    const demoModeData = localStorage.getItem('demoMode');
    if (demoModeData !== null) {
      setIsDemoMode(JSON.parse(demoModeData));
    }
    
    // Calculate demo expiry
    calculateDemoTimeRemaining();
  }, [navigate]);
  
  // Calculate remaining demo time
  const calculateDemoTimeRemaining = () => {
    const demoStartDate = localStorage.getItem('demoStartDate');
    
    if (!demoStartDate) {
      // If no demo start date exists, set it now
      const currentDate = new Date().toISOString();
      localStorage.setItem('demoStartDate', currentDate);
      setDemoExpiryDays(10);
      setIsDemoExpired(false);
      return;
    }
    
    const startDate = new Date(demoStartDate);
    const currentDate = new Date();
    const diffDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Demo expires after 10 days
    if (diffDays >= 10) {
      setDemoExpiryDays(0);
      setIsDemoExpired(true);
      
      // Check if user has an active subscription
      const businessSetupStr = localStorage.getItem('businessSetup');
      if (businessSetupStr) {
        const businessSetup = JSON.parse(businessSetupStr);
        const hasSubscription = businessSetup.subscriptionPlan && 
                              businessSetup.subscriptionPlan !== 'none' &&
                              businessSetup.subscriptionStatus === 'active';
        
        // If in demo mode with no active subscription, show the alert
        if (isDemoMode && !hasSubscription) {
          setShowDemoExpiryAlert(true);
        }
      }
    } else {
      setDemoExpiryDays(10 - diffDays);
      setIsDemoExpired(false);
      
      // If demo will expire in 1 day and user is in demo mode, show a warning toast
      if (diffDays === 9 && isDemoMode) {
        toast({
          title: "Demo Süresi Bitiyor",
          description: "Demo süreniz 1 gün içinde dolacak. Uygulamayı kullanmaya devam etmek için abonelik planı seçmelisiniz.",
          variant: "warning",
        });
      }
    }
  };
  
  useEffect(() => {
    // Check subscription and demo status whenever isDemoMode changes
    if (isDemoMode && isDemoExpired) {
      const businessSetupStr = localStorage.getItem('businessSetup');
      if (businessSetupStr) {
        const businessSetup = JSON.parse(businessSetupStr);
        const hasSubscription = businessSetup.subscriptionPlan && 
                              businessSetup.subscriptionPlan !== 'none' &&
                              businessSetup.subscriptionStatus === 'active';
        
        if (!hasSubscription) {
          setShowDemoExpiryAlert(true);
        }
      }
    }
  }, [isDemoMode, isDemoExpired]);
  
  const handleAddCustomer = () => {
    setIsAddCustomerOpen(true);
  };
  
  const handleCustomerSubmit = (data: CustomerFormData) => {
    const newCustomer: Customer = {
      id: Math.random().toString(36).substring(2, 10),
      name: data.name,
      phone: data.phone,
      email: data.email || "",
      lastContact: new Date().toISOString().split('T')[0],
      status: "active"
    };
    
    setCustomers([newCustomer, ...customers]);
    setIsAddCustomerOpen(false);
    
    toast({
      title: "Müşteri Eklendi",
      description: `${data.name} başarıyla müşteri listenize eklendi.`,
    });
  };

  const handleGoToSubscription = () => {
    setShowDemoExpiryAlert(false);
    navigate('/subscription-required');
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {businessSetup ? `Hoş geldiniz, ${businessSetup.businessName} 👋` : 'Hoş geldiniz 👋'}
        </h1>
        <p className="text-gray-600">WhatsApp CRM sisteminizi yönetin.</p>
      </div>
      
      {isDemoMode && isDemoExpired && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="font-medium text-red-800">Demo Süreniz Doldu!</h3>
          </div>
          <p className="mt-1 text-red-700 text-sm">
            Uygulamayı kullanmaya devam etmek için lütfen bir abonelik planı seçin.
          </p>
          <Button 
            variant="default"
            className="mt-3 bg-red-600 hover:bg-red-700 text-white"
            onClick={() => navigate('/settings?tab=subscription')}
          >
            Abonelik Planlarını Görüntüle
          </Button>
        </div>
      )}
      
      {businessSetup && (
        <div className="mb-6">
          <BusinessTypeInfo businessType={businessSetup.businessType} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Toplam Müşteri" 
          value={customers.length.toString()}
          icon={<User className="h-5 w-5" />}
          trend={{ value: 0, isUp: true }}
        />
        <StatsCard 
          title="Bugünkü Mesajlar" 
          value="0" 
          icon={<MessageSquare className="h-5 w-5" />}
          trend={{ value: 0, isUp: true }}
        />
        <StatsCard 
          title="Açık Siparişler" 
          value="0" 
          icon={<Calendar className="h-5 w-5" />}
          trend={{ value: 0, isUp: false }}
        />
        <StatsCard 
          title="WhatsApp Aramaları" 
          value="0" 
          icon={<Phone className="h-5 w-5" />}
          trend={{ value: 0, isUp: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Müşteriler</h2>
            <Button onClick={handleAddCustomer} className="bg-primary">
              Müşteri Ekle
            </Button>
          </div>
          <CustomerList customers={customers} />
        </div>
        
        <div>
          <RecentActivitiesList activities={[]} />
        </div>
      </div>
      
      {/* Add Customer Dialog */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Yeni Müşteri Ekle</DialogTitle>
          </DialogHeader>
          <CustomerForm onSubmit={handleCustomerSubmit} onCancel={() => setIsAddCustomerOpen(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Demo Expired Alert Dialog */}
      <AlertDialog open={showDemoExpiryAlert} onOpenChange={setShowDemoExpiryAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Demo Süreniz Doldu</AlertDialogTitle>
            <AlertDialogDescription>
              EsnafPanel'in demo süresi (10 gün) dolmuştur. Uygulamayı kullanmaya devam etmek için
              lütfen bir abonelik planı seçin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleGoToSubscription}>
              Abonelik Planlarını Görüntüle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Index;
