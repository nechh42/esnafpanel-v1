import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Building } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

type PricingPlansProps = {
  businessData?: any;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ businessData }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const [selectedDuration, setSelectedDuration] = useState<string>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Form states for credit card
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  
  const handlePlanSelection = (planType: string) => {
    setSelectedPlan(planType);
    setShowPaymentDialog(true);
  };

  const handlePaymentConfirmation = () => {
    if (paymentMethod === "creditCard") {
      // Validate credit card form
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast({
          title: "Hata",
          description: "Lütfen tüm kart bilgilerini doldurun.",
          variant: "destructive",
        });
        return;
      }
      
      if (cardNumber.length < 16) {
        toast({
          title: "Hata",
          description: "Geçerli bir kart numarası girin.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Process payment
    toast({
      title: "Ödeme İşlemi",
      description: `${selectedPlan} planı için ${paymentMethod === "creditCard" ? "kredi kartı" : "havale"} ile ödeme işlemi başlatılıyor...`,
    });
    
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentDialog(false);
      setShowSuccessDialog(true);
    }, 2000);
  };
  
  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
    
    // Update business setup in localStorage with subscription info
    const businessSetupStr = localStorage.getItem('businessSetup');
    if (businessSetupStr) {
      const businessSetup = JSON.parse(businessSetupStr);
      
      let subscriptionPlanKey = '';
      if (selectedPlan === 'Başlangıç') {
        subscriptionPlanKey = 'starter';
      } else if (selectedPlan === 'İşletme') {
        subscriptionPlanKey = 'business';
      } else if (selectedPlan === 'Premium') {
        subscriptionPlanKey = 'premium';
      }
      
      // Update subscription details
      const updatedBusinessSetup = {
        ...businessSetup,
        subscriptionPlan: subscriptionPlanKey,
        subscriptionStatus: 'active',
        subscriptionStartDate: new Date().toISOString(),
        subscriptionDuration: selectedDuration,
        subscriptionEndDate: calculateEndDate(selectedDuration)
      };
      
      // Save updated business setup
      localStorage.setItem('businessSetup', JSON.stringify(updatedBusinessSetup));
      
      // Turn off demo mode
      localStorage.setItem('demoMode', 'false');
      
      // Trigger storage event for other components to detect
      window.dispatchEvent(new Event('storage'));
    }
    
    toast({
      title: "Ödeme Başarılı",
      description: `${selectedPlan} paketi aboneliğiniz başarıyla etkinleştirildi. Teşekkürler!`,
    });
    
    // Redirect to home page
    navigate('/');
  };
  
  // Calculate subscription end date based on duration
  const calculateEndDate = (duration) => {
    const now = new Date();
    let endDate = new Date(now);
    
    if (duration === 'monthly') {
      endDate.setMonth(now.getMonth() + 1);
    } else if (duration === 'quarterly') {
      endDate.setMonth(now.getMonth() + 3);
    } else if (duration === 'biannual') {
      endDate.setMonth(now.getMonth() + 6);
    }
    
    return endDate.toISOString();
  };

  const getSelectedPlanPrice = () => {
    if (selectedPlan === "Başlangıç") {
      return selectedDuration === "monthly" ? "250 ₺" : 
             selectedDuration === "quarterly" ? "675 ₺" : "1.200 ₺";
    } else if (selectedPlan === "İşletme") {
      return selectedDuration === "monthly" ? "500 ₺" : 
             selectedDuration === "quarterly" ? "1.350 ₺" : "2.400 ₺";
    } else {
      return selectedDuration === "monthly" ? "900 ₺" : 
             selectedDuration === "quarterly" ? "2.430 ₺" : "4.320 ₺";
    }
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

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Building className="h-5 w-5 mr-2" />
          İletişim Bilgileri
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Geliştirici Bilgileri</h4>
            <ul className="space-y-1 text-sm">
              <li><strong>Geliştirici:</strong> Bireysel Yazılım Geliştiricisi</li>
              <li><strong>E-posta:</strong> esnafpanel@gmail.com</li>
              <li><strong>Telefon:</strong> +90 555 123 4567</li>
              <li><strong>Web:</strong> www.esnafpanel.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Destek</h4>
            <ul className="space-y-1 text-sm">
              <li><strong>Destek E-posta:</strong> destek@esnafpanel.com</li>
              <li><strong>Telefon:</strong> +90 555 123 4567</li>
              <li><strong>Destek Saatleri:</strong> 09:00 - 18:00 (Pazartesi-Cuma)</li>
              <li><strong>Gizlilik Politikası:</strong> www.esnafpanel.com/gizlilik</li>
            </ul>
          </div>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ödeme Bilgileri</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="mb-2">Seçtiğiniz plan: <strong>{selectedPlan} Paketi</strong></p>
              <p className="mb-2">
                Abonelik süresi: <strong>
                  {selectedDuration === "monthly" ? "1 Aylık" : 
                   selectedDuration === "quarterly" ? "3 Aylık" : "6 Aylık"}
                </strong>
              </p>
              <p className="mb-2">
                Ödeme yöntemi: <strong>Kredi Kartı</strong>
              </p>
              <p className="font-bold">
                Toplam tutar: <span className="text-lg">{getSelectedPlanPrice()}</span>
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                <Input 
                  id="cardName" 
                  placeholder="Ad Soyad" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Kart Numarası</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456" 
                  maxLength={16}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                  <Input 
                    id="expiryDate" 
                    placeholder="AA/YY" 
                    maxLength={5}
                    value={expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length > 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                      }
                      setExpiryDate(value);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    placeholder="123" 
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                  />
                </div>
              </div>
            </div>
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
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ödeme Başarılı!</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <p className="text-center mb-4">
              {selectedPlan} paketi aboneliğiniz başarıyla oluşturuldu.
            </p>
            <p className="text-center text-sm text-gray-600 mb-6">
              Ödeme detayları ve faturanız kayıtlı e-posta adresinize gönderilecektir.
            </p>
            <div className="mt-4 border p-4 rounded-lg bg-blue-50">
              <h4 className="font-medium mb-2">Geliştirici Bilgileri</h4>
              <p className="text-sm mb-1"><strong>Geliştirici:</strong> Bireysel Yazılım Geliştiricisi</p>
              <p className="text-sm mb-1"><strong>E-posta:</strong> esnafpanel@gmail.com</p>
              <p className="text-sm mb-1"><strong>Telefon:</strong> +90 555 123 4567</p>
              <div className="mt-2 text-sm text-blue-600">
                <p>Ödemeleriniz güvenli bir şekilde işlenmektedir. Teşekkür ederiz!</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeSuccessDialog} className="w-full">
              Tamam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingPlans;
