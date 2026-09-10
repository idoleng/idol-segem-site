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
