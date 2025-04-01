
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, MessageSquare, Calendar, Settings, Phone, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: <User className="h-5 w-5" />, label: 'Müşteriler' },
    { path: '/messages', icon: <MessageSquare className="h-5 w-5" />, label: 'Mesajlar' },
    { path: '/orders', icon: <Calendar className="h-5 w-5" />, label: 'Siparişler' },
    { path: '/whatsapp-connect', icon: <Phone className="h-5 w-5" />, label: 'WhatsApp Bağlantısı' },
    { path: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Ayarlar' },
  ];

  // Get the businessSetup from localStorage
  const businessSetupStr = localStorage.getItem('businessSetup');
  const businessSetup = businessSetupStr ? JSON.parse(businessSetupStr) : null;
  
  // Abonelik bilgisine göre hangi metni göstereceğiz
  let subscriptionText = 'Demo Mod';
  let subscriptionClass = 'bg-yellow-100 text-yellow-800';
  
  if (businessSetup?.subscriptionPlan) {
    if (businessSetup.subscriptionPlan === 'premium') {
      subscriptionText = 'Premium Paket';
      subscriptionClass = 'bg-green-100 text-green-800';
    } else if (businessSetup.subscriptionPlan === 'business') {
      subscriptionText = 'İşletme Paketi';
      subscriptionClass = 'bg-blue-100 text-blue-800';
    } else {
      subscriptionText = 'Başlangıç Paketi';
    }
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen sticky top-0">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="EsnafPanel Logo" className="w-10 h-10" />
          <div>
            <h2 className="font-bold text-lg">EsnafPanel</h2>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${subscriptionClass}`}>
                {subscriptionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <Link to="/settings?tab=subscription">
          <Button 
            variant="outline"
            className="flex items-center justify-center w-full p-2 mb-2"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Abonelik Planları
          </Button>
        </Link>
        
        <Link to="/whatsapp-connect">
          <Button 
            className="flex items-center justify-center w-full p-2 bg-whatsapp text-white rounded-md hover:bg-whatsapp-dark transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            WhatsApp'a Bağlan
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
