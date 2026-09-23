# Değişiklik Günlüğü

Bu dosya, `idol-segem-site` deposundaki her yayın artışını (v1, v2, v3…) ve
bir soruna karşı geri dönülebilecek commit kodunu kaydeder.

## v1 — 2026-09-10

**Geri dönüş noktası (bu değişiklikten önceki commit):** `eff3aec`

### Değişenler
- TYT-AYT programı tamamen kaldırıldı: kurs kartı, "TYT-AYT Hazırlık" kategorisi,
  başlık/meta açıklamaları, JSON-LD kurum açıklaması, hero ve footer metinleri,
  ekip kartı metni ve ödeme sayfası (`ODENEBILIR`) listesindeki `tyt-ayt` kaydı.
- Yeni program eklendi: **İngilizce Kursu · 2-8. Sınıf** (35 hafta, haftada 3 saat,
  4 temel beceri: dinleme, konuşma, okuma, yazma). Kategori, ikon ve kapak
  sahnesi `yks` anahtarının yerine `ingilizce-kursu` olarak yeniden adlandırıldı.
- Hero metnindeki "İlkokuldan liseye" ifadesi "İlkokuldan ortaokula" olarak
  güncellendi (lise düzeyi program kalmadığı için).

### Bilinen sorun (bu sürümde düzeltilmedi — onay bekliyor)
- `index.html` içindeki `ODENEBILIR` listesi ile `api/paytr-token.js`
  içindeki `FIYATLAR` listesi arasında tutarsızlık var:
  - Ortaokul: sitede 9.500 TL gösteriliyor, sunucu tarafında 7.500 TL olarak
    hesaplanıyor.
  - LGS 8. Sınıf: sitede 9.500 TL gösteriliyor, sunucu tarafında 7.500 TL
    olarak hesaplanıyor.
  - `kocluk` (Eğitim Koçluğu) kodu `FIYATLAR` listesinde hiç yok — bu program
    seçilip ödeme denendiğinde "Geçersiz program seçimi" hatası alınır.
  Gerçek tutarlar teyit edilmeden bu değerlere dokunulmadı.

### İngilizce Kursu için henüz eklenmeyenler
- Program ücreti belirlenmediği için `ODENEBILIR` ve `FIYATLAR` listelerine
  eklenmedi (fiyatı olmayan programlar bu listelerde yer almaz — mevcut
  kurala uygun). Fiyat belirlenince iki listeye de eklenmesi gerekiyor.

## v2 — 2026-09-10

**Geri dönüş noktası (v1 uygulanmadan önceki commit):** `eff3aec`

### Site yapısı: online / yüz yüze ikiye bölündü
- Menüye iki ayrı sayfa eklendi: **Online Kurslarımız** (`#/online-kurslar`)
  ve **Yüz Yüze (Gelibolu)** (`#/yuz-yuze`). Eski `#/kurslar` adresi (tüm
  programları gösterir) geriye dönük uyumluluk için hâlâ çalışıyor, ancak
  menüde artık görünmüyor.
- Her kursa opsiyonel bir `teslim` alanı eklendi (`'online'`, `'yuzyuze'`
  ya da boş = ikisinde de listelenir). Kurs kartlarında ilgili rozet
  ("Online" / "Yüz Yüze") gösteriliyor.
- Ana sayfadaki "Kursları incele" butonu iki ayrı butona bölündü.

### Yeni programlar
- **Etüt Programı · 7-10 Yaş** — sadece yüz yüze. Okul sonrası ödev ve
  çalışma desteği.
- **Çocuklar için İngilizce · 7-9 Yaş** — sadece yüz yüze. Oyun ve
  aktivite temelli, temel düzey İngilizce.
- **İngilizce Kursu · 7-14 Yaş (Yüz Yüze)** — mevcut online İngilizce
  Kursu'nun (2-8. sınıf) yanına, yüz yüze verilen ayrı bir kayıt olarak
  eklendi. **Varsayım:** haftalık ders saati, grup büyüklüğü ve süre
  online sürümle aynı kabul edildi (35 hafta, haftada 3 saat, 5 kişilik
  grup) — gerçek program farklıysa güncellenmesi gerekir.
- Mevcut online İngilizce Kursu artık "(Online)" etiketiyle ayrıştırıldı.

### Güncellenen programlar
- **Ortaokul Destek Programı (5-7. Sınıf):** ders listesine İngilizce
  eklendi; açıklamaya "her ders branş öğretmeniyle işlenir, etüt/yazılı/
  deneme sınavlarıyla takip edilir" cümlesi eklendi.
