
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Store, ShoppingBag, Scissors, Coffee, Shirt, Gift, Utensils, BookOpen } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';

// İşletme türleri
const businessTypes = [
  { id: 'retail', name: 'Perakende Mağaza', icon: <Store /> },
  { id: 'beauty', name: 'Güzellik / Kuaför', icon: <Scissors /> },
  { id: 'cafe', name: 'Kafe / Restoran', icon: <Coffee /> },
  { id: 'clothing', name: 'Giyim Mağazası', icon: <Shirt /> },
  { id: 'gift', name: 'Hediyelik Eşya', icon: <Gift /> },
  { id: 'food', name: 'Gıda Satışı', icon: <Utensils /> },
  { id: 'education', name: 'Eğitim / Kurs', icon: <BookOpen /> },
  { id: 'other', name: 'Diğer', icon: <ShoppingBag /> },
];

// Form şeması
const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "İşletme adı en az 2 karakter olmalıdır",
  }),
  businessType: z.string({
    required_error: "Lütfen bir işletme türü seçin",
  }),
  whatsappNumber: z.string().min(10, {
    message: "Geçerli bir telefon numarası girin",
  }),
});

const BusinessSetup = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      whatsappNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Form verilerini localStorage'a kaydet
    localStorage.setItem('businessSetup', JSON.stringify(values));
    
    toast({
      title: "Kurulum tamamlandı",
      description: "İşletme bilgileriniz kaydedildi",
    });
    
    // Ana sayfaya yönlendir
    setOpen(false);
    navigate('/');
  }

  // Dialog kapatıldığında ana sayfaya yönlendir
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      navigate('/');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center pb-2">
            WhatsApp CRM Kurulumu
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İşletme Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="İşletmenizin adını girin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İşletme Türü</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="İşletme türünüzü seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem 
                          key={type.id} 
                          value={type.id}
                          className="flex items-center gap-2"
                        >
                          <div className="flex items-center gap-2">
                            {type.icon}
                            <span>{type.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Telefon Numarası</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+90 555 123 4567" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit" className="w-full">
                Kurulumu Tamamla
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessSetup;
