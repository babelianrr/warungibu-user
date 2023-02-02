export const OrderStatus = {
  waiting: 'Menunggu Pembayaran',
  arrived: 'Telah Sampai',
  ongoing: 'Sedang Dikirim',
  writeReview: 'Need Review',
  finished: 'Transaksi Selesai',
  expired: 'Pesanan Kadaluarsa',
  processed: 'Sedang Diproses',
  cod: 'Pembayaran COD',
  tempo: 'Pembayaran Tempo',
}

export const ReturStatus = {
  waiting: 'Menunggu Persutujuan',
  confirmed: 'Disetujui',
  rejected: 'Ditolak',
  approved: 'Ajukan Pickup',
  waitingPickup: 'Menunggu Dipickup',
  pickedUp: 'Telah Dipickup',
  canceled: 'Dibatalkan',
  returned: 'Barang Sudah Dikirim Kembali',
  finished: 'Selesai',
}

export const BackendOrderStatus = {
  ORDERED: 'ORDERED',
  PROCESSED: 'PROCESSED',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
  ONGOING: 'ONGOING',
  CANCELED: 'CANCELED',
}
