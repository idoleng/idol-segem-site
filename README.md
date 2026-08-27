# İDOL SEGEM — Kurum Web Sitesi

Özel İDOL Sosyal Etkinlik ve Gelişim Merkezi (Gelibolu / Çanakkale) tanıtım ve online ödeme sitesi.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Sitenin tamamı: HTML, CSS ve JavaScript tek dosyada |
| `api/paytr-token.js` | Ödeme token'ı üreten sunucu fonksiyonu (PayTR 1. adım) |
| `api/paytr-bildirim.js` | Ödeme sonucunu alan bildirim adresi (PayTR 2. adım) |
| `logo-idol.png` | Kurum logosu |
| `favicon.png` | Sekme simgesi |
| `og-kapak.png` | WhatsApp / Facebook paylaşım kapağı (1200×630) |
| `vercel.json` | Yayın ayarları ve güvenlik başlıkları |
| `sitemap.xml`, `robots.txt` | Arama motoru dosyaları |

## İçerik nereden düzenlenir?

`index.html` içindeki `<script>` bloğunda:

- **`KURUM`** — telefon, WhatsApp, adres, e-posta, kampanya bitiş tarihi
- **`KURSLAR`** — program adı, fiyatı, süresi, ders programı, sık sorulan sorular
- **`ODENEBILIR`** — ödeme sayfasında listelenen programlar ve fiyatları

> **Dikkat:** `ODENEBILIR` yalnızca ekranda gösterim içindir. Gerçek tutar
> `api/paytr-token.js` içindeki `FIYATLAR` listesinden hesaplanır.
> **Fiyat değiştirdiğinizde iki listeyi birlikte güncelleyin.**

---

## PayTR kurulumu

### 1. Üye işyeri başvurusu

paytr.com/uye-isyeri-olun adresinden başvurun. İstenen evraklar (şahıs işletmesi):
vergi levhası, kimlik görüntüsü, imza beyannamesi, banka hesap teyit belgesi.
Şirketseniz ayrıca ticaret sicil gazetesi, imza sirküleri, ortak kimlikleri.
Kurum ruhsatınızı da hazır bulundurun.

Başvuru onaylanınca panelden şu üç bilgi alınır:
`Mağaza No`, `Mağaza Parola`, `Mağaza Gizli Anahtar`.

### 2. Vercel'e yayınlama

1. vercel.com hesabı açıp GitHub ile giriş yapın
2. **Add New → Project** → `idol-segem-site` deposunu seçin
3. Framework Preset: **Other**, Build Command boş bırakılır
4. **Deploy**

### 3. Ortam değişkenleri

Vercel'de **Settings → Environment Variables** altına ekleyin:

| Anahtar | Değer |
|---|---|
| `PAYTR_MERCHANT_ID` | Mağaza No |
| `PAYTR_MERCHANT_KEY` | Mağaza Parola |
| `PAYTR_MERCHANT_SALT` | Mağaza Gizli Anahtar |
| `SITE_URL` | `https://www.idolsegem.com` (sonda eğik çizgi olmadan) |
| `PAYTR_TEST_MODE` | Test için `1`, canlıda `0` |

Bu değerler yalnızca sunucuda kullanılır, tarayıcıya hiçbir zaman gönderilmez.
**Depoya asla yazmayın.**

### 4. Bildirim URL'i

PayTR Mağaza Paneli → Ayarlar → **Bildirim URL** alanına:

```
https://www.idolsegem.com/api/paytr-bildirim
```

Bu adres tanımlanmazsa ödemeler onaylanmaz. Ödemenin gerçekten tamamlandığı
yalnızca bu bildirimden anlaşılır — kullanıcının yönlendirildiği "başarılı"
sayfası tek başına yeterli değildir.

### 5. Test

`PAYTR_TEST_MODE=1` iken PayTR panelindeki test kartlarıyla deneme yapın.
Başarılı testin ardından panelden **Entegrasyonu Tamamladım** ile canlı moda
geçiş talebi gönderin, sonra `PAYTR_TEST_MODE=0` yapın.

---

## Yayına almadan önce

- [ ] Alan adını alıp Vercel'e bağlayın; `www.idolsegem.com` geçen yerleri gerçek adresle değiştirin (`index.html`, `sitemap.xml`, `robots.txt`, `SITE_URL`)
- [ ] Hukuki sayfaları (mesafeli satış, ön bilgilendirme, iptal-iade, gizlilik) avukat ya da mali müşavirle kontrol ettirin
- [ ] `ODENEBILIR` ve `FIYATLAR` listelerine gerçek fiyatları yazın
- [ ] Sabit telefon ve kurumsal e-posta ekleyin
- [ ] ETBİS kaydı gerekip gerekmediğini mali müşavirinize sorun
- [ ] Google Search Console'a siteyi ve `sitemap.xml` dosyasını ekleyin
- [ ] Eğitmen kartlarına gerçek fotoğraf ekleyin

## Notlar

Site tek sayfalık bir uygulamadır (hash yönlendirme). Kurs sayfaları arama
motorlarında ayrı ayrı indekslenmez; yerel aramalarda görünürlük önemliyse
kurs sayfalarını ayrı `.html` dosyalarına bölmek gerekir.
