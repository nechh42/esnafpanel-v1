
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

const queryClient = new QueryClient();

// Uygulama dilini kontrol etmek için basit bir context yapısı oluşturulabilir
// İleriki bir aşamada tam çok dilli desteği için geliştirilebilir

const App = () => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // İlk yüklenmede kullanıcı kurulumu yapılmış mı kontrol et
  useEffect(() => {
    const setupData = localStorage.getItem('businessSetup');
    setIsSetupComplete(!!setupData);
  }, []);

  // Mobil cihaz geri tuşu yönetimi
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
