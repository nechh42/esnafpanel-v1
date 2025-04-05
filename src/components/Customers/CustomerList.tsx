
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, MoreVertical } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'new';
};

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
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
            <TableHead>Müşteri Adı</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead className="hidden md:table-cell">E-posta</TableHead>
            <TableHead className="hidden md:table-cell">Son İletişim</TableHead>
            <TableHead className="hidden md:table-cell">Durum</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <p className="text-muted-foreground">Henüz müşteri bulunmuyor.</p>
                <p className="text-sm">Yeni bir müşteri eklemek için "Müşteri Ekle" butonuna tıklayın.</p>
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.lastContact}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : customer.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {customer.status === 'active'
                      ? 'Aktif'
                      : customer.status === 'new'
                      ? 'Yeni'
                      : 'Pasif'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={handleAction}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleAction}>
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleAction}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerList;
