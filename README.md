# İDOL SEGEM — Kurum Web Sitesi

Özel İDOL Sosyal Etkinlik ve Gelişim Merkezi (Gelibolu / Çanakkale) tanıtım sitesi.
Sunucu tarafı gerektirmez; statik dosyalardan oluşur ve GitHub Pages üzerinde yayınlanabilir.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Sitenin tamamı: HTML, CSS ve JavaScript tek dosyada |
| `logo-idol.png` | Kurum logosu (üst bar ve alt bilgi) |
| `favicon.png` | Sekme simgesi |
| `og-kapak.png` | WhatsApp / Facebook paylaşım kapağı (1200×630) |
| `sitemap.xml` | Arama motoru site haritası |
| `robots.txt` | Tarayıcı yönergeleri |

## İçeriği nereden düzenlerim?

`index.html` içindeki `<script>` bloğunun başında üç sabit yer alır:

1. **`KURUM`** — telefon, WhatsApp numarası, adres, e-posta, kampanya bitiş tarihi
2. **`EGITMENLER`** — eğitmen adı, unvanı, tanıtım yazısı
3. **`KURSLAR`** — kurs adı, fiyatı, süresi, ders programı, sık sorulan sorular

Kampanya tarihi yalnızca `KURUM.kampanyaBitis` alanında yazılıdır; sayfadaki tüm görünümler oradan güncellenir.

## Yayına almadan önce yapılacaklar

- [ ] `www.idolsegem.com` alan adını gerçek alan adıyla değiştir (`index.html` içinde 8 yerde geçer, `sitemap.xml` ve `robots.txt` dosyalarında birer kez)
- [ ] Google Search Console'a siteyi ve `sitemap.xml` dosyasını ekle
- [ ] Google Business Profile kaydını aç, adresi ve telefonu siteyle birebir aynı yaz
- [ ] Eğitmen kartlarına gerçek fotoğraf ekle
- [ ] KVKK metnindeki saklama sürelerini kurum uygulamasıyla karşılaştır

## Yayınlama (GitHub Pages)

Depo ayarlarında **Settings → Pages → Source: Deploy from a branch → main / (root)** seçilir.
Birkaç dakika içinde site `https://<kullanıcı-adı>.github.io/<depo-adı>/` adresinde yayına girer.
