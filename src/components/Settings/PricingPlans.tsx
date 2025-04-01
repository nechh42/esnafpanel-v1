
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, XIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  isCurrentPlan?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Başlangıç',
    price: 99,
    billingPeriod: 'monthly',
    description: 'Küçük işletmeler için temel özellikler',
    features: [
      { name: '1 Kullanıcı Hesabı', included: true },
      { name: '300 Müşteri Kaydı', included: true },
      { name: 'Temel WhatsApp Entegrasyonu', included: true },
      { name: 'Web Arayüzü (Mobil Uyumlu)', included: true },
      { name: 'Müşteri Takibi', included: true },
      { name: 'Temel Raporlama', included: true },
      { name: 'E-posta Desteği', included: true },
      { name: 'Gelişmiş WhatsApp Özellikleri', included: false },
      { name: 'Mobil Uygulama', included: false },
      { name: 'Öncelikli Destek', included: false },
    ],
  },
  {
    id: 'business',
    name: 'İşletme',
    price: 249,
    billingPeriod: 'monthly',
    description: 'Büyüyen işletmeler için ideal çözüm',
    isPopular: true,
    isCurrentPlan: true,
    features: [
      { name: '3 Kullanıcı Hesabı', included: true },
      { name: '1.000 Müşteri Kaydı', included: true },
      { name: 'Gelişmiş WhatsApp Entegrasyonu', included: true },
      { name: 'Web Arayüzü (Mobil Uyumlu)', included: true },
      { name: 'Müşteri Takibi', included: true },
      { name: 'Detaylı Raporlama ve Analitik', included: true },
      { name: 'E-posta ve Telefon Desteği', included: true },
      { name: 'Otomatik Yanıtlar', included: true },
      { name: 'Mobil Uygulama', included: true },
      { name: 'Öncelikli Destek', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 499,
    billingPeriod: 'monthly',
    description: 'Profesyonel işletmeler için tam donanım',
    features: [
      { name: '5 Kullanıcı Hesabı', included: true },
      { name: 'Sınırsız Müşteri Kaydı', included: true },
      { name: 'Tam WhatsApp Entegrasyonu', included: true },
      { name: 'Web Arayüzü (Mobil Uyumlu)', included: true },
      { name: 'Müşteri Takibi', included: true },
      { name: 'Gelişmiş Raporlama ve Analitik', included: true },
      { name: '7/24 Öncelikli Destek', included: true },
      { name: 'Otomatik Yanıtlar ve Senaryolar', included: true },
      { name: 'Markalı Mobil Uygulama', included: true },
      { name: 'API Erişimi', included: true },
    ],
  },
];

const PricingPlans = () => {
  const { toast } = useToast();

  const handleChangePlan = (planId: string) => {
    toast({
      title: "Plan Değişikliği",
      description: "Abonelik planınız en kısa sürede güncellenecektir.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Abonelik Planınız</h3>
        <p className="text-muted-foreground">
          Güncel abonelik planınızı görüntüleyin ve değiştirin
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <div className="bg-muted p-1 rounded-lg">
          <Button variant="ghost" className="bg-background">Aylık</Button>
          <Button variant="ghost">Yıllık</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${plan.isPopular ? 'border-primary shadow-md' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="mt-1">{plan.description}</CardDescription>
                </div>
                {plan.isPopular && (
                  <Badge variant="secondary" className="ml-2">Popüler</Badge>
                )}
              </div>
              <div className="mt-2">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price.toLocaleString('tr-TR')} ₺</span>
                  <span className="text-muted-foreground ml-1">/ ay</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Yıllık ödemede %15 indirim
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    {feature.included ? (
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XIcon className="h-5 w-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={feature.included ? '' : 'text-muted-foreground'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.isCurrentPlan ? (
                <Button disabled className="w-full">Mevcut Plan</Button>
              ) : (
                <Button onClick={() => handleChangePlan(plan.id)} className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
                  {plan.isPopular ? 'Yükselt' : 'Değiştir'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Fatura Bilgileri</CardTitle>
          <CardDescription>
            Ödeme ve fatura bilgilerinizi yönetin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <div className="flex justify-between mb-1">
              <div className="font-medium">İşletme Paketi</div>
              <div className="font-medium">249 ₺ / ay</div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>Yenileme Tarihi</div>
              <div>{new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR')}</div>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex justify-between mb-2">
              <div className="font-medium">Ödeme Yöntemi</div>
              <Button variant="ghost" size="sm" className="h-8">Değiştir</Button>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-6 bg-gray-200 rounded mr-3 flex items-center justify-center text-xs font-medium">
                VISA
              </div>
              <div>
                <div className="text-sm">Visa ile biten kart •••• 4589</div>
                <div className="text-xs text-muted-foreground">Son Kullanma: 05/26</div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex justify-between mb-2">
              <div className="font-medium">Fatura Adresi</div>
              <Button variant="ghost" size="sm" className="h-8">Değiştir</Button>
            </div>
            <div className="text-sm">
              <div>Esnaf İşletmesi Ltd. Şti.</div>
              <div>Vergi No: 1234567890</div>
              <div>Atatürk Cad. No:123</div>
              <div>34000 İstanbul, Türkiye</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Fatura Geçmişi</Button>
          <Button>Fatura Ayarlarını Kaydet</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingPlans;
