
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
import CustomerForm, { CustomerFormData } from '@/components/Customers/CustomerForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Customer } from '@/components/Customers/Customer';
import { Activity } from '@/components/Dashboard/Activity';

interface BusinessSetup {
  businessName: string;
  businessType: string;
  whatsappNumber: string;
}

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [businessSetup, setBusinessSetup] = useState<BusinessSetup | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  
  useEffect(() => {
    const savedSetup = localStorage.getItem('businessSetup');
    
    if (savedSetup) {
      setBusinessSetup(JSON.parse(savedSetup));
    } else {
      navigate('/setup');
    }
  }, [navigate]);
  
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
    </MainLayout>
  );
};

export default Index;
