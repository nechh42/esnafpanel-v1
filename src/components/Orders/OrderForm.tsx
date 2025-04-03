
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type OrderFormData = {
  customerName: string;
  customerPhone: string;
  total: string;
  notes: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
};

interface OrderFormProps {
  initialData?: OrderFormData;
  onSubmit: (data: OrderFormData) => void;
  onCancel?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  initialData = { 
    customerName: '', 
    customerPhone: '', 
    total: '', 
    notes: '', 
    status: 'pending' 
  }, 
  onSubmit, 
  onCancel 
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<OrderFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerPhone) {
      toast({
        title: "Hata",
        description: "Müşteri adı ve telefon numarası zorunludur.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.total) {
      toast({
        title: "Hata",
        description: "Toplam tutar zorunludur.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate order ID if it's a new order
      if (!initialData.customerName) {
        const now = new Date();
        const orderData = {
          ...formData,
          id: Math.random().toString(36).substring(2, 10).toUpperCase(),
          date: now.toLocaleDateString('tr-TR'),
        };
        onSubmit(orderData);
      } else {
        onSubmit(formData);
      }
      
      toast({
        title: "Başarılı",
        description: initialData.customerName ? "Sipariş güncellendi." : "Yeni sipariş oluşturuldu.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem sırasında bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData.customerName ? 'Siparişi Düzenle' : 'Yeni Sipariş Ekle'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Müşteri Adı</Label>
            <Input
              id="customerName"
              name="customerName"
              placeholder="Müşteri Adı"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone">Telefon</Label>
            <Input
              id="customerPhone"
              name="customerPhone"
              placeholder="+90 555 123 45 67"
              value={formData.customerPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="total">Toplam Tutar (₺)</Label>
            <Input
              id="total"
              name="total"
              type="text"
              placeholder="0.00"
              value={formData.total}
              onChange={(e) => {
                // Only allow numbers and one decimal point
                const value = e.target.value.replace(/[^\d.]/g, '');
                // Ensure only one decimal point
                const parts = value.split('.');
                const formatted = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
                
                setFormData(prev => ({ ...prev, total: formatted }));
              }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Durum</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sipariş durumu seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Bekliyor</SelectItem>
                <SelectItem value="processing">İşleniyor</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="cancelled">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notlar (İsteğe Bağlı)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Sipariş hakkında notlar..."
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              İptal
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Kaydediliyor...' : initialData.customerName ? 'Güncelle' : 'Sipariş Oluştur'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default OrderForm;