- **LGS Hazırlık Programı (8. Sınıf):** açıklamaya net ders listesi
  eklendi. **Not:** kullanıcı "Sosyal Bilgiler" dedi, ancak LGS'de 8.
  sınıfta bu ders **T.C. İnkılap Tarihi ve Atatürkçülük** olarak
  okutuluyor (Sosyal Bilgiler 5-7. sınıfa özgü); sitede zaten doğru olan
  altı ders (Türkçe, Matematik, Fen, İnkılap Tarihi, Din Kültürü,
  İngilizce) kullanıldı. Kontrol edilmesi rica olunur.
- **AHOB:** internet araştırmasına dayanarak yapay zekâ destekli yazılım
  altyapısı, göz kası/göz sıçraması egzersizleri, dikkat-odaklanma
  oyunları ve bilişsel gelişim vurgusu eklendi. Kurumun kendine özgü
  rakamları (30 ders saati, bire bir format) değiştirilmedi.

### Yeni kategori
- **Etüt Programı** kategorisi eklendi (ikon, renk ve kapak illüstrasyonu
  dahil).

## v3 — 2026-09-10

**Geri dönüş noktası (v2 uygulanmadan önceki commit):** v2'nin oluşturduğu
commit — henüz push edilmediyse `eff3aec`.

### Değişenler
- Footer'daki (site en altı) adres artık tıklanabilir: Google Haritalar'da
  konumu açıyor.
- İletişim sayfasındaki "Adres" kutusu da aynı şekilde tıklanabilir hâle
  getirildi (daha önce `cursor:default` ile pasifti, Telefon ve WhatsApp
  kutuları gibi artık aktif).
- Telefon ve e-posta zaten `tel:` / `mailto:` bağlantılarıyla tıklanabilir
  durumdaydı, bu değişiklikte dokunulmadı.

## v4 — 2026-09-10

**Geri dönüş noktası (v3 uygulanmadan önceki commit):** v3'ün oluşturduğu
commit — henüz push edilmediyse `eff3aec`.

### Değişenler
- **Yüz Yüze (Gelibolu)** sayfasında artık hiçbir kursun fiyatı
  gösterilmiyor; fiyat alanı "Bilgi alın" olarak görünüyor, taksit/peşin
  ödeme bilgisi ve erken kayıt indirim rozeti de bu sayfada gizleniyor.
- **Online Kurslarımız** ve eski `#/kurslar` sayfalarında fiyatlar
  olduğu gibi görünmeye devam ediyor — değişiklik yalnızca Yüz Yüze
  sayfasını etkiliyor.
- Bir kursun (örn. LGS Hazırlık) hem online hem yüz yüze sayfada
  görünebildiği durumlarda, aynı kurs hangi sayfadan açılırsa ona göre
  fiyatlı ya da fiyatsız gösteriliyor; kurs verisi tek, yalnızca
  görünüm sayfaya göre değişiyor.

## v5 — 2026-09-23

**Geri dönüş noktası (bu değişiklikten önceki commit):** `ce5593c`

### Neden
Kurum bir SEGEM'dir (Sosyal Etkinlik ve Gelişim Merkezi); ilkokul ve
ortaokul düzeyinde hizmet verir, lise / TYT-AYT / YKS öğrencilerine
akademik ders veremez. Olası bir denetimde sitenin bu kapsamla birebir
uyumlu olması için lise düzeyini çağrıştıran her şey kaldırıldı.

> Not: v1'de TYT-AYT kaldırılmıştı, ancak sonradan GitHub'a elle
> yüklenen `index.html` ("Add files via upload") TYT-AYT içeriğini geri
> getirmişti. Bu sürüm onu yeniden ve eksiksiz temizler.

### Kaldırılanlar
- **TYT-AYT Türkçe ve Edebiyat** kursu (kart, detay sayfası, SSS, fiyat).
- **TYT-AYT Hazırlık** kategorisi, kapak illüstrasyonu, ikonu ve renk açısı.
- Ödeme sayfası (`ODENEBILIR`) listesindeki `tyt-ayt` kaydı.
- İletişim formundaki sınıf seçiminden **Lise** seçeneği.

### Metin güncellemeleri ("LGS ve TYT-AYT hazırlık" → "LGS hazırlık")
- Sayfa başlığı (`<title>`), Google açıklaması, WhatsApp/Facebook ve
  Twitter paylaşım açıklamaları, Google yapısal verisi (JSON-LD).
