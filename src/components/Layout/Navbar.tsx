
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, User, Calendar, Settings, Menu, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', icon: <User className="h-4 w-4" />, label: 'Müşteriler' },
    { path: '/messages', icon: <MessageSquare className="h-4 w-4" />, label: 'Mesajlar' },
    { path: '/orders', icon: <Calendar className="h-4 w-4" />, label: 'Siparişler' },
    { path: '/whatsapp-connect', icon: <Phone className="h-4 w-4" />, label: 'WhatsApp' },
    { path: '/settings', icon: <Settings className="h-4 w-4" />, label: 'Ayarlar' },
  ];

  return (
    <nav className="bg-white shadow-sm py-3 px-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="EsnafPanel Logo" className="w-8 h-8" />
          <h1 className="text-xl font-semibold">EsnafPanel</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="flex items-center space-x-1 text-gray-600 hover:text-primary"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="md:hidden">
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
                    key={item.path}
                    to={item.path} 
                    className="flex items-center space-x-3 text-gray-600 py-2 hover:text-primary"
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
