
# EsnafPanel Yerel Geliştirme Kılavuzu

Bu kılavuz, EsnafPanel uygulamasını yerel ortamınızda başlatmak ve geliştirmek için adım adım talimatlar içerir.

## Gereksinimler

- [Node.js](https://nodejs.org/) 18.0 veya daha yüksek
- [npm](https://www.npmjs.com/) (Node.js ile birlikte gelir)
- Tarayıcı (Chrome, Firefox, Edge, vb.)
- Metin editörü (VSCode, WebStorm, vb.)

## Kurulum Adımları

### 1. Uygulamayı Başlatma

```bash
# Projeyi klonlayın (GitHub'dan indirdiyseniz)
git clone <repo-url>
cd esnafpanel

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

### 2. Uygulama Erişimi

Geliştirme sunucusu başlatıldıktan sonra, aşağıdaki adreslerden birine tarayıcınızdan erişebilirsiniz:

- [http://localhost:8080](http://localhost:8080)
- [http://127.0.0.1:8080](http://127.0.0.1:8080)

**Not**: Windows Güvenlik Duvarı veya antivirüs programları bazı durumlarda localhost erişimini engelleyebilir. Bu durumda:

1. Güvenlik Duvarı ayarlarınızı kontrol edin
2. `127.0.0.1` IP adresini kullanın
3. Komut isteminde `ipconfig` komutu ile yerel IP adresinizi öğrenin ve `http://YEREL-IP:8080` adresini kullanın

### 3. Tüm Ağ Arayüzlerinden Erişim

Eğer yerel ağınızdaki diğer cihazlardan (örneğin: telefon veya tablet) erişmek istiyorsanız:

```bash
# Tüm ağ arayüzlerinden erişilebilir olması için
npm run dev -- --host 0.0.0.0
```

Bu komutu çalıştırdıktan sonra, terminal çıktısında gösterilen IP adresi üzerinden erişebilirsiniz:

```
  VITE v4.x.x  ready in 123ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.x.x:8080/
```

### 4. Bağlantı Sorunları için Çözüm Önerileri

#### "localhost Çalışmıyor" Sorunu

1. **Port Kullanımını Kontrol Edin**:
   ```bash
   # Windows için
   netstat -ano | findstr :8080
   
   # MacOS veya Linux için
   lsof -i :8080
   ```

2. **Farklı Bir Port Kullanın**:
   ```bash
   npm run dev -- --port 3000
   ```

3. **Güvenlik Duvarı Ayarlarını Kontrol Edin**:
   - Windows Güvenlik Duvarı ayarlarında Node.js ve npm için istisna ekleyin
   - Antivirüs programınızın ayarlarını kontrol edin

4. **hosts Dosyasını Kontrol Edin**:
   - Windows: `C:\Windows\System32\drivers\etc\hosts`
   - MacOS/Linux: `/etc/hosts`
   - `127.0.0.1 localhost` girişinin olduğundan emin olun

5. **Proxy veya VPN Ayarlarını Kontrol Edin**:
   - Proxy veya VPN kullanıyorsanız geçici olarak devre dışı bırakın

### 5. Mobil Önizleme için Bağlantı

Fiziksel mobil cihazlarda test etmek için:

1. Bilgisayarınız ve mobil cihazınızın aynı WiFi ağında olduğundan emin olun
2. `npm run dev -- --host 0.0.0.0` komutunu çalıştırın
3. Terminal çıktısında gösterilen Network IP adresini (örn: `http://192.168.x.x:8080/`) mobil cihazınızın tarayıcısına girin

### 6. Üretim Sürümünü Test Etme

Üretim sürümünü yerel olarak test etmek için:

```bash
# Üretim sürümünü derleyin
npm run build

# Derlenmiş uygulamayı önizleyin
npm run preview
```

Bu genellikle `http://localhost:4173` adresinde çalışacaktır.

## Sık Karşılaşılan Sorunlar ve Çözümleri

### 1. "Module not found" Hatası

```bash
# Node modüllerini yeniden yükleyin
rm -rf node_modules
npm install
```

### 2. Port Zaten Kullanımda Hatası

```bash
# Farklı bir port belirtin
npm run dev -- --port 3000
```

### 3. WebSocket Bağlantı Hatası

- Güvenlik duvarı ayarlarınızı kontrol edin
- VPN veya proxy kullanıyorsanız geçici olarak devre dışı bırakın

### 4. "Cannot GET /" Hatası

- Doğru URL'yi kullandığınızdan emin olun
- Uygulamanın belirtilen portta çalıştığını kontrol edin
- Geliştirme sunucusunun doğru şekilde başlatıldığından emin olun

## Geliştirme İpuçları

1. **Sıcak Yeniden Yükleme**: Geliştirme sunucusu, kod değişikliklerini otomatik olarak algılar ve tarayıcıyı yeniler.

2. **Devtools Kullanımı**: Tarayıcının geliştirici araçlarını (F12 veya Ctrl+Shift+I) kullanarak hata ayıklama yapabilirsiniz.

3. **Hız Optimizasyonu**: Geliştirme sunucusu yavaş çalışıyorsa, aşağıdaki komutu deneyin:
   ```bash
   npm run dev -- --force
   ```

4. **Temiz Başlangıç**:
   ```bash
   # Önbelleği temizleyin ve yeniden başlatın
   npm run clean
   npm install
   npm run dev
   ```

Bu adımları izleyerek EsnafPanel uygulamasını yerel ortamınızda başarıyla çalıştırabilir ve geliştirme yapabilirsiniz.
