
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import BusinessSetup from "./pages/BusinessSetup";
import Messages from "./pages/Messages";
import Orders from "./pages/Orders";
import WhatsAppConnect from "./pages/WhatsAppConnect";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

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

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/setup" element={<BusinessSetup />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/whatsapp-connect" element={<WhatsAppConnect />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
