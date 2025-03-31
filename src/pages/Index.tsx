
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import RecentActivitiesList from '@/components/Dashboard/RecentActivitiesList';
import CustomerList from '@/components/Customers/CustomerList';
import { User, MessageSquare, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type ActivityType = 'message' | 'order' | 'customer';

const mockCustomers = [
  { 
    id: '1', 
    name: 'Ahmet Yılmaz', 
    phone: '+90 555 123 4567', 
    email: 'ahmet@example.com', 
    lastContact: 'Bugün, 14:30', 
    status: 'active' as const 
  },
  { 
    id: '2', 
    name: 'Ayşe Demir', 
    phone: '+90 555 987 6543', 
    email: 'ayse@example.com', 
    lastContact: 'Dün, 09:15', 
    status: 'new' as const 
  },
  { 
    id: '3', 
    name: 'Mehmet Kaya', 
    phone: '+90 555 456 7890', 
    email: 'mehmet@example.com', 
    lastContact: '2 gün önce', 
    status: 'inactive' as const 
  },
  { 
    id: '4', 
    name: 'Zeynep Şahin', 
    phone: '+90 555 234 5678', 
    email: 'zeynep@example.com', 
    lastContact: 'Bugün, 11:20', 
    status: 'active' as const 
  },
  { 
    id: '5', 
    name: 'Mustafa Öztürk', 
    phone: '+90 555 345 6789', 
    email: 'mustafa@example.com', 
    lastContact: '3 gün önce', 
    status: 'active' as const 
  }
];

const recentActivities = [
  {
    id: '1',
    type: 'message' as ActivityType,
    title: 'Yeni mesaj - Ahmet Yılmaz',
    description: 'Ürün teslimatı hakkında bilgi istiyor.',
    time: '30 dk önce'
  },
  {
    id: '2',
    type: 'order' as ActivityType,
    title: 'Yeni sipariş - #12345',
    description: 'Ayşe Demir 3 ürün sipariş etti.',
    time: '2 saat önce'
  },
  {
    id: '3',
    type: 'customer' as ActivityType,
    title: 'Yeni müşteri - Zeynep Şahin',
    description: 'WhatsApp üzerinden kaydoldu.',
    time: 'Bugün, 09:45'
  },
  {
    id: '4',
    type: 'message' as ActivityType,
    title: 'Yeni mesaj - Mehmet Kaya',
    description: 'Fiyat listesi hakkında soru soruyor.',
    time: 'Dün, 18:30'
  },
  {
    id: '5',
    type: 'order' as ActivityType,
    title: 'Sipariş durumu değişti - #12340',
    description: 'Sipariş durumu "Tamamlandı" olarak güncellendi.',
    time: 'Dün, 14:20'
  }
];

const Index = () => {
  const { toast } = useToast();
  
  const handleAddCustomer = () => {
    toast({
      title: "Yakında Geliyor",
      description: "Müşteri ekleme özelliği yakında eklenecektir.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hoş geldiniz 👋</h1>
        <p className="text-gray-600">WhatsApp CRM sisteminizi yönetin.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Toplam Müşteri" 
          value="124" 
          icon={<User className="h-5 w-5" />}
          trend={{ value: 12, isUp: true }}
        />
        <StatsCard 
          title="Bugünkü Mesajlar" 
          value="38" 
          icon={<MessageSquare className="h-5 w-5" />}
          trend={{ value: 8, isUp: true }}
        />
        <StatsCard 
          title="Açık Siparişler" 
          value="17" 
          icon={<Calendar className="h-5 w-5" />}
          trend={{ value: 5, isUp: false }}
        />
        <StatsCard 
          title="WhatsApp Aramaları" 
          value="9" 
          icon={<Phone className="h-5 w-5" />}
          trend={{ value: 15, isUp: true }}
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
          <CustomerList customers={mockCustomers} />
        </div>
        
        <div>
          <RecentActivitiesList activities={recentActivities} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
