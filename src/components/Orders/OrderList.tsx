
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, MessageSquare, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrderForm from './OrderForm';

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  total: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
};

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };
  
  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsEditDialogOpen(true);
  };
  
  const handleMessage = (order: Order) => {
    toast({
      title: "Mesaj Gönderiliyor",
      description: `${order.customerName} adlı müşteriye WhatsApp üzerinden mesaj gönderiliyor...`,
    });
  };
  
  const handleOrderUpdate = (data: any) => {
    toast({
      title: "Sipariş Güncellendi",
      description: `${data.customerName} için sipariş bilgileri güncellendi.`,
    });
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sipariş No</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead className="hidden md:table-cell">Tarih</TableHead>
              <TableHead className="hidden md:table-cell">Toplam</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-muted-foreground">Henüz sipariş bulunmuyor.</p>
                  <p className="text-sm">Yeni bir sipariş eklemek için "Sipariş Ekle" butonuna tıklayın.</p>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.total}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status === 'completed'
                        ? 'Tamamlandı'
                        : order.status === 'processing'
                        ? 'İşleniyor'
                        : order.status === 'pending'
                        ? 'Bekliyor'
                        : 'İptal Edildi'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleView(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit(order)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleMessage(order)}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sipariş Detayları</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <Card>
              <CardHeader>
                <CardTitle>Sipariş #{selectedOrder.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Müşteri</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p>{selectedOrder.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tarih</p>
                    <p>{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tutar</p>
                    <p className="font-medium">{selectedOrder.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Durum</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        selectedOrder.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : selectedOrder.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : selectedOrder.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedOrder.status === 'completed'
                        ? 'Tamamlandı'
                        : selectedOrder.status === 'processing'
                        ? 'İşleniyor'
                        : selectedOrder.status === 'pending'
                        ? 'Bekliyor'
                        : 'İptal Edildi'}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => {
                      handleMessage(selectedOrder);
                      setIsViewDialogOpen(false);
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Müşteriye Mesaj Gönder
                  </Button>
                  <Button
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Düzenle
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Siparişi Düzenle</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <OrderForm
              initialData={{
                customerName: selectedOrder.customerName,
                customerPhone: selectedOrder.customerPhone,
                total: selectedOrder.total.replace(" ₺", ""),
                notes: "",
                status: selectedOrder.status
              }}
              onSubmit={handleOrderUpdate}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderList;
