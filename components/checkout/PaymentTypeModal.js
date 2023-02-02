import {useContext, useEffect, useState, useRef} from 'react'
import {useRouter} from 'next/router'
import {Button} from '@/components/button'
import {Modal, HorizontalDivider, SelectInput} from '../base'
import {CheckoutContext} from 'contexts/CheckoutContext'
import {CartCountContext} from 'contexts/CartCountContext'
import currencyConverter from 'helpers/currencyConverter'
import useCreateOrder from 'hooks/useCreateOrder'

export default function PaymentTypeMethod({open, setOpen, DISCOUNT_VALUE, carts, mainAddress, setPaymentModal}) {
  const router = useRouter()
  const {value} = useContext(CheckoutContext)
  const {setValue: setCountValue} = useContext(CartCountContext)
  const type = [
    {
      id: 1,
      value: `Pembayaran Langsung (Diskon ${DISCOUNT_VALUE}%)`,
    },
    {
      id: 2,
      value: `Pembayaran COD (Diskon ${DISCOUNT_VALUE}%)`,
      key: 'Pembayaran COD',
      identifier: 'CASH_ON_DELIVERY',
    },
    {
      id: 3,
      value: 'Pembayaran Tempo (30 Hari)',
      key: 'Pembayaran Tempo',
      identifier: 'LOAN',
    },
  ]
  const [paymentMethod, setPaymentMethod] = useState(type[0])
  const [discount, setDiscount] = useState(Math.ceil(value.totalPrice * (DISCOUNT_VALUE / 100)))
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   if (paymentMethod?.id !== 3) {
  //     setDiscount(Math.ceil(value.totalPrice * (DISCOUNT_VALUE / 100)))
  //   } else {
  //     setDiscount(0)
  //   }
  // }, [paymentMethod])

  const {
    isLoading: isCreateOrder,
    mutate: createOrder,
    isError,
  } = useCreateOrder(
    (response) => {
      setCountValue({count: 0})
      // router.push(`/profile/transaksi/detail?state=${paymentMethod.key}&order_id=${response.id}`)
      router.push(`/profile/transaksi/detail?state=Sedang%20Diproses&order_id=${response.id}`)
      setOpen(false)
    },
    (err) => {
      setError(err)
    }
  )

  function handleCreateOrder() {
    // if (paymentMethod.id === 1) {
    //   setPaymentModal(true)
    //   return
    // }

    const payload = {
      shipment: {
        address_id: mainAddress.id, // Later using real address
        location: carts[0].location,
      },
      payment: {
        total_price: value.totalPrice + value.tax - discount,
        payment_type: 'LOAN',
        // payment_type: paymentMethod.identifier,
      },
      carts: carts.map((item) => item.id),
    }

    createOrder(payload)
  }

  return (
    <Modal open={open} setOpen={setOpen} overflowHidden={false}>
      <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
        Ringkasan Belanja
      </Modal.Title>
      <HorizontalDivider />
      <div className="mt-2 text-left mx-4">
        {/* <section className="mb-6">
          <div className="">
            {type.map((item) => (
              <div className="mb-5" key={item.id}>
                <Card className="px-2 flex items-center cursor-pointer" onClick={() => handleTypeClick(item)}>
                  <h6 className="flex-1 text-gray-900 ml-6 leading-4 font-semibold  pt-1">{item.value}</h6>
                  <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                </Card>
              </div>
            ))}
          </div>
        </section> */}
        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span>
            Total Harga <span className="font-semibold">{`${value.totalProduct} Barang`}</span>
          </span>
          <span>{currencyConverter(value.totalPrice)}</span>
        </div>
        {discount ? (
          <div className="flex justify-between text-sm text-gray-700 mb-3">
            <span>Discount ({DISCOUNT_VALUE}%)</span>
            <span className="text-red-500">- {currencyConverter(discount)}</span>
          </div>
        ) : null}
        {/* <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span>Pajak (11%)</span>
          <span>{currencyConverter(value.tax)}</span>
        </div> */}
        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span>Ongkos Kirim</span>
          <span>{currencyConverter(value.shipmentFee)}</span>
        </div>

        <HorizontalDivider className="mb-4" />
        <div className="flex justify-between text-gray-700 text-sm items-center mb-6">
          <span>Total Tagihan</span>
          <span className="text-lg text-dnr-dark-orange font-semibold leading-8">
            {currencyConverter(value.totalPurchase - discount)}
          </span>
        </div>

        {/* <div className="relative mb-4">
          <SelectInput
            onChange={(value) => setPaymentMethod(value)}
            defaultValue={paymentMethod}
            data={type}
            placeholder="Jenis Pembayaran"
            id="payment-type"
            label="Jenis Pembayaran"
          />
        </div> */}
        <Button
          className="w-full mb-4"
          type={paymentMethod === null ? 'disabled' : isError ? '' : isCreateOrder ? Button.PROCESSING : ''}
          onClick={handleCreateOrder}
        >
          Bayar
        </Button>
        {error?.message ? <p className="text-red-500 text-sm mb-2">{error.message}</p> : null}
      </div>
    </Modal>
  )
}
