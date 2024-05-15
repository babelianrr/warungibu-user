export function generatePaymentStep(va, bank) {
  if (!va || !bank) {
    return ''
  }

  const first5Number = va.substring(0, 5)

  const paymentSteps = {
    MANDIRI: {
      ATM: [
        `Masukkan ATM dan tekan "Bahasa Indonesia"`,
        `Masukkan PIN, lalu tekan "Benar"`,
        `Pilih "Pembayaran", lalu pilih "Multi Payment"`,
        `Masukkan kode perusahaan '${first5Number}' (${first5Number} XENDIT), lalu tekan 'BENAR'`,
        `Masukkan Nomor Virtual Account ${va}, lalu tekan 'BENAR' Masukkan nominal yang ingin di transfer, lalu tekan "BENAR"`,
        `Informasi pelanggan akan ditampilkan, pilih nomor 1 sesuai dengan nominal pembayaran kemudian tekan "YA"`,
        `Konfirmasi pembayaran akan muncul, tekan "YES", untuk melanjutkan`,
      ],
      IBanking: [
        `Buka situs Mandiri Internet Banking <a href="https://ibank.bankmandiri.co.id>https://ibank.bankmandiri.co.id"</a>`,
        `Masuk menggunakan USER ID dan PASSWORD anda`,
        `Buka halaman beranda, kemudian pilih "Pembayaran"`,
        `Pilih "Multi Payment"`,
        `Pilih ${first5Number} XENDIT sebagai penyedia jasa`,
        `Masukkan Nomor Virtual Account ${va}`,
        `Lalu pilih Lanjut`,
        `Apabila semua detail benar tekan "KONFIRMASI"`,
        `Masukkan PIN / Challenge Code Token`,
      ],
      MBanking: [
        `Buka aplikasi Mandiri Online, masukkan USERNAME dan PASSWORD anda`,
        `Pilih "Bayar"`,
        `Pilih "Multipayment"`,
        `Pilih ${first5Number} XENDIT sebagai penyedia jasa`,
        `Masukkan Nomor Virtual Account ${va}`,
        `Tekan Lanjut`,
        `Tinjau dan konfirmasi detail transaksi anda, lalu tekan Konfirmasi`,
        `Selesaikan transaksi dengan memasukkan MPIN anda`,
      ],
    },
    BRI: {
      ATM: [
        `Masukkan kartu, kemudian pilih bahasa dan masukkan PIN anda`,
        `Pilih "Transaksi Lain" dan pilih "Pembayaran"`,
        `Pilih menu "Lainnya" dan pilih "Briva"`,
        `Masukkan Nomor Virtual Account ${va} dan jumlah yang ingin anda bayarkan`,
        `Periksa data transaksi dan tekan "YA"`,
      ],
      IBanking: [
        `Buka situs <a href="https://ib.bri.co.id/ib-bri/">https://ib.bri.co.id/ib-bri/</a>, dan masukkan USER ID dan PASSWORD anda`,
        `Pilih "Pembayaran" dan pilih "Briva"`,
        `Masukkan Nomor Virtual Account ${va} dan jumlah yang ingin anda bayarkan`,
        `Masukkan password anda kemudian masukkan mToken internet banking`,
      ],
      MBanking: [
        `Buka aplikasi BRI Mobile Banking, masukkan USER ID dan PIN anda`,
        `Pilih "Pembayaran" dan pilih "Briva"`,
        `Masukkan Nomor Virtual Account ${va} dan jumlah yang ingin anda bayarkan`,
        `Masukkan PIN Mobile Banking BRI`,
      ],
    },
    BNI: {
      ATM: [
        `Masukkan kartu ATM anda`,
        `Pilih bahasa`,
        `Masukkan PIN ATM anda`,
        `Pilih "Menu Lainnya"`,
        `Pilih "Transfer"`,
        `Pilih jenis rekening yang akan anda gunakan (contoh: "Dari Rekening Tabungan")`,
        `Pilih "Virtual Account Billing"`,
        `Masukkan Nomor Virtual Account anda ${va}`,
        `Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi`,
        `Konfirmasi, apabila telah sesuai, lanjutkan transaksi`,
      ],
      IBanking: [
        `Buka situs <a href="https://ibank.bni.co.id">https://ibank.bni.co.id</a>`,
        `Masukkan User ID dan Password`,
        `Pilih menu "Transfer"`,
        `Pilih menu "Virtual Account Billing"`,
        `Masukkan Nomor Virtual Account anda ${va}`,
        `Lalu pilih rekening debet yang akan digunakan. Kemudian tekan "Lanjut"`,
        `Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi`,
        `Masukkan Kode Otentikasi Token`,
      ],
      MBanking: [
        `Akses BNI Mobile Banking melalui handphone`,
        `Masukkan User ID dan Password`,
        `Pilih menu "Transfer"`,
        `Pilih menu "Virtual Account Billing", lalu pilih rekening debet`,
        `Masukkan Nomor Virtual Account anda ${va} pada menu "Input Baru`,
        `Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi`,
        `Konfirmasi transaksi dan masukkan Password Transaksi`,
      ],
    },
    PERMATA: {
      ATM: [
        `Masukkan kartu ATM Permata anda`,
        `Masukkan PIN`,
        `Pilih menu "Transaksi Lainnya"`,
        `Pilih menu "Pembayaran"`,
        `Pilih menu "Pembayaran Lainnya"`,
        `Pilih menu "Virtual Account"`,
        `Masukkan Nomor Virtual Account ${va}`,
        `Lalu pilih rekening debet yang akan digunakan`,
        `Konfirmasi detail transaksi anda`,
      ],
      IBanking: [
        `Buka situs <a href="https://new.permatanet.com">https://new.permatanet.com</a>`,
        `Masukkan User ID dan Password`,
        `Pilih "Pembayaran Tagihan"`,
        `Pilih menu "Virtual Account"`,
        `Masukkan Nomor Virtual Account ${va}`,
        `Periksa kembali detail pembayaran anda`,
        `Masukkan otentikasi transaksi/token`,
      ],
      MBanking: [
        `Buka aplikasi PermataMobile Internet`,
        `Masukkan User ID dan Password`,
        `Pilih "Pembayaran Tagihan"`,
        `Pilih menu "Virtual Account"`,
        `Masukkan Nomor Virtual Account ${va}`,
        `Masukkan otentikasi transaksi/token`,
      ],
    },
    BCA: {
      ATM: [
        `Masukkan Kartu ATM BCA`,
        `Masukkan PIN`,
        `Pilih menu "Transaksi Lainnya"`,
        `Pilih menu "Transfer"`,
        `Pilih menu "ke Rekening BCA Virtual Account"`,
        `Masukkan Nomor Virtual Account Anda ${va}. Tekan "Benar" untuk melanjutkan`,
        `Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai seperti No VA, Nama, Perus/Produk dan Total Tagihan, tekan "Benar" untuk melanjutkan`,
        `Pastikan nama kamu dan Total Tagihannya benar`,
        `Tekan "Ya" jika sudah benar`,
      ],
      IBanking: [
        `Lakukan log in pada aplikasi KlikBCA Individual (<a href="https://ibank.klikbca.com">https://ibank.klikbca.com</a>)`,
        `Masukkan User ID dan PIN`,
        `Pilih "Transfer Dana", kemudian pilih "Transfer ke BCA Virtual Account"`,
        `Masukkan Nomor Virtual Account 1076663935753`,
        `Pilih "Lanjutkan"`,
        `Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token BCA anda, kemudian tekan tombol "Kirim"`,
      ],
      MBanking: [
        `Buka aplikasi BCA Mobile`,
        `Pilih menu "m-BCA", kemudian masukkan kode akses m-BCA`,
        `Pilih "m-Transfer", kemudian pilih "BCA Virtual Account"`,
        `Masukkan Nomor Virtual Account anda ${va}, kemudian tekan "OK"`,
        `Tekan tombol "Kirim" yang berada di sudut kanan atas aplikasi untuk melakukan transfer`,
        `Tekan "OK" untuk melanjutkan pembayaran`,
        `Masukkan PIN Anda untuk meng-otorisasi transaksi`,
      ],
    },
  }

  return paymentSteps[bank]
}
