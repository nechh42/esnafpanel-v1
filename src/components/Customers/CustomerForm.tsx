
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

export type CustomerFormData = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

interface CustomerFormProps {
  initialData?: CustomerFormData;
  onSubmit: (data: CustomerFormData) => void;
  onCancel?: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ 
  initialData = { name: '', phone: '', email: '', notes: '' }, 
  onSubmit, 
  onCancel 
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CustomerFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Hata",
        description: "Müşteri adı zorunludur.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.phone) {
      toast({
        title: "Hata",
        description: "Telefon numarası zorunludur.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onSubmit(formData);
      toast({
        title: "Başarılı",
        description: initialData.name ? "Müşteri güncellendi." : "Müşteri eklendi.",
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
        <CardTitle>{initialData.name ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ad Soyad"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+90 555 123 45 67"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-posta (İsteğe Bağlı)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notlar (İsteğe Bağlı)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Müşteri hakkında notlar..."
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
            {isSubmitting ? 'Kaydediliyor...' : initialData.name ? 'Güncelle' : 'Ekle'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CustomerForm;
