
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

// Wrapper component to handle page transitions
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div className={`page-transition ${isAnimating ? 'page-transition-active' : ''}`}>
      {children}
    </div>
  );
};

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
    
    // Add styles for page transitions
    const style = document.createElement('style');
    style.textContent = `
      .page-transition {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }
      .page-transition-active {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
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
    const diffTime = currentDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
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
                  : <PageTransition><Index /></PageTransition>
              } 
            />
            <Route path="/setup" element={<PageTransition><BusinessSetup /></PageTransition>} />
            <Route 
              path="/messages" 
              element={
                shouldRedirectToSubscription(window.location.pathname) 
                  ? <Navigate to="/subscription-required" replace /> 
                  : <PageTransition><Messages /></PageTransition>
              } 
            />
            <Route 
              path="/orders" 
              element={
                shouldRedirectToSubscription(window.location.pathname) 
                  ? <Navigate to="/subscription-required" replace /> 
                  : <PageTransition><Orders /></PageTransition>
              } 
            />
            <Route 
              path="/whatsapp-connect" 
              element={
                shouldRedirectToSubscription(window.location.pathname) 
                  ? <Navigate to="/subscription-required" replace /> 
                  : <PageTransition><WhatsAppConnect /></PageTransition>
              } 
            />
            <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
            <Route path="/subscription-required" element={<PageTransition><SubscriptionRequired /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
