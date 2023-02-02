import {useContext, useState} from 'react'
import {useMutation} from 'react-query'
import {useRouter} from 'next/router'
import currencyConverter from 'helpers/currencyConverter'
import {fetchAuthPost} from 'helpers/fetch'

import {Card, HorizontalDivider} from '../../base'
import {Button} from '@/components/button'
import {CheckoutContext} from 'contexts/CheckoutContext'
import {ADMIN_FEE} from 'helpers/config'

export default function UpdatePaymentInfo({goTo, carts}) {
  const router = useRouter()
  const {value} = useContext(CheckoutContext)
  const [error, setError] = useState({})

  const {isLoading, mutate} = useMutation(
      'update/order',
      (payload) => fetchAuthPost(`orders/${value.orderId}`, payload, 'PATCH'),
      {
        onSuccess(data) {
          router.push(`/checkout/finish?order_id=${data.id}`)
        },
        onError(err) {
          setError(err)
        },
      }
  )

  const discount =
      value.isDiscount && value.discount_value !== 0 ? Math.ceil(value.totalPrice * (value.discount_value / 100)) : 0
  const adminFee = value.isAdminFee ? ADMIN_FEE : 0
  const totalPurchase = Math.ceil(value.totalPurchase - discount + adminFee)

  function handlePayment() {
    const payload = {
      payment: {
        total_price: totalPurchase - adminFee, // Admin fee will be charged from backend,
        payment_method: value.paymentMethod,
        payment_channel: value.paymentChannel,
        // total_price: totalPurchase - adminFee, // Admin fee will be charged from backend
        // payment_method: value.paymentMethod,
        // account_name: value.accountName,
        // account_number: value.accountNumber,
        // payment_channel: value.paymentChannel,
      },
    }


    mutate(payload)
    // if (value.paymentMethod === 'BANK_TRANSFER') {
    //   goTo('PaymentAccount')
    // } else {

    // }
  }

  return (
      <div className="mt-2 text-left">
        <Card>
          <section className="flex justify-between items-center mb-4">
            <h4 className="text-base text-gray-800 font-semibold leading-4 pt-1">{value.paymentInfo.name}</h4>
            <img src={value.paymentInfo.imageUrl} alt="payment" className="w-14  bg-cover object-center" />
          </section>
          <HorizontalDivider className="mb-4" />

          <section>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-700 mb-3">
              <span>
                Total Harga <span className="font-semibold">{`${value.totalProduct} Barang`}</span>
              </span>
                <span>{currencyConverter(value.totalPrice)}</span>
              </div>
              {value.discount_value !== 0 && (
                  <div className="flex justify-between text-sm text-gray-700 mb-3">
                    <span>Discount ({value.discount_value}%)</span>
                    <span className="text-red-600">- {currencyConverter(discount)}</span>
                  </div>
              )}
              {value.isAdminFee && (
                  <div className="flex justify-between text-sm text-gray-700 mb-3">
                    <span>Biaya Layanan</span>
                    <span>{currencyConverter(adminFee)}</span>
                  </div>
              )}
              <div className="flex justify-between text-sm text-gray-700 mb-3">
                <span>Pajak (11%)</span>
                <span>{currencyConverter(value.tax)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 mb-3">
                <span>Ongkos Kirim</span>
                <span>{currencyConverter(value.shipmentFee)}</span>
              </div>
            </div>

            <div className="flex justify-between text-gray-700 text-sm items-center mb-6">
              <span>Total Tagihan</span>
              <span className="text-lg text-dnr-dark-orange font-semibold leading-8">
              {currencyConverter(totalPurchase)}
            </span>
            </div>
          </section>

          <HorizontalDivider className="mb-4" />

          <section className="ml-4 mb-6">
            <ul className="text-gray-500 space-y-1 text-xs list-disc list-outside">
              <li>Transaksi ini akan otomatis menggantikan tagihan BCA Virtual Account yang belum dibayar.</li>
              <li>Dapatkan kode pembayaran setelah klik “Bayar”.</li>
              <li>Tidak disarankan bayar melalui bank lain agar transaksi dapat diproses tanpa kendala.</li>
            </ul>
          </section>

          <section>
            <Button className="w-full" type={isLoading ? Button.PROCESSING : ''} onClick={handlePayment}>
              Bayar
            </Button>
            {error.message ? <p className="text-red-500 text-sm mb-2">{error.message}</p> : null}
          </section>
        </Card>
      </div>
  )
}
