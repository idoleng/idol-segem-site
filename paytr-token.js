/* ============================================================
   PayTR iFrame API — 1. ADIM: Ödeme token'ı üretimi
   ------------------------------------------------------------
   Bu dosya SUNUCUDA çalışır. merchant_key ve merchant_salt
   asla tarayıcıya gönderilmez; ortam değişkeni olarak tutulur.

   Vercel'de Settings > Environment Variables altına eklenecekler:
     PAYTR_MERCHANT_ID
     PAYTR_MERCHANT_KEY
     PAYTR_MERCHANT_SALT
     SITE_URL          (örn. https://www.idolsegem.com)
     PAYTR_TEST_MODE   (test için 1, canlıda 0)
   ============================================================ */

const crypto = require('crypto');

/* ---- Fiyat listesi — TEK DOĞRU KAYNAK -----------------------
   Tarayıcıdan gelen tutara ASLA güvenilmez. Kullanıcı yalnızca
   ürün kodu ve adet gönderir; tutar burada hesaplanır.
   Fiyatlar TL cinsindendir. index.html içindeki ODENEBILIR
   listesiyle aynı tutulmalıdır.
------------------------------------------------------------- */
const FIYATLAR = {
  'lgs-8':     { ad: 'LGS Hazirlik Programi 8. Sinif', tutar: 7500, saatlik: false },
  'lgs-7':     { ad: 'LGS Temel Program 7. Sinif',     tutar: 5900, saatlik: false },
  'ingilizce': { ad: 'Ingilizce Kursu A1-A2',          tutar: 4900, saatlik: false }
};

const MAX_ADET = 40;

/* PayTR bazı alanlarda Türkçe karakter kabul etmez. */
function sadelestir(metin) {
  return String(metin)
    .replace(/ı/g, 'i').replace(/İ/g, 'I')
    .replace(/ş/g, 's').replace(/Ş/g, 'S')
    .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
    .replace(/ü/g, 'u').replace(/Ü/g, 'U')
    .replace(/ö/g, 'o').replace(/Ö/g, 'O')
    .replace(/ç/g, 'c').replace(/Ç/g, 'C')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();
}

function istemciIp(req) {
  const iletilen = req.headers['x-forwarded-for'];
  if (iletilen) return String(iletilen).split(',')[0].trim();
  return req.headers['x-real-ip'] || (req.socket && req.socket.remoteAddress) || '';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ status: 'error', reason: 'Yalnizca POST kabul edilir.' });
    return;
  }

  const MERCHANT_ID   = process.env.PAYTR_MERCHANT_ID;
  const MERCHANT_KEY  = process.env.PAYTR_MERCHANT_KEY;
  const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT;
  const SITE_URL      = process.env.SITE_URL || '';
  const TEST_MODE     = process.env.PAYTR_TEST_MODE === '1' ? '1' : '0';

  if (!MERCHANT_ID || !MERCHANT_KEY || !MERCHANT_SALT || !SITE_URL) {
    res.status(500).json({ status: 'error', reason: 'Sunucu yapilandirmasi eksik. Ortam degiskenlerini kontrol edin.' });
    return;
  }

  try {
    const govde = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { kod, adet, ad, eposta, telefon, adres } = govde;

    /* --- Doğrulama --- */
    const urun = FIYATLAR[kod];
    if (!urun) {
      res.status(400).json({ status: 'error', reason: 'Gecersiz program secimi.' });
      return;
    }

    let miktar = 1;
    if (urun.saatlik) {
      miktar = parseInt(adet, 10);
      if (!Number.isFinite(miktar) || miktar < 1 || miktar > MAX_ADET) {
        res.status(400).json({ status: 'error', reason: 'Ders saati sayisi 1 ile ' + MAX_ADET + ' arasinda olmalidir.' });
        return;
      }
    }

    const adSoyad = sadelestir(ad).slice(0, 60);
    const ePosta  = String(eposta || '').trim().slice(0, 100);
    const tel     = String(telefon || '').replace(/[^\d+]/g, '').slice(0, 20);
    const adresi  = sadelestir(adres).slice(0, 400);

    if (adSoyad.length < 3 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ePosta) || tel.length < 10 || adresi.length < 5) {
      res.status(400).json({ status: 'error', reason: 'Iletisim bilgileri eksik veya hatali.' });
      return;
    }

    /* --- Tutar sunucuda hesaplanır --- */
    const toplamTL = urun.tutar * miktar;
    const payment_amount = String(Math.round(toplamTL * 100)); // kuruş

    /* --- Sipariş numarası: benzersiz, yalnızca harf ve rakam --- */
    const merchant_oid = 'IDOL' + Date.now() + crypto.randomBytes(3).toString('hex').toUpperCase();

    /* --- Sepet --- */
    const sepet = [[urun.ad, urun.tutar.toFixed(2), miktar]];
    const user_basket = Buffer.from(JSON.stringify(sepet)).toString('base64');

    const user_ip        = istemciIp(req);
    const no_installment = '0';
    const max_installment = '0';
    const currency       = 'TL';

    /* --- paytr_token: alan sırası PayTR dokümanındaki ile birebir aynı olmalıdır --- */
    const hashStr = MERCHANT_ID + user_ip + merchant_oid + ePosta + payment_amount +
                    user_basket + no_installment + max_installment + currency + TEST_MODE;
    const paytr_token = crypto
      .createHmac('sha256', MERCHANT_KEY)
      .update(hashStr + MERCHANT_SALT)
      .digest('base64');

    const alanlar = new URLSearchParams({
      merchant_id: MERCHANT_ID,
      user_ip,
      merchant_oid,
      email: ePosta,
      payment_amount,
      paytr_token,
      user_basket,
      debug_on: TEST_MODE,
      no_installment,
      max_installment,
      user_name: adSoyad,
      user_address: adresi,
      user_phone: tel,
      merchant_ok_url: SITE_URL + '/#/odeme-basarili',
      merchant_fail_url: SITE_URL + '/#/odeme-basarisiz',
      timeout_limit: '30',
      currency,
      test_mode: TEST_MODE,
      lang: 'tr'
    });

    const yanit = await fetch('https://www.paytr.com/odeme/api/get-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: alanlar.toString()
    });

    const sonuc = await yanit.json();

    if (sonuc.status === 'success') {
      console.log('[PayTR] token alindi', { merchant_oid, toplamTL, kod, miktar });
      res.status(200).json({ status: 'success', token: sonuc.token });
    } else {
      console.error('[PayTR] token hatasi', sonuc);
      res.status(502).json({ status: 'error', reason: sonuc.reason || 'PayTR token uretmedi.' });
    }
  } catch (hata) {
    console.error('[PayTR] beklenmeyen hata', hata);
    res.status(500).json({ status: 'error', reason: 'Sunucu hatasi.' });
  }
};
