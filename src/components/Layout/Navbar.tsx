
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Phone, User, Calendar, Settings, Menu, Globe, Home, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Navbar = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('tr');
  
  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);
  
  const navItems = [
    { path: '/', icon: <Home className="h-4 w-4" />, label: language === 'tr' ? 'Ana Sayfa' : (language === 'en' ? 'Home' : (language === 'ru' ? 'Главная' : 'الرئيسية')) },
    { path: '/', icon: <User className="h-4 w-4" />, label: language === 'tr' ? 'Müşteriler' : (language === 'en' ? 'Customers' : (language === 'ru' ? 'Клиенты' : 'العملاء')) },
    { path: '/messages', icon: <MessageSquare className="h-4 w-4" />, label: language === 'tr' ? 'Mesajlar' : (language === 'en' ? 'Messages' : (language === 'ru' ? 'Сообщения' : 'الرسائل')) },
    { path: '/orders', icon: <Calendar className="h-4 w-4" />, label: language === 'tr' ? 'Siparişler' : (language === 'en' ? 'Orders' : (language === 'ru' ? 'Заказы' : 'الطلبات')) },
    { path: '/whatsapp-connect', icon: <Phone className="h-4 w-4" />, label: language === 'tr' ? 'WhatsApp' : 'WhatsApp' },
    { path: '/settings?tab=subscription', icon: <CreditCard className="h-4 w-4" />, label: language === 'tr' ? 'Abonelik' : (language === 'en' ? 'Subscription' : (language === 'ru' ? 'Подписка' : 'الاشتراك')) },
    { path: '/settings', icon: <Settings className="h-4 w-4" />, label: language === 'tr' ? 'Ayarlar' : (language === 'en' ? 'Settings' : (language === 'ru' ? 'Настройки' : 'الإعدادات')) },
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem('appLanguage', value);
    
    // Dispatch custom event to notify app of language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: value } }));
    
    let message = '';
    let title = '';
    
    switch(value) {
      case 'tr':
        title = "Dil değiştirildi";
        message = "Uygulama dili güncellendi";
        break;
      case 'en':
        title = "Language changed";
        message = "Application language updated";
        break;
      case 'ru':
        title = "Язык изменен";
        message = "Язык приложения обновлен";
        break;
      case 'ar':
        title = "تم تغيير اللغة";
        message = "تم تحديث لغة التطبيق";
        break;
      default:
        title = "Dil değiştirildi";
        message = "Uygulama dili güncellendi";
    }
    
    toast({
      title: title,
      description: message,
    });
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm py-3 px-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2" onClick={goToHome} style={{ cursor: 'pointer' }}>
          <img src="/logo.svg" alt="EsnafPanel Logo" className="w-8 h-8" />
          <h1 className="text-xl font-semibold">EsnafPanel</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.path + item.label}
              to={item.path} 
              className={`flex items-center space-x-1 ${location.pathname === item.path || (item.path.includes('?tab=') && location.pathname + location.search === item.path) ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="ml-4">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <div className="flex items-center">
                  <Globe className="mr-1 h-3 w-3" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">Türkçe</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="md:hidden flex items-center">
          <div className="mr-2">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[80px] h-8 text-xs">
                <div className="flex items-center">
                  <Globe className="mr-1 h-3 w-3" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">Türkçe</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="text-gray-600 hover:text-primary">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] px-0 py-4">
              <div className="flex flex-col space-y-4 px-6">
                {navItems.map((item) => (
                  <Link 
                    key={item.path + item.label}
                    to={item.path} 
                    className={`flex items-center space-x-3 py-2 ${location.pathname === item.path || (item.path.includes('?tab=') && location.pathname + location.search === item.path) ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
