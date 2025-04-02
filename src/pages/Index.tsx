
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import RecentActivitiesList from '@/components/Dashboard/RecentActivitiesList';
import CustomerList from '@/components/Customers/CustomerList';
import BusinessTypeInfo from '@/components/Dashboard/BusinessTypeInfo';
import { User, MessageSquare, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type ActivityType = 'message' | 'order' | 'customer';

// Creating empty arrays instead of mock data
const recentActivities = [];

interface BusinessSetup {
  businessName: string;
  businessType: string;
  whatsappNumber: string;
}

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [businessSetup, setBusinessSetup] = useState<BusinessSetup | null>(null);
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    const savedSetup = localStorage.getItem('businessSetup');
    
    if (savedSetup) {
      setBusinessSetup(JSON.parse(savedSetup));
    } else {
      navigate('/setup');
    }
  }, [navigate]);
  
  const handleAddCustomer = () => {
    toast({
      title: "Yakında Geliyor",
      description: "Müşteri ekleme özelliği yakında eklenecektir.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {businessSetup ? `Hoş geldiniz, ${businessSetup.businessName} 👋` : 'Hoş geldiniz 👋'}
        </h1>
        <p className="text-gray-600">WhatsApp CRM sisteminizi yönetin.</p>
      </div>
      
      {businessSetup && (
        <div className="mb-6">
          <BusinessTypeInfo businessType={businessSetup.businessType} />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Toplam Müşteri" 
          value="0" 
          icon={<User className="h-5 w-5" />}
          trend={{ value: 0, isUp: false }}
        />
        <StatsCard 
          title="Bugünkü Mesajlar" 
          value="0" 
          icon={<MessageSquare className="h-5 w-5" />}
          trend={{ value: 0, isUp: false }}
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
          trend={{ value: 0, isUp: false }}
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
          <RecentActivitiesList activities={recentActivities} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
