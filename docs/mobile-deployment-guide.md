
# EsnafPanel Mobil Uygulama Yükleme Kılavuzu

Bu kılavuz, EsnafPanel uygulamasını Android ve iOS cihazlara nasıl yükleyeceğinizi adım adım anlatır.

## Gereksinimler

1. Node.js ve NPM
2. Android Studio (Android için)
3. Xcode (iOS için, sadece Mac bilgisayarlarda)
4. Capacitor CLI

## Kurulum Adımları

### 1. Projeyi Hazırlama

```bash
# Bağımlılıkları yükleyin
npm install

# Web uygulamasını derleyin
npm run build
```

### 2. Android için Hazırlık

```bash
# Android platformunu ekleyin (ilk kez)
npx cap add android

# Değişiklikleri Android projesine aktarın
npx cap sync android

# Android Studio'yu açın
npx cap open android
```

Android Studio'da:
1. **Build > Build Bundle(s) / APK(s) > Build APK** seçeneğini kullanın
2. Oluşturulan APK dosyası `android/app/build/outputs/apk/debug/` dizininde bulunacaktır

### 3. iOS için Hazırlık (Mac gerektirir)

```bash
# iOS platformunu ekleyin (ilk kez)
npx cap add ios

# Değişiklikleri iOS projesine aktarın
npx cap sync ios

# Xcode'u açın
npx cap open ios
```

Xcode'da:
1. Sol üstteki hedef cihazı seçin (iPhone veya iPad)
2. Play düğmesine tıklayarak simülatörde test edin
3. Gerçek cihazda test etmek için Apple Developer hesabınızla oturum açmanız gerekir

### 4. Yerel Geliştirme için İpuçları

Eğer `http://localhost:8080/` adresinde uygulama çalışmıyorsa:

```bash
# Vite'ın tüm ağ arayüzlerinden erişilebilir olmasını sağlayın
npm run dev -- --host 0.0.0.0
```

Tarayıcıda `http://localhost:8080/` yerine `http://127.0.0.1:8080/` adresini deneyin.

### 5. Mağazalara Yükleme

#### Google Play Store'a Yükleme

1. Google Play Developer Console'a kaydolun (25$ tek seferlik ücret)
2. Yeni bir uygulama oluşturun
3. Uygulama bilgilerini, açıklamaları ve ekran görüntülerini ekleyin
4. Android Studio'dan bir imzalı APK veya AAB (Android App Bundle) oluşturun:
   - **Build > Generate Signed Bundle / APK**
   - Keystore oluşturun veya mevcut olanı kullanın
   - Release sürümünü oluşturun
5. Oluşturulan AAB dosyasını Play Console'a yükleyin
6. Uygulama sürümünü ayarlayın ve yayınlayın

#### Apple App Store'a Yükleme

1. Apple Developer Program'a kaydolun (yıllık 99$ ücret)
2. App Store Connect'de yeni bir uygulama oluşturun
3. Uygulama bilgilerini, açıklamaları ve ekran görüntülerini ekleyin
4. Xcode'dan bir Archive oluşturun:
   - Cihaz seçiminde "Any iOS Device (arm64)" seçin
   - **Product > Archive** seçeneğini kullanın
5. Archive penceresinden "Distribute App" seçeneğini kullanın
6. App Store ve TestFlight'a dağıtım seçeneğini işaretleyin
7. Sertifikalar ve profiller için Apple ID'nizi kullanın
8. Yükleme tamamlandıktan sonra App Store Connect'ten gözden geçirme için gönderin

## QR Kod ile Test Etme

Test kullanıcıları için QR kod oluşturarak uygulamayı doğrudan indirmelerini sağlayabilirsiniz:

1. APK dosyasını bir web sunucusuna yükleyin
2. QR kod oluşturucu bir hizmet kullanarak indirme bağlantısı için QR kod oluşturun
3. Bu QR kodu kullanıcılarla paylaşın

## Sorun Giderme

- **Windows'ta localhost çalışmıyor**: Güvenlik duvarı ayarlarınızı kontrol edin veya `127.0.0.1` adresini deneyin
- **Android Studio'da derleme hataları**: Gradle sürümünü güncelleyin ve SDK'nın güncel olduğundan emin olun
- **Capacitor senkronizasyon hataları**: Node modüllerini temizleyip yeniden yükleyin: `rm -rf node_modules && npm install`

## Faydalı Kaynaklar

- [Capacitor Resmi Dokümantasyonu](https://capacitorjs.com/docs)
- [Android Developer Guides](https://developer.android.com/guide)
- [iOS Developer Documentation](https://developer.apple.com/documentation/)
