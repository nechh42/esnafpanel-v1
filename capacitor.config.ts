
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.esnafpanel.mobile',
  appName: 'EsnafPanel',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Öncelikle yerel geliştirme için ayarlar
    // Aşağıdaki ayarlardan birini açıp diğerini kapatın:
    
    // 1. Uzak sunucu modu (yayınlanmış uygulama için)
    // url: 'https://677542fc-733c-4557-b8b4-35262a3428cd.lovableproject.com?forceHideBadge=true',
    
    // 2. Yerel geliştirme modu (geliştirme için)
    // Yerel mod kullanıyorsanız uygulamayı 'npm run dev -- --host' ile çalıştırın
    // ve aşağıdaki URL'yi bilgisayarınızın IP adresiyle değiştirin (örn: 192.168.1.5:5173)
    // url: 'http://YOUR_LOCAL_IP:5173',
    
    // 3. Ya da hiçbir URL belirtmeyin ve Capacitor default olarak yerel build'i kullanacaktır
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#25D366",
      showSpinner: true,
      spinnerColor: "#ffffff"
    }
  },
  android: {
    buildOptions: {
      keystorePath: "esnafpanel.keystore",
      keystoreAlias: "esnafpanel",
    }
  },
  ios: {
    contentInset: "always"
  }
};

export default config;
