
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.esnafpanel.mobile',
  appName: 'EsnafPanel',
  webDir: 'dist',
  server: {
    url: 'https://677542fc-733c-4557-b8b4-35262a3428cd.lovableproject.com?forceHideBadge=true',
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
