/* ============================================================
   PayTR iFrame API — 2. ADIM: Bildirim (callback) sayfası
   ------------------------------------------------------------
   PayTR, ödeme sonucunu bu adrese POST eder. Ödemenin gerçekten
   tamamlandığını ANLAYACAĞINIZ TEK YER burasıdır — kullanıcının
   yönlendirildiği "başarılı" sayfası değil.

   ÖNEMLİ: Bu adres, PayTR Mağaza Paneli > Ayarlar > Bildirim URL
   alanına yazılmalıdır:
     https://www.idolegitimkurumlari.com.tr/api/paytr-bildirim

   Yanıt olarak MUTLAKA düz "OK" metni dönmelidir. Aksi hâlde
   PayTR bildirimi başarısız sayar ve tekrar tekrar gönderir.
   ============================================================ */

const crypto = require('crypto');

/* Vercel'in gövdeyi otomatik ayrıştırmasını kapatıyoruz:
   form-urlencoded veriyi kendimiz okumak daha güvenilir. */
module.exports.config = { api: { bodyParser: false } };

function govdeyiOku(req) {
  return new Promise((coz, reddet) => {
    let veri = '';
    req.on('data', parca => { veri += parca; });
    req.on('end', () => coz(veri));
    req.on('error', reddet);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Yalnizca POST');
    return;
  }

  const MERCHANT_KEY  = process.env.PAYTR_MERCHANT_KEY;
  const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT;

  try {
    const ham = await govdeyiOku(req);
    const alan = Object.fromEntries(new URLSearchParams(ham));

    const { merchant_oid, status, total_amount, hash } = alan;

    /* --- Bildirimin gerçekten PayTR'dan geldiğini doğrula --- */
    const beklenen = crypto
      .createHmac('sha256', MERCHANT_KEY)
      .update(merchant_oid + MERCHANT_SALT + status + total_amount)
      .digest('base64');

    if (beklenen !== hash) {
      console.error('[PayTR bildirim] HASH UYUSMADI — sahte bildirim olabilir', { merchant_oid });
      res.status(400).send('PAYTR notification failed: bad hash');
      return;
    }

    if (status === 'success') {
      /* Ödeme onaylandı. Sipariş burada kesinleşir.
         Veritabanı olmadığı için şimdilik yalnızca kayda geçiyoruz;
         işlemleri PayTR Mağaza Paneli üzerinden takip edin.
         İleride buraya e-posta gönderimi ya da bir tabloya yazma
         eklenebilir. */
      console.log('[PayTR bildirim] ODEME BASARILI', {
        merchant_oid,
        tutar: Number(total_amount) / 100,
        odeme_tipi: alan.payment_type,
        taksit: alan.installment_count
      });
    } else {
      console.log('[PayTR bildirim] ODEME BASARISIZ', {
        merchant_oid,
        kod: alan.failed_reason_code,
        mesaj: alan.failed_reason_msg
      });
    }

    /* PayTR bu yanıtı bekler. Başka hiçbir şey yazmayın. */
    res.status(200).send('OK');
  } catch (hata) {
    console.error('[PayTR bildirim] hata', hata);
    res.status(500).send('hata');
  }
};
