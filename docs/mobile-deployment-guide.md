
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

### 5. Google Play Store'a Yükleme için Hazırlık

#### Gereksinimler

1. Google Play Developer hesabı
2. Uygulama APK veya AAB dosyası 
3. Uygulama simgesi (512x512 px)
4. En az 2 ekran görüntüsü
5. Açıklama metinleri
6. Gizlilik politikası

#### İmzalı APK/AAB Oluşturma

1. Android Studio'da:
   ```bash
   # Önce web uygulamasını derleyin
   npm run build
   
   # Android projesini güncelleyin
   npx cap sync android
   
   # Android Studio'yu açın
   npx cap open android
   ```

2. Android Studio'da:
   - **Build > Generate Signed Bundle / APK**
   - Yeni keystore oluşturun veya mevcut olanı kullanın
   - Keystore bilgilerini girin, şifreyi unutmayın!
   - AAB (önerilen) seçin
   - **Release** yapılandırmasını seçin
   - Finish'e tıklayın

3. İmzalanmış AAB dosyası şurada oluşturulur:
   ```
   android/app/release/app-release.aab
   ```

4. Google Play Console'a bu AAB dosyasını yükleyin.

### 6. Play Store Yükleme Kontrol Listesi

- [ ] Uygulama simgesi (512x512 px PNG)
- [ ] Öne çıkan görsel (1024x500 px PNG/JPG)  
- [ ] En az 2 ekran görüntüsü (16:9 oranında)
- [ ] Kısa açıklama (80 karakter)
- [ ] Tam açıklama (4000 karaktere kadar)
- [ ] Sınıflandırma kategorisi seçimi
- [ ] İçerik derecelendirmesi
- [ ] İletişim e-postası
- [ ] Gizlilik politikası URL'si
- [ ] İmzalı AAB/APK dosyası

### 7. Son Kontroller ve Gönderim

1. Google Play Console'dan "Internal Testing" bölümünde test edin
2. Uygulama içi tüm özellikleri kontrol edin
3. Daha sonra "Release to Production" ile yayınlayın

## Sorun Giderme

- **Web sayfası mevcut değil hatası**: Capacitor yapılandırmasını kontrol edin, `local` modu kullanmayı deneyin
- **Android Studio'da derleme hataları**: Gradle sürümünü güncelleyin ve SDK'nın güncel olduğundan emin olun
- **Capacitor senkronizasyon hataları**: Node modüllerini temizleyip yeniden yükleyin: `rm -rf node_modules && npm install`

## Faydalı Kaynaklar

- [Capacitor Resmi Dokümantasyonu](https://capacitorjs.com/docs)
- [Android Developer Guides](https://developer.android.com/guide)
- [iOS Developer Documentation](https://developer.apple.com/documentation/)
- [Google Play Console Yardım](https://support.google.com/googleplay/android-developer)
