
# EsnafPanel Deployment Guide

Bu belge, EsnafPanel uygulamasının Google Play Store ve Apple App Store'a nasıl deploy edileceğini açıklar.

## Google Play Store'a Yükleme

### Ön Gereksinimler

1. Google Play Developer hesabı (25$ kayıt ücreti)
2. Signed APK veya Android App Bundle (AAB)
3. Grafik varlıklar (ikon, öne çıkan görsel, ekran görüntüleri)
4. Uygulama açıklaması ve metadata

### Adımlar

1. **Uygulama İmzalama (Signing)**

   ```bash
   # Keystore oluşturma (eğer yoksa)
   keytool -genkey -v -keystore esnafpanel.keystore -alias esnafpanel -keyalg RSA -keysize 2048 -validity 10000
   
   # Android projesini build etme
   npm run build
   npx cap sync android
   npx cap open android
   ```

   Android Studio'da:
   - Build > Generate Signed Bundle / APK
   - "Android App Bundle" seçin
   - Keystore bilgilerini girin
   - Build'i tamamlayın

2. **Google Play Console'a Giriş**

   - [Google Play Console](https://play.google.com/console) adresine gidin
   - "Create app" (Uygulama oluştur) seçeneğine tıklayın
   - Uygulama bilgilerini doldurun

3. **Uygulama Bilgilerini Girin**

   - Store listing (Mağaza Listesi): Açıklama, ekran görüntüleri, öne çıkan görseller
   - Content rating (İçerik derecelendirmesi): Anket formunu doldurun
   - Pricing & distribution (Fiyatlandırma ve dağıtım): Ülkeleri seçin
   - App releases (Uygulama sürümleri): İmzalı AAB'yi yükleyin

4. **Yayınlama**

   - "Review release" (Sürümü incele) düğmesine tıklayın
   - İncelemeyi gönderin
   - Google incelemesi 1-3 gün sürebilir

## Apple App Store'a Yükleme

### Ön Gereksinimler

1. Apple Developer Program üyeliği (99$ yıllık)
2. MacOS bilgisayar ve Xcode
3. Grafik varlıklar (ikon, ekran görüntüleri)
4. Uygulama açıklaması ve metadata

### Adımlar

1. **Xcode'da Projeyi Hazırlama**

   ```bash
   # iOS build
   npm run build
   npx cap sync ios
   npx cap open ios
   ```

   Xcode'da:
   - Signing & Capabilities'i yapılandırın
   - Team ve Bundle Identifier'ı ayarlayın
   - Gerekli izinleri yapılandırın (NSCameraUsageDescription, vs.)

2. **App Store Connect'te Uygulama Oluşturma**

   - [App Store Connect](https://appstoreconnect.apple.com) adresine gidin
   - "My Apps" > "+" > "New App" seçeneğine tıklayın
   - Uygulama bilgilerini doldurun

3. **Uygulama Metadatasını Girme**

   - Açıklama, anahtar kelimeler, destek URL'si
   - Ekran görüntüleri (her cihaz türü için)
   - App Icon (1024x1024)
   - Gizlilik politikası URL'si

4. **TestFlight ile Test Etme (Opsiyonel)**

   - Archive oluşturun (Product > Archive)
   - TestFlight'a yükleyin
   - Test kullanıcıları ekleyin ve test edin

5. **App Store'a Gönderme**

   - Xcode'da archive oluşturun
   - App Store Connect'e yükleyin
   - "Submit for Review" (İnceleme için gönder) seçeneğine tıklayın
   - Apple incelemesi 1-3 gün sürebilir

## Önemli Notlar

- Her iki uygulama mağazası da düzenli güncellemeler ve kullanıcı desteği bekler
- Gizlilik politikası gereklidir (GDPR, KVKK uyumlu)
- Uygulama açıklaması ve ekran görüntüleri doğru olmalıdır
- Kapsamlı test yapılmalıdır (farklı cihazlar, sürümler)
- Sürüm güncellemeleri için versiyonlama stratejisi belirleyin
- Kullanıcı geri bildirimlerini izleyin ve yanıtlayın

## Faydalı Linkler

- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Firebase App Distribution](https://firebase.google.com/docs/app-distribution) (beta testleri için)
- [Capacitor Documentation](https://capacitorjs.com/docs)
