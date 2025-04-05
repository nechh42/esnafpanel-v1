
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import OrderList, { Order } from '@/components/Orders/OrderList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrderForm from '@/components/Orders/OrderForm';
import { useToast } from '@/hooks/use-toast';

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  const handleAddOrder = () => {
    setIsAddOrderOpen(true);
  };

  const handleOrderSubmit = (data: any) => {
    const newOrder: Order = {
      id: `ORD${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      date: new Date().toLocaleDateString('tr-TR'),
      total: `${data.total} ₺`,
      status: data.status
    };

    setOrders([newOrder, ...orders]);
    setIsAddOrderOpen(false);

    toast({
      title: "Sipariş Eklendi",
      description: `${data.customerName} için yeni sipariş oluşturuldu.`,
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Siparişler</h1>
        <p className="text-gray-600">Müşteri siparişlerinizi yönetin.</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-800 py-1 px-3 rounded-lg text-sm font-medium">
            Tamamlanan: {orders.filter(order => order.status === 'completed').length}
          </div>
          <div className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-lg text-sm font-medium">
            Bekleyen: {orders.filter(order => order.status === 'pending').length}
          </div>
          <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-lg text-sm font-medium">
            İşlemde: {orders.filter(order => order.status === 'processing').length}
          </div>
        </div>
        
        <Button onClick={handleAddOrder}>
          Sipariş Ekle
        </Button>
      </div>

      <OrderList orders={orders} />

      {/* Add Order Dialog */}
      <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Yeni Sipariş Ekle</DialogTitle>
          </DialogHeader>
          <OrderForm onSubmit={handleOrderSubmit} onCancel={() => setIsAddOrderOpen(false)} />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Orders;
