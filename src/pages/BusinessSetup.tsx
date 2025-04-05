
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
  FormMessage,
  FormDescription 
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Store, ShoppingBag, Scissors, Coffee, Shirt, Gift, Utensils, BookOpen, CheckCircle, Palette, BadgeAlert, Pill, Cake } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

// İşletme türleri - bileşen türlerini düzgün belirterek
const businessTypes = [
  { id: 'retail', name: 'Perakende Mağaza', icon: <Store size={20} /> },
  { id: 'beauty', name: 'Güzellik / Kuaför', icon: <Scissors size={20} /> },
  { id: 'cafe', name: 'Kafe / Restoran', icon: <Coffee size={20} /> },
  { id: 'clothing', name: 'Giyim Mağazası', icon: <Shirt size={20} /> },
  { id: 'gift', name: 'Hediyelik Eşya', icon: <Gift size={20} /> },
  { id: 'food', name: 'Gıda Satışı', icon: <Utensils size={20} /> },
  { id: 'education', name: 'Eğitim / Kurs', icon: <BookOpen size={20} /> },
  { id: 'parfumery', name: 'Parfümeri / Kozmetik', icon: <Palette size={20} /> },
  { id: 'barber', name: 'Berber', icon: <Scissors size={20} /> },
  { id: 'pharmacy', name: 'Eczane', icon: <Pill size={20} /> },
  { id: 'bakery', name: 'Fırın / Pastane', icon: <Cake size={20} /> },
  { id: 'other', name: 'Diğer', icon: <ShoppingBag size={20} /> },
];

// Abonelik planları
const subscriptionPlans = [
  { 
    id: 'demo', 
    name: 'Demo (10 gün)',
    description: 'Sınırlı özelliklerle 10 gün ücretsiz deneme',
    price: 'Ücretsiz',
    features: ['1 Kullanıcı Hesabı', '50 müşteri kaydı', 'Temel WhatsApp sistemleri', 'Günlük 5 Hatırlatma Mesajı', 'Web Arayüzü (Mobil uyumlu)']
  },
  { 
    id: 'business', 
    name: 'İşletme Paketi', 
    description: 'Tam özellikli, ideal çözüm',
    price: 'Aylık 500 ₺',
    features: ['3 Kullanıcı hesabı', '1.000 müşteri kaydı', 'Gelişmiş WhatsApp özellikleri', 'Sınırsız hatırlatma mesajları', 'Mobil uygulama', 'Öncelikli destek (24 saat)']
  },
  { 
    id: 'premium', 
    name: 'Premium Paket', 
    description: 'Tüm özelliklere sınırsız erişim',
    price: 'Aylık 900 ₺',
    features: ['5 Kullanıcı hesabı', 'Sınırsız müşteri kaydı', 'Tam WhatsApp özellikleri', 'Gelişmiş analitik ve raporlama', 'Markalı mobil uygulama', 'VIP desteği (12 saat yanıt)']
  }
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
  subscriptionPlan: z.string({
    required_error: "Lütfen bir abonelik planı seçin",
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
      subscriptionPlan: "",
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

  // Tür seçimi için daha güvenli işleyici
  const handleBusinessTypeSelect = (value: string) => {
    form.setValue('businessType', value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center pb-2">
            <div className="flex justify-center mb-4">
              <img src="/logo.svg" alt="EsnafPanel Logo" className="h-20" />
            </div>
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
            
            <Separator className="my-4" />
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Abonelik Planı Seçin</h3>
            </div>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="subscriptionPlan"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-4"
                      >
                        {subscriptionPlans.map((plan) => (
                          <Card 
                            key={plan.id}
                            className={`border-2 cursor-pointer hover:bg-slate-50 ${field.value === plan.id ? 'border-primary' : 'border-gray-200'}`}
                            onClick={() => form.setValue('subscriptionPlan', plan.id)}
                          >
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <RadioGroupItem 
                                    value={plan.id} 
                                    id={plan.id} 
                                    className="sr-only" 
                                  />
                                  <Label htmlFor={plan.id} className="text-xl font-bold block mb-1">{plan.name}</Label>
                                  <p className="text-gray-500 text-sm mb-2">{plan.description}</p>
                                  <p className="font-bold text-lg text-primary">{plan.price}</p>
                                </div>
                                {field.value === plan.id && (
                                  <CheckCircle className="h-6 w-6 text-primary" />
                                )}
                              </div>
                              <ul className="mt-4 space-y-2">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-center text-sm">
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="submit" className="w-full bg-whatsapp hover:bg-whatsapp-dark">
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
