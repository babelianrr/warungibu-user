export default function currencyConverter(num) {
  // return `Rp. ${num.toLocaleString()}`
  if (!num) {
    return '-'
  }

  return num.toLocaleString({minimumFractionDigits: 0})
  // return num.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0})

  // Deprecating this since old browser doesn't support Intl yet.
  // return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}).format(num)
}

