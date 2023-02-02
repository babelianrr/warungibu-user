import {useContext} from 'react'
import {useMutation} from 'react-query'
import Link from 'next/link'
import {useRouter} from 'next/router'
import useCreateOrder from 'hooks/useCreateOrder'

import {CheckoutContext} from 'contexts/CheckoutContext'
import {Button} from '@/components/button'
import {Card, Input, HorizontalDivider} from '../base'

import currencyConverter from 'helpers/currencyConverter'
import {fetchAuthPost} from 'helpers/fetch'
import {ADMIN_FEE} from 'helpers/config'

// @deprecated in the latest flow we don't use this component anymore
export default function PaymentAccount({carts}) {
  const router = useRouter()
  const {isLoading, mutate} = useCreateOrder((data) => router.push(`/checkout/finish?order_id=${data.id}`))

  const {value, setValue} = useContext(CheckoutContext)
  const discount = value.isDiscount ? Math.ceil((value.totalPrice * 1) / 100) : 0
  const adminFee = value.isAdminFee ? ADMIN_FEE : 0
  const totalPurchase = Math.ceil(value.totalPurchase - discount + adminFee)

  function handlePayment() {
    const payload = {
      shipment: {
        address_id: '5f462474-48d0-45ea-a91f-7b32bd9eff3d', // Later using real address
        location: carts[0].location,
      },
      payment: {
        total_price: totalPurchase,
        payment_method: value.paymentMethod,
        account_name: value.accountName,
        account_number: value.accountNumber,
        payment_channel: value.paymentChannel,
      },
      carts: carts.map((item) => item.id),
    }

    mutate(payload)
  }

  return (
    <div className="mt-2 text-left">
      <Card>
        <section className="flex justify-between items-center mb-4">
          <h4 className="text-base text-gray-800 font-semibold leading-4 pt-1">BCA Virtual Account</h4>
          <img
            src="https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png"
            alt="payment"
            className="w-14  bg-cover object-center"
          />
        </section>
        <HorizontalDivider className="mb-4" />

        <section>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1 text-gray-700">
              <span>
                Total Harga <span className="font-semibold">{`${value.totalProduct} Barang`}</span>
              </span>
              <span>{currencyConverter(value.totalPrice)}</span>
            </div>
            {value.isDiscount && (
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>Discount (1%)</span>
                <span>- {currencyConverter(discount)}</span>
              </div>
            )}
            {value.isAdminFee && (
              <div className="flex justify-between text-sm text-gray-700 mb-3">
                <span>Biaya Layanan</span>
                <span>{currencyConverter(3000)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>Pajak (11%)</span>
              <span>{currencyConverter(Math.ceil(value.tax))}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
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

        <section className="space-y-4 mb-6">
          <Input
            id="account-number"
            label="Nomor Rekening"
            onChange={(text) => setValue({...value, accountNumber: text})}
          />
          <Input
            id="account-name"
            label="Nama Pemilik Rekening"
            onChange={(text) => setValue({...value, accountName: text})}
          />
        </section>

        <section className="ml-4 mb-6">
          <ul className="text-gray-500 space-y-1 text-xs list-disc list-outside">
            <li>Masukan info terkait di atas sesuai pada buku tabungan.</li>
            <li>
              Untuk pembayaran lewat teller, isi “No Rekening” dengan 0000. Lalu isi “Nama Pemilik Rekening” dengan nama
              Anda.
            </li>
          </ul>
        </section>

        <section>
          {/* <Link href="/checkout/finish">
            <a> */}
          <Button className="w-full" type={isLoading ? Button.PROCESSING : ''} onClick={handlePayment}>
            Bayar
          </Button>
          {/* </a> */}
          {/* </Link> */}
        </section>
      </Card>
    </div>
  )
}
