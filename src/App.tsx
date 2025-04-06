
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import BusinessSetup from "./pages/BusinessSetup";
import Messages from "./pages/Messages";
import Orders from "./pages/Orders";
import WhatsAppConnect from "./pages/WhatsAppConnect";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SubscriptionRequired from "./pages/SubscriptionRequired";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isDemoExpired, setIsDemoExpired] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  // Check if business setup is completed on initial load
  useEffect(() => {
    const setupData = localStorage.getItem('businessSetup');
    setIsSetupComplete(!!setupData);
    
    // Set company contact information
    const contactInfo = {
      email: "esnafpanel@gmail.com",
      address: "İzmir, Türkiye",
      phone: "+90 555 123 4567",
      website: "https://esnafpanel.com"
    };
    
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    
    // Check demo mode
    const demoModeData = localStorage.getItem('demoMode');
    if (demoModeData !== null) {
      setIsDemoMode(JSON.parse(demoModeData));
    }

    // Check if demo has expired
    checkDemoExpiration();

    // Check subscription status
    checkSubscriptionStatus();
  }, []);
  
  // Listen for demo mode changes
  useEffect(() => {
    const handleDemoModeChange = () => {
      const demoModeData = localStorage.getItem('demoMode');
      if (demoModeData !== null) {
        setIsDemoMode(JSON.parse(demoModeData));
      }
    };
    
    window.addEventListener('storage', handleDemoModeChange);
    
    return () => {
      window.removeEventListener('storage', handleDemoModeChange);
    };
  }, []);

  // Mobile back button handling
  useEffect(() => {
    const handleBackButton = () => {
      console.log("Back button pressed");
    };

    document.addEventListener('backbutton', handleBackButton);
    
    return () => {
      document.removeEventListener('backbutton', handleBackButton);
    };
  }, []);

  // Check if demo has expired
  const checkDemoExpiration = () => {
    const demoStartDate = localStorage.getItem('demoStartDate');
    
    if (!demoStartDate) {
      // If no demo start date exists, set it now
      const currentDate = new Date().toISOString();
      localStorage.setItem('demoStartDate', currentDate);
      setIsDemoExpired(false);
      return;
    }
    
    const startDate = new Date(demoStartDate);
    const currentDate = new Date();
    const diffDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Demo expires after 10 days
    if (diffDays >= 10) {
      setIsDemoExpired(true);
      // Also update localStorage
      localStorage.setItem('demoExpired', 'true');
    } else {
      setIsDemoExpired(false);
      localStorage.setItem('demoExpired', 'false');
    }
  };

  // Check if user has an active subscription
  const checkSubscriptionStatus = () => {
    const businessSetupStr = localStorage.getItem('businessSetup');
    
    if (businessSetupStr) {
      const businessSetup = JSON.parse(businessSetupStr);
      const hasSubscription = businessSetup.subscriptionPlan && 
                             businessSetup.subscriptionPlan !== 'none' &&
                             businessSetup.subscriptionStatus === 'active';
      
      setHasActiveSubscription(hasSubscription);
    } else {
      setHasActiveSubscription(false);
    }
  };

  // Determine if the user should be redirected to subscription page
  const shouldRedirectToSubscription = (pathname) => {
    // Don't redirect if already on setup, subscription required page or settings with subscription tab
    if (
      pathname === '/setup' || 
      pathname === '/subscription-required' || 
      pathname === '/settings' || 
      pathname.startsWith('/settings?tab=subscription')
    ) {
      return false;
    }
    
    // Redirect if demo is expired and no active subscription
    return isDemoExpired && !hasActiveSubscription;
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route 
              path="/" 
              element={
                shouldRedirectToSubscription(window.location.pathname) 
                  ? <Navigate to="/subscription-required" replace /> 
                  : <Index />
              } 
            />
            <Route path="/setup" element={<BusinessSetup />} />
            <Route 
              path="/messages" 
              element={
                shouldRedirectToSubscription(window.location.pathname) 
                  ? <Navigate to="/subscription-required" replace /> 
                  : <Messages />
              } 
            />
            <Route 
              path="/orders" 
              element={
                shouldRedirectToSubscription(window.location.pathname) 
                  ? <Navigate to="/subscription-required" replace /> 
                  : <Orders />
              } 
            />
            <Route 
              path="/whatsapp-connect" 
              element={
                shouldRedirectToSubscription(window.location.pathname) 
                  ? <Navigate to="/subscription-required" replace /> 
                  : <WhatsAppConnect />
              } 
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/subscription-required" element={<SubscriptionRequired />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
