
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, MessageSquare, Calendar, Settings, Phone, CreditCard, AlertTriangle, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [demoExpiryDays, setDemoExpiryDays] = useState(10);
  const [demoExpired, setDemoExpired] = useState(false);
  const [language, setLanguage] = useState('tr');
  
  // Listen for language changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);
  
  const navItems = [
    { path: '/', icon: <Home className="h-5 w-5" />, label: language === 'tr' ? 'Ana Sayfa' : 'Home' },
    { path: '/', icon: <User className="h-5 w-5" />, label: language === 'tr' ? 'Müşteriler' : 'Customers' },
    { path: '/messages', icon: <MessageSquare className="h-5 w-5" />, label: language === 'tr' ? 'Mesajlar' : 'Messages' },
    { path: '/orders', icon: <Calendar className="h-5 w-5" />, label: language === 'tr' ? 'Siparişler' : 'Orders' },
    { path: '/whatsapp-connect', icon: <Phone className="h-5 w-5" />, label: language === 'tr' ? 'WhatsApp Bağlantısı' : 'WhatsApp Connection' },
    { path: '/settings?tab=subscription', icon: <CreditCard className="h-5 w-5" />, label: language === 'tr' ? 'Abonelik' : 'Subscription' },
    { path: '/settings', icon: <Settings className="h-5 w-5" />, label: language === 'tr' ? 'Ayarlar' : 'Settings' },
  ];

  // Get the businessSetup from localStorage
  const businessSetupStr = localStorage.getItem('businessSetup');
  const businessSetup = businessSetupStr ? JSON.parse(businessSetupStr) : null;
  
  // Abonelik bilgisine göre hangi metni göstereceğiz
  let subscriptionText = language === 'tr' ? `Demo Mod (${demoExpiryDays} Gün)` : `Demo Mode (${demoExpiryDays} Days)`;
  let subscriptionClass = 'bg-yellow-100 text-yellow-800';
  
  if (businessSetup?.subscriptionPlan && !isDemoMode) {
    if (businessSetup.subscriptionPlan === 'premium') {
      subscriptionText = language === 'tr' ? 'Premium Paket' : 'Premium Plan';
      subscriptionClass = 'bg-green-100 text-green-800';
    } else if (businessSetup.subscriptionPlan === 'business') {
      subscriptionText = language === 'tr' ? 'İşletme Paketi' : 'Business Plan';
      subscriptionClass = 'bg-blue-100 text-blue-800';
    } else if (businessSetup.subscriptionPlan === 'starter') {
      subscriptionText = language === 'tr' ? 'Başlangıç Paketi' : 'Starter Plan';
      subscriptionClass = 'bg-blue-100 text-blue-800';
    } else {
      subscriptionText = language === 'tr' ? `Demo (${demoExpiryDays} Gün)` : `Demo (${demoExpiryDays} Days)`;
    }
  }
  
  // If demo has expired, update text
  if (demoExpired && isDemoMode) {
    subscriptionText = language === 'tr' ? 'Demo Süresi Doldu' : 'Demo Expired';
    subscriptionClass = 'bg-red-100 text-red-800';
  }

  // Load demo mode state from localStorage
  useEffect(() => {
    const savedDemoMode = localStorage.getItem('demoMode');
    if (savedDemoMode !== null) {
      setIsDemoMode(JSON.parse(savedDemoMode));
    }
    
    // Calculate days remaining in demo
    calculateDemoTimeRemaining();
    
    // Set interval to recalculate every day
    const interval = setInterval(calculateDemoTimeRemaining, 1000 * 60 * 60); // Check every hour
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate remaining demo time
  const calculateDemoTimeRemaining = () => {
    const demoStartDate = localStorage.getItem('demoStartDate');
    
    if (!demoStartDate) {
      // If no demo start date exists, set it now
      const currentDate = new Date().toISOString();
      localStorage.setItem('demoStartDate', currentDate);
      setDemoExpiryDays(10);
      setDemoExpired(false);
      return;
    }
    
    const startDate = new Date(demoStartDate);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Demo expires after 10 days
    if (diffDays >= 10) {
      setDemoExpiryDays(0);
      setDemoExpired(true);
      localStorage.setItem('demoExpired', 'true');
    } else {
      setDemoExpiryDays(10 - diffDays);
      setDemoExpired(false);
      localStorage.setItem('demoExpired', 'false');
    }
  };
  
  // Redirect to subscription page if demo expired
  useEffect(() => {
    if (demoExpired && isDemoMode) {
      const hasSubscription = businessSetup?.subscriptionPlan && 
                              businessSetup.subscriptionPlan !== 'none' &&
                              businessSetup.subscriptionStatus === 'active';
      
      if (!hasSubscription && 
          location.pathname !== '/settings' && 
          location.pathname !== '/subscription-required' &&
          !location.pathname.includes('subscription')) {
        navigate('/subscription-required');
      }
    }
  }, [demoExpired, isDemoMode, location.pathname, navigate, businessSetup]);

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen sticky top-0">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="/logo.svg" alt="EsnafPanel Logo" className="w-10 h-10" />
          </Link>
          <div>
            <h2 className="font-bold text-lg">EsnafPanel</h2>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${subscriptionClass}`}>
                {subscriptionText}
              </span>
            </div>
          </div>
        </div>
        
        {isDemoMode && !demoExpired && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{language === 'tr' ? 'Demo süresi' : 'Demo period'}</span>
              <span>{demoExpiryDays}/10 {language === 'tr' ? 'gün' : 'days'}</span>
            </div>
            <Progress value={(demoExpiryDays / 10) * 100} className="h-1.5" />
          </div>
        )}
        
        {isDemoMode && demoExpired && (
          <div className="mt-2 flex items-center text-red-500 text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>{language === 'tr' ? 'Demo süreniz doldu!' : 'Your demo period has expired!'}</span>
          </div>
        )}
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={`${item.path}-${item.label}`}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md transition-colors",
                  (location.pathname === item.path || 
                   (item.path.includes('subscription') && location.search.includes('subscription')))
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
            {language === 'tr' ? 'Abonelik Planları' : 'Subscription Plans'}
          </Button>
        </Link>
        
        <Link to="/whatsapp-connect">
          <Button 
            className="flex items-center justify-center w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            {language === 'tr' ? 'WhatsApp\'a Bağlan' : 'Connect to WhatsApp'}
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
