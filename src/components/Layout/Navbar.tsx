
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, User, Calendar, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { toast } = useToast();
  
  const showComingSoon = () => {
    toast({
      title: "Yakında Geliyor",
      description: "Bu özellik yakında eklenecektir.",
    });
  };

  return (
    <nav className="bg-white shadow-sm py-3 px-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-whatsapp rounded-md flex items-center justify-center">
            <MessageSquare className="text-white h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold">WhatsApp CRM</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
            <User className="h-4 w-4" />
            <span>Müşteriler</span>
          </Link>
          <Link to="/messages" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
            <MessageSquare className="h-4 w-4" />
            <span>Mesajlar</span>
          </Link>
          <Link to="/orders" className="flex items-center space-x-1 text-gray-600 hover:text-primary">
            <Calendar className="h-4 w-4" />
            <span>Siparişler</span>
          </Link>
          <button onClick={showComingSoon} className="flex items-center space-x-1 text-gray-600 hover:text-primary">
            <Settings className="h-4 w-4" />
            <span>Ayarlar</span>
          </button>
        </div>
        
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
