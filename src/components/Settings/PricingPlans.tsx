
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard } from 'lucide-react';

type PricingPlansProps = {
  businessData: any;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ businessData }) => {
  const currentPlan = businessData?.subscriptionPlan || 'trial';
  
  const plans = [
    {
      id: 'starter',
      name: 'Başlangıç Paketi',
      price: '250 ₺',
      priceQuarterly: '675 ₺',
      priceSemiAnnual: '1.200 ₺',
      description: 'Küçük işletmeler için temel özellikler',
      features: [
        '1 Kullanıcı Hesabı',
        '300 müşteri kaydı',
        'Temel WhatsApp sistemleri',
        'Zapier: 3 otomatik iş listesi',
        '1 adet sektörde özel şablon',
        'Günlük 20 Hatırlatma Mesajı',
        'Web Arayüzü (Mobil uyumlu)',
        'E-posta desteği'
      ],
      ctaText: currentPlan === 'starter' ? 'Mevcut Plan' : 'Pakete Geç',
      disabled: currentPlan === 'starter'
    },
    {
      id: 'business',
      name: 'İşletme Paketi',
      price: '500 ₺',
      priceQuarterly: '1.350 ₺',
      priceSemiAnnual: '2.400 ₺',
      description: 'Büyüyen işletmeler için gelişmiş özellikler',
      features: [
        '3 Kullanıcı hesabı',
        '1.000 müşteri kaydı',
        'Gelişmiş WhatsApp İndirme (Otomatik yanıtlar)',
        'Zapier: 10 otomatik iş verileri',
        '3 adet sektörde özel şablon',
        'Sınırsız hatırlatma mesajları',
        'Detaylı raporlama ve analitik',
        'Mobil uygulama',
        'Öncelikli destek (24 saat yanıt)'
      ],
      ctaText: currentPlan === 'business' ? 'Mevcut Plan' : 'Pakete Geç',
      disabled: currentPlan === 'business',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Paket',
      price: '900 ₺',
      priceQuarterly: '2.430 ₺',
      priceSemiAnnual: '4.320 ₺',
      description: 'Büyük işletmeler için tüm özellikler',
      features: [
        '5 Kullanıcı hesabı',
        'Sınırsız müşteri kaydı',
        'Tam WhatsApp listesi (Chatbot, otomatik kampanyalar)',
        'Zapier: Sınırsız otomatik iş verileri',
        'Sınırsız sektöre özel programlar',
        'Sınırsız hatırlatma ve otomatik kampanyalar',
        'Gelişmiş analitik ve tahminleme',
        'Markalı mobil uygulama',
        'VIP desteği (12 saat yanıt) + Telefon desteği',
        '3 saat kurulum ve eğitim',
        'Diğer yazılımlarla entegrasyon (Muhasebe, CRM vs.)'
      ],
      ctaText: currentPlan === 'premium' ? 'Mevcut Plan' : 'Pakete Geç',
      disabled: currentPlan === 'premium'
    }
  ];

  // State for billing period
  const [billingPeriod, setBillingPeriod] = React.useState('monthly');

  const handlePlanSelect = (planId: string) => {
    // In a real app, this would navigate to a payment page or open a payment modal
    console.log(`Selected plan: ${planId}, billing period: ${billingPeriod}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Abonelik Planları</CardTitle>
          <CardDescription>
            İşletmenize uygun planı seçin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full border p-1 mb-4">
              <Button 
                variant={billingPeriod === 'monthly' ? 'default' : 'ghost'} 
                size="sm" 
                className="rounded-full"
                onClick={() => setBillingPeriod('monthly')}
              >
                Aylık
              </Button>
              <Button 
                variant={billingPeriod === 'quarterly' ? 'default' : 'ghost'} 
                size="sm" 
                className="rounded-full"
                onClick={() => setBillingPeriod('quarterly')}
              >
                3 Aylık (%10 İndirim)
              </Button>
              <Button 
                variant={billingPeriod === 'semiannual' ? 'default' : 'ghost'} 
                size="sm" 
                className="rounded-full"
                onClick={() => setBillingPeriod('semiannual')}
              >
                6 Aylık (%20 İndirim)
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative overflow-hidden ${plan.popular ? 'border-primary shadow-md' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <Badge className="rounded-tl-none rounded-br-none">En Popüler</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-3xl font-bold">
                        {billingPeriod === 'monthly' && plan.price}
                        {billingPeriod === 'quarterly' && plan.priceQuarterly}
                        {billingPeriod === 'semiannual' && plan.priceSemiAnnual}
                      </span>
                      <span className="text-muted-foreground"> / {billingPeriod === 'monthly' ? 'ay' : billingPeriod === 'quarterly' ? '3 ay' : '6 ay'}</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                      disabled={plan.disabled}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {plan.ctaText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Mevcut Abonelik</h3>
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">{currentPlan === 'trial' ? 'Deneme Sürümü' : 
                    currentPlan === 'starter' ? 'Başlangıç Paketi' : 
                    currentPlan === 'business' ? 'İşletme Paketi' : 'Premium Paket'}</p>
                  <p className="text-sm text-muted-foreground">
                    Fatura kesim tarihi: {new Date().setDate(new Date().getDate() + 14).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Fatura Bilgileri
                </Button>
              </div>
              {currentPlan === 'trial' && (
                <div className="bg-yellow-50 text-yellow-800 p-3 rounded">
                  <p className="text-sm">Deneme süreniz 14 gün sonra doluyor. Hizmetlerimizi kullanmaya devam etmek için bir paket seçin.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingPlans;
