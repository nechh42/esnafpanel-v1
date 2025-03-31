
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import OrderList, { Order } from '@/components/Orders/OrderList';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const mockOrders: Order[] = [
  {
    id: 'ORD123456',
    customerName: 'Ahmet Yılmaz',
    customerPhone: '+90 555 123 4567',
    date: '10 Haz 2024',
    total: '1,250 ₺',
    status: 'processing'
  },
  {
    id: 'ORD123457',
    customerName: 'Ayşe Demir',
    customerPhone: '+90 555 987 6543',
    date: '09 Haz 2024',
    total: '850 ₺',
    status: 'completed'
  },
  {
    id: 'ORD123458',
    customerName: 'Mehmet Kaya',
    customerPhone: '+90 555 456 7890',
    date: '08 Haz 2024',
    total: '2,340 ₺',
    status: 'pending'
  },
  {
    id: 'ORD123459',
    customerName: 'Zeynep Şahin',
    customerPhone: '+90 555 234 5678',
    date: '07 Haz 2024',
    total: '1,540 ₺',
    status: 'cancelled'
  },
  {
    id: 'ORD123460',
    customerName: 'Mustafa Öztürk',
    customerPhone: '+90 555 345 6789',
    date: '06 Haz 2024',
    total: '760 ₺',
    status: 'completed'
  },
  {
    id: 'ORD123461',
    customerName: 'Elif Yıldız',
    customerPhone: '+90 555 678 9012',
    date: '05 Haz 2024',
    total: '1,890 ₺',
    status: 'processing'
  },
  {
    id: 'ORD123462',
    customerName: 'Can Aydın',
    customerPhone: '+90 555 901 2345',
    date: '04 Haz 2024',
    total: '2,120 ₺',
    status: 'completed'
  }
];

const Orders = () => {
  const { toast } = useToast();
  
  const handleAddOrder = () => {
    toast({
      title: "Yakında Geliyor",
      description: "Sipariş ekleme özelliği yakında eklenecektir.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Siparişler</h1>
        <p className="text-gray-600">WhatsApp üzerinden gelen siparişleri yönetin.</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Sipariş ara..."
            className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">Filtrele</Button>
          <Button onClick={handleAddOrder} className="flex-1 md:flex-none bg-primary">Sipariş Ekle</Button>
        </div>
      </div>
      
      <OrderList orders={mockOrders} />
    </MainLayout>
  );
};

export default Orders;
