
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Banknote } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Add the type definition for PricingPlansProps
type PricingPlansProps = {
  businessData?: any;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ businessData }) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const [selectedDuration, setSelectedDuration] = useState<string>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  const handlePlanSelection = (planType: string) => {
    setSelectedPlan(planType);
    setShowPaymentDialog(true);
  };

  const handlePaymentConfirmation = () => {
    toast({
      title: "Ödeme İşlemi",
      description: `${selectedPlan} planı için ${paymentMethod === "creditCard" ? "kredi kartı" : "havale"} ile ödeme işlemi başlatılıyor...`,
    });
    
    // Normally this would redirect to a payment gateway or process the payment
    // This is just a simulation for demonstration purposes
    setTimeout(() => {
      toast({
        title: "Ödeme Başarılı",
        description: "Ödeme işleminiz başarıyla tamamlandı. Teşekkürler!",
      });
      setShowPaymentDialog(false);
    }, 2000);
  };

  const getPriceWithDiscount = (basePrice: number, months: number) => {
    if (months === 3) return (basePrice * 3 * 0.9).toFixed(0); // 10% discount
    if (months === 6) return (basePrice * 6 * 0.8).toFixed(0); // 20% discount
    return basePrice.toString();
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Ödeme Yöntemi Seçin</h3>
        <RadioGroup 
          defaultValue={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="creditCard" id="creditCard" />
            <Label htmlFor="creditCard" className="flex items-center cursor-pointer">
              <CreditCard className="h-5 w-5 mr-2" />
              <span>Kredi Kartı</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-md">
            <RadioGroupItem value="bankTransfer" id="bankTransfer" />
            <Label htmlFor="bankTransfer" className="flex items-center cursor-pointer">
              <Banknote className="h-5 w-5 mr-2" />
              <span>Banka Havalesi</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Abonelik Süresi</h3>
        <RadioGroup 
          defaultValue={selectedDuration} 
          onValueChange={setSelectedDuration}
          className="flex flex-col md:flex-row gap-3"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-md flex-1">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="flex items-center cursor-pointer">
              <span>1 Aylık</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-md flex-1">
            <RadioGroupItem value="quarterly" id="quarterly" />
            <Label htmlFor="quarterly" className="flex items-center cursor-pointer">
              <span>3 Aylık</span>
              <Badge variant="secondary" className="ml-2">%10 indirim</Badge>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-4 rounded-md flex-1">
            <RadioGroupItem value="biannual" id="biannual" />
            <Label htmlFor="biannual" className="flex items-center cursor-pointer">
              <span>6 Aylık</span>
              <Badge variant="secondary" className="ml-2">%20 indirim</Badge>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 hover:border-primary transition-all">
          <CardHeader>
            <CardTitle>Başlangıç Paketi</CardTitle>
            <CardDescription>Mikro işletmeler ve bireysel girişimciler için</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-2xl font-bold">
                {selectedDuration === "monthly" && "250 ₺/ay"}
                {selectedDuration === "quarterly" && "675 ₺"}
                {selectedDuration === "biannual" && "1.200 ₺"}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedDuration === "quarterly" && "3 aylık ödeme, %10 indirimli"}
                {selectedDuration === "biannual" && "6 aylık ödeme, %20 indirimli"}
              </div>
            </div>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                1 Kullanıcı Hesabı
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                300 müşteri hesabı
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Temel WhatsApp Sistemleri
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Zapier: 3 otomatik iş sayısı
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                1 adet özel bildirim
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Günlük 20 Hatırlatma Mesajı
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Temel Web Arayüzü (Mobil uyumlu)
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                E-posta Desteği
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handlePlanSelection("Başlangıç")}>
              Paketi Seç
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-primary shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>İşletme Paketi</CardTitle>
              <Badge>Popüler</Badge>
            </div>
            <CardDescription>Küçük ve orta işletmeler için</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-2xl font-bold">
                {selectedDuration === "monthly" && "500 ₺/ay"}
                {selectedDuration === "quarterly" && "1.350 ₺"}
                {selectedDuration === "biannual" && "2.400 ₺"}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedDuration === "quarterly" && "3 aylık ödeme, %10 indirimli"}
                {selectedDuration === "biannual" && "6 aylık ödeme, %20 indirimli"}
              </div>
            </div>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                3 Kullanıcı hesabı
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                1.000 müşteri hesabı
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                WhatsApp Otomatik yanıtlar
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Zapier: 10 otomatik iş
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                3 adet özel bildirim
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Detaylı raporlama ve Analitik
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Mobil uygulama
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Öncelikli destek (24 saat yanıt)
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handlePlanSelection("İşletme")}>
              Paketi Seç
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 hover:border-primary transition-all">
          <CardHeader>
            <CardTitle>Premium Paket</CardTitle>
            <CardDescription>Büyük işletmeler ve markalar için</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-2xl font-bold">
                {selectedDuration === "monthly" && "900 ₺/ay"}
                {selectedDuration === "quarterly" && "2.430 ₺"}
                {selectedDuration === "biannual" && "4.320 ₺"}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedDuration === "quarterly" && "3 aylık ödeme, %10 indirimli"}
                {selectedDuration === "biannual" && "6 aylık ödeme, %20 indirimli"}
              </div>
            </div>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                5 Kullanıcı hesabı
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Sınırsız müşteri kaydı
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Tam WhatsApp desteği (Chatbot, otomatik kampanyalar)
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Zapier: Sınırsız otomatik kampanyalar
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Gelişmiş Analitik ve tahminleme
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Markalı mobil uygulama
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                VIP desteği (12 saat yanıt) + Telefon desteği
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                3 saat kurulum ve eğitim
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Diğer yazılımlarla entegrasyon (Muhasebe, CRM vs.)
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handlePlanSelection("Premium")}>
              Paketi Seç
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Ödeme Esnekliği</h3>
        <ul className="grid md:grid-cols-2 gap-2">
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            TL ödemesi
          </li>
        </ul>
      </div>

      <div className="mt-6 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Lansman Özel Kampanyası (İlk 3 Ay)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md">
            <Badge className="mb-2" variant="secondary">Kampanya</Badge>
            <h4 className="font-medium">Tüm paketlerde %25 indirim</h4>
            <p className="text-sm text-gray-600">6 aylık alımlarda ek %10 (toplam %30)</p>
          </div>
          <div className="bg-white p-4 rounded-md">
            <Badge className="mb-2" variant="secondary">Ücretsiz</Badge>
            <h4 className="font-medium">Kurulum ve veri aktarımı</h4>
            <p className="text-sm text-gray-600">1 yıllık ücretsiz e-posta desteği</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Sektörel Paketler (Ek Ücretli)</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Berber/Kuaför Paketi</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-none space-y-1 text-sm">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Randevu sistemi
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Hizmet kaydı
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Personel performans yönetimi
                </li>
              </ul>
              <div className="mt-4 text-primary font-bold">Ek Ücret: +100 ₺/ay</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Kafe/Restoran Paketi</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-none space-y-1 text-sm">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Masa/bölüm yönetimi
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Menü yönetimi
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Sipariş takibi
                </li>
              </ul>
              <div className="mt-4 text-primary font-bold">Ek Ücret: +150 ₺/ay</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Serbest Çalışan Paketi</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-none space-y-1 text-sm">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Proje/dosya takibi
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Fatura ve tahsilat sistemi
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Sözleşme yönetimi
                </li>
              </ul>
              <div className="mt-4 text-primary font-bold">Ek Ücret: +120 ₺/ay</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Kozmetik/Bakım Paketi</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="list-none space-y-1 text-sm">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Ürün stok takibi
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Müşteri bakım kaydı
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-2 text-green-500" />
                  Bakım geçmişi
                </li>
              </ul>
              <div className="mt-4 text-primary font-bold">Ek Ücret: +130 ₺/ay</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment confirmation dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ödeme Onayı</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Seçtiğiniz plan: <strong>{selectedPlan} Paketi</strong></p>
            <p className="mb-4">
              Abonelik süresi: <strong>
                {selectedDuration === "monthly" ? "1 Aylık" : 
                 selectedDuration === "quarterly" ? "3 Aylık" : "6 Aylık"}
              </strong>
            </p>
            <p className="mb-4">
              Ödeme yöntemi: <strong>
                {paymentMethod === "creditCard" ? "Kredi Kartı" : "Banka Havalesi"}
              </strong>
            </p>
            <p className="font-bold text-lg">
              Toplam tutar: {
                selectedPlan === "Başlangıç" ? 
                  (selectedDuration === "monthly" ? "250 ₺" : 
                   selectedDuration === "quarterly" ? "675 ₺" : "1.200 ₺") :
                selectedPlan === "İşletme" ?
                  (selectedDuration === "monthly" ? "500 ₺" : 
                   selectedDuration === "quarterly" ? "1.350 ₺" : "2.400 ₺") :
                  (selectedDuration === "monthly" ? "900 ₺" : 
                   selectedDuration === "quarterly" ? "2.430 ₺" : "4.320 ₺")
              }
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              İptal
            </Button>
            <Button onClick={handlePaymentConfirmation}>
              Ödemeyi Tamamla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingPlans;
