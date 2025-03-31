
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  
  const handleAction = () => {
    toast({
      title: "Yakında Geliyor",
      description: "Bu özellik yakında eklenecektir.",
    });
  };

  return (
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
          {orders.map((order) => (
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
                  <Button variant="outline" size="icon" onClick={handleAction}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleAction}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
