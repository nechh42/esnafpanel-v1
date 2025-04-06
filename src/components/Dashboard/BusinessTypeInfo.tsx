
import React from 'react';
import { 
  Store, 
  ShoppingBag, 
  Scissors, 
  Coffee, 
  Shirt, 
  Gift, 
  Utensils, 
  BookOpen,
  Palette,
  Pill,
  Cake,
  BadgeAlert
} from 'lucide-react';

export type BusinessType = 'retail' | 'beauty' | 'cafe' | 'restaurant' | 'clothing' | 
  'gift' | 'food' | 'education' | 'parfumery' | 'pharmacy' | 'barber' | 
  'bakery' | 'other' | 'service' | 'health' | string;

// İşletme türleri ve özellikleri
const businessTypeDetails: Record<BusinessType, {
  icon: React.ReactNode;
  name: string;
  description: string;
  fields: string[];
}> = {
  retail: {
    icon: <Store className="h-8 w-8" />,
    name: 'Perakende Mağaza',
    description: 'Ürün stoku, müşteri sipariş takibi ve satış raporları.',
    fields: ['Ürün Kataloğu', 'Stok Durumu', 'Fiyat Listesi']
  },
  beauty: {
    icon: <Scissors className="h-8 w-8" />,
    name: 'Güzellik / Kuaför',
    description: 'Randevu takibi, müşteri tercihleri ve sadakat programı.',
    fields: ['Randevular', 'Müşteri Tercihleri', 'Hizmet Listesi']
  },
  cafe: {
    icon: <Coffee className="h-8 w-8" />,
    name: 'Kafe / Restoran',
    description: 'Masa rezervasyonları, menü ve özel siparişler.',
    fields: ['Menü', 'Rezervasyonlar', 'Paket Servis']
  },
  restaurant: {
    icon: <Utensils className="h-8 w-8" />,
    name: 'Restoran', 
    description: 'Masa rezervasyonları, menü ve özel siparişler.',
    fields: ['Menü', 'Rezervasyonlar', 'Sipariş Takibi']
  },
  clothing: {
    icon: <Shirt className="h-8 w-8" />,
    name: 'Giyim Mağazası',
    description: 'Beden, renk, koleksiyon ve stok takibi.',
    fields: ['Koleksiyonlar', 'Beden/Renk', 'Kampanyalar']
  },
  gift: {
    icon: <Gift className="h-8 w-8" />,
    name: 'Hediyelik Eşya',
    description: 'Özel gün hatırlatmaları, kişiselleştirme seçenekleri.',
    fields: ['Özel Gün Takibi', 'Kişiselleştirme', 'Hediye Paketleri']
  },
  food: {
    icon: <Utensils className="h-8 w-8" />,
    name: 'Gıda Satışı',
    description: 'Ürün tazeliği, paketleme ve teslimat seçenekleri.',
    fields: ['Ürün Kataloğu', 'Teslimat Seçenekleri', 'Özel Siparişler']
  },
  education: {
    icon: <BookOpen className="h-8 w-8" />,
    name: 'Eğitim / Kurs',
    description: 'Kurs programları, öğrenci takibi ve ödeme planları.',
    fields: ['Kurs Programı', 'Öğrenci Kayıtları', 'Eğitim Materyalleri']
  },
  parfumery: {
    icon: <Palette className="h-8 w-8" />,
    name: 'Parfümeri / Kozmetik',
    description: 'Ürün çeşitleri, müşteri tercihleri ve stok takibi.',
    fields: ['Ürün Kataloğu', 'Müşteri Tercihleri', 'Kampanyalar']
  },
  pharmacy: {
    icon: <Pill className="h-8 w-8" />,
    name: 'Eczane',
    description: 'İlaç stoku, reçete takibi ve müşteri danışmanlığı.',
    fields: ['İlaç Stoku', 'Reçete Takibi', 'Sağlık Danışmanlığı']
  },
  barber: {
    icon: <Scissors className="h-8 w-8" />,
    name: 'Berber',
    description: 'Randevu takibi, müşteri tercihleri ve hizmet listesi.',
    fields: ['Randevular', 'Müşteri Tercihleri', 'Hizmet Listesi']
  },
  bakery: {
    icon: <Cake className="h-8 w-8" />,
    name: 'Fırın / Pastane',
    description: 'Ürün çeşitleri, özel siparişler ve teslimat hizmeti.',
    fields: ['Ürün Kataloğu', 'Özel Siparişler', 'Teslimat Hizmetleri']
  },
  other: {
    icon: <ShoppingBag className="h-8 w-8" />,
    name: 'Diğer',
    description: 'Genel müşteri takibi ve sipariş yönetimi.',
    fields: ['Müşteri Bilgileri', 'Siparişler', 'Ödemeler']
  },
  service: {
    icon: <BadgeAlert className="h-8 w-8" />,
    name: 'Hizmet Sektörü',
    description: 'Randevu takibi, hizmet listesi ve müşteri yönetimi.',
    fields: ['Hizmet Listesi', 'Randevular', 'Müşteri Kayıtları']
  },
  health: {
    icon: <Pill className="h-8 w-8" />,
    name: 'Sağlık Hizmetleri',
    description: 'Hasta randevuları, tıbbi kayıtlar ve takip.',
    fields: ['Hasta Kayıtları', 'Randevular', 'Tıbbi Geçmiş']
  }
};

interface BusinessTypeInfoProps {
  businessType?: BusinessType | null | undefined;
}

const BusinessTypeInfo: React.FC<BusinessTypeInfoProps> = ({ businessType }) => {
  // Eğer işletme türü belirlenmemişse veya geçersizse "other" olarak varsay
  const details = React.useMemo(() => {
    // businessType'in tanımlı bir tür olup olmadığını kontrol et
    if (!businessType || typeof businessType !== 'string' || businessType.trim() === '') {
      console.log(`Geçersiz işletme türü: ${businessType}, varsayılan olarak 'other' kullanılıyor`);
      return businessTypeDetails.other;
    }
    
    // Eğer businessType bizim listemizdeyse o türü, değilse other'ı kullan
    return businessTypeDetails[businessType as BusinessType] || businessTypeDetails.other;
  }, [businessType]);

  return (
    <div className="rounded-lg border p-4 shadow-sm bg-card">
      <div className="flex items-center gap-3 mb-2">
        {details.icon}
        <h3 className="text-lg font-medium">{details.name}</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-3">{details.description}</p>
      <div className="space-y-1.5">
        <h4 className="text-sm font-medium">Özelleştirilmiş Alanlar:</h4>
        <ul className="text-sm pl-5 list-disc">
          {details.fields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BusinessTypeInfo;