- Ana sayfa giriş metni: "İlkokuldan liseye" → "İlkokuldan ortaokula".
- Kurslar sayfası açıklaması, footer tanıtım metni, "Sınav Grupları"
  ekip kartı.

### Seviye etiketleri netleştirildi
Kartlarda "Tüm seviyeler" yazan akademik programlar, lise öğrencisi de
alınıyormuş gibi okunabildiği için gerçek sınıf aralığıyla değiştirildi
(aralıklar programların kendi SSS'lerinden alındı):
- İngilizce, Matematik, Türkçe Özel Ders → **4-8. sınıf**
- Fen Bilimleri Özel Ders → **5-8. sınıf**
- Eğitim Koçluğu, Bilişsel Beceriler, Yaz Dönemi Kampı → **İlkokul-Ortaokul**
- AHOB Anlayarak Hızlı Okuma "Tüm seviyeler" olarak bırakıldı (akademik
  ders değil, yetişkinlere de açık bir gelişim programı).

### Eski bağlantılar
`#/kurs/tyt-ayt-turkce-edebiyat` adresi artık "Bu kurs bulunamadı"
sayfasını gösterir.

## v6 — 2026-09-23

**Geri dönüş noktası (bu değişiklikten önceki commit):** `3032064` (v5)

### Değişenler
- Ana sayfa istatistiği: "5000+ Mezun öğrenci" → "5000+ Öğrenci yetiştirdik"
  ("mezun" ifadesi lise mezunu gibi anlaşılabildiği için).
- "Aktif program" sayısı artık elle yazılmıyor; `KURSLAR` listesindeki kurs
  sayısından otomatik hesaplanıyor (eskiden 14 yazıyordu, gerçekte 17).

### Düzeltilen sorun (v1'den beri açıktı)
`api/paytr-token.js` içindeki `FIYATLAR` listesi, sitede gösterilen fiyatlarla
eşitlendi. Sitedeki kurs kartı, SSS ve ödeme sayfasındaki tutarlar esas alındı:
- Ortaokul Destek: 7.500 → **9.500 TL**
- LGS 8. Sınıf: 7.500 → **9.500 TL**
- Eğitim Koçluğu (`kocluk`) eklendi: **7.500 TL** — önceden seçilip ödeme
  denendiğinde "Geçersiz program seçimi" hatası veriyordu.
## v7 — 2026-09-23

**Geri dönüş noktası (bu değişiklikten önceki commit):** `ffe7f07` (v6)

### Tüm fiyatlar siteden kaldırıldı
Kurum kararıyla sitede hiçbir fiyat, taksit, peşin ödeme veya indirim
bilgisi gösterilmiyor. Fiyatlar ileride yeniden eklenecekse eski tutarlar
`ffe7f07` commit'inde duruyor.

- `KURSLAR`: tüm kurslarda `fiyat:null`; `toplam`, `taksit`, `pesin`
  alanları silindi. Kartlarda "Bilgi alın", kurs sayfasında "Fiyat için
  bilgi alın" yazıyor; yanındaki "aylık / ders saati" etiketi fiyat yokken
  artık gösterilmiyor.
- Kurs SSS'lerindeki "Ücret nasıl ödeniyor? — aylık X TL…" cevapları
  "Ücret ve ödeme bilgisi nasıl alırım? — WhatsApp / telefon" olarak
  değiştirildi (İlkokul, Ortaokul, LGS, Eğitim Koçluğu).
- Genel SSS ve ödeme sayfasından "peşin ya da 10 taksit" ve "erken kayıt /
  kardeş indirimi" cümleleri çıkarıldı.
- Üst duyuru bandından "Erken kayıtta %20 indirim" ifadesi, ana sayfadaki
  "ERKEN KAYIT · %20 İNDİRİM" çağrı kutusu ve "kardeş %25" metni kaldırıldı;
  kutu "Yeni dönem kayıtları" olarak yeniden yazıldı.
- `ODENEBILIR` (index.html) ve `FIYATLAR` (api/paytr-token.js) listeleri
  boşaltıldı. Ödeme sayfası havale bilgilendirmesini gösteriyor; sunucu
  her ödeme isteğini reddediyor.

### Bilerek bırakılanlar
- Fiyat gösterim kodu (`odemeOzeti`, `odemeTablosu`, indirim rozeti):
  veri boş olduğu için hiçbir şey göstermiyor, fiyatlar geri eklendiğinde
  yeniden yazmak gerekmesin diye duruyor.
- Hukuki sayfalardaki (mesafeli satış, ön bilgilendirme, iptal-iade) genel
  ödeme/iade maddeleri — tutar içermiyor, mevzuat metni.