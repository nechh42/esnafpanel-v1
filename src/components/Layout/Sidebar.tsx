
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, MessageSquare, Calendar, Settings, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Sidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const showComingSoon = () => {
    toast({
      title: "Yakında Geliyor",
      description: "Bu özellik yakında eklenecektir.",
    });
  };
  
  const navItems = [
    { path: '/', icon: <User className="h-5 w-5" />, label: 'Müşteriler' },
    { path: '/messages', icon: <MessageSquare className="h-5 w-5" />, label: 'Mesajlar' },
    { path: '/orders', icon: <Calendar className="h-5 w-5" />, label: 'Siparişler' },
    { path: '/whatsapp-connect', icon: <Phone className="h-5 w-5" />, label: 'WhatsApp Bağlantısı' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen sticky top-0">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-whatsapp rounded-lg flex items-center justify-center">
            <MessageSquare className="text-white h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">EsnafPanel</h2>
            <p className="text-xs text-gray-500">İşletme Yönetimi</p>
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
          
          <li>
            <button
              onClick={showComingSoon}
              className="w-full flex items-center space-x-3 p-3 rounded-md transition-colors text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
              <span>Ayarlar</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <Link to="/whatsapp-connect">
          <button 
            className="flex items-center justify-center w-full p-2 bg-whatsapp text-white rounded-md hover:bg-whatsapp-dark transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            WhatsApp'a Bağlan
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
