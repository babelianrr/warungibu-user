import { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { PlusCircleIcon, ChevronDownIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { Breadcrumb, Card, HorizontalDivider, SelectInput } from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import { Button, GrayBorderButton } from '@/components/button'
import { AddressBox } from '@/components/address'
import { AddressModal, PaymentModal, Item, CheckoutSummaryMobile } from '@/components/checkout'

import { CheckoutContext, CheckoutProvider } from '../../contexts/CheckoutContext'
import { CartCountContext } from 'contexts/CartCountContext'
import useCreateOrder from 'hooks/useCreateOrder'
import ProtectedRoute from '@/components/HOC/ProtectedRoute'

import currencyConverter from 'helpers/currencyConverter'
import { fetchAuthGet } from 'helpers/fetch'
import { authenticatedUser } from 'helpers/isAuthenticated'

function Checkout() {
  const router = useRouter()
  const { data, isLoading } = useQuery('checkout/carts', () => fetchAuthGet('carts'))
  const userId = authenticatedUser().id
  // Address
  const { data: addressData, isLoading: isLoadingAddress } = useQuery(['address', userId], () =>
    // fetchAuthGet(`outlet_addresses`)
    fetchAuthGet(`users/${userId}`)
  )
  // const mainAddress = addressData?.find((address) => address.is_main)
  const mainAddress = addressData?.outlet_types_id
  // return <></>
  const [adressModal, setAddressModal] = useState(false)

  const [address, setAddress] = useState(false)
  const [activeAddress, setActiveAddress] = useState(false)

  function onChangeAddress(activeAddress) {
    const newAddress = address.map((address) => {
      if (address.id === activeAddress.id) {
        return { ...address, active: true }
      }
      return { ...address, active: false }
    })

    setAddress(newAddress)
    setActiveAddress(activeAddress)
    setAddressModal(false)
  }

  // payment
  const { setValue: setCountValue } = useContext(CartCountContext)
  const [paymentModal, setPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState()
  const [error, setError] = useState(null)
  // detail payment
  const DISCOUNT_VALUE = 0
  // const DISCOUNT_VALUE = 0.9
  const TOTAL_PRICE = data?.reduce((prev, curr) => prev + curr.final_unit_price, 0)
  // const TAX = Math.ceil(TOTAL_PRICE * (11 / 100)) // 11%
  const SHIPMENT_FEE = 0
  const discount = useRef(0)

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

  const { isLoading: isCreateOrder, mutate: createOrder } = useCreateOrder(
    (response) => {
      setCountValue({ count: 0 })
      // router.push(`/profile/transaksi/detail?state=${paymentMethod.key}&order_id=${response.id}`)
      router.push(`/profile/transaksi/detail?state=Sedang%20Diproses&order_id=${response.id}`)
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
        // address_id: mainAddress.id, // Later using real address
        address_id: mainAddress.id, // Later using real address
        location: data[0].location,
      },
      payment: {
        // total_price: TOTAL_PRICE + TAX - discount.current,
        total_price: TOTAL_PRICE - discount.current,
        payment_type: 'LOAN',
        // payment_type: paymentMethod.identifier,
        // payment_type: paymentMethod.type,
      },
      carts: data.map((item) => item.id),
    }

    createOrder(payload)
  }

  return (
    <CheckoutProvider>
      <MainLayout
        backTo="/carts"
        BottomComponent={() => (
          <CheckoutSummaryMobile
            carts={data}
            mainAddress={mainAddress}
            DISCOUNT_VALUE={DISCOUNT_VALUE}
            error={error}
            setPaymentModal={setPaymentModal}
          />
        )}
      >
        <AddressModal
          open={adressModal}
          setOpen={setAddressModal}
          address={addressData}
          setActiveAddress={onChangeAddress}
        />
        <PaymentModal
          open={paymentModal}
          setOpen={setPaymentModal}
          carts={data}
          mainAddress={mainAddress}
          discount={discount}
        />

        <main className="mx-auto text-gray-900 py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl">
          <section className="mb-4 hidden sm:block">
            <Breadcrumb
              path={[{ name: 'Beranda', path: '/' }, { name: 'Keranjang Belanja', path: '/carts' }, 'Checkout']}
            />
          </section>
          <div className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start">
            <div className="flex-1 w-full space-y-2">
              <Card padding="px-4 py-3">
                <h1 className="text-xl leading-7 tracking-none font-medium">Checkout</h1>
              </Card>

              <Card>
                <div className="flex justify-between mb-4 items-center">
                  <h2 className="hidden sm:block text-base leading-8">Alamat Pengiriman</h2>
                  <h2 className="block sm:hidden text-base leading-8">Alamat Pengiriman</h2>
                  {/* <div className="flex space-x-1 items-center text-gray-300 cursor-not-allowed text-sm">
                    <span>Pilih Alamat lain</span>
                    <ChevronDownIcon className="w-3 h-3" />
                  </div> */}
                  {/* <div className="flex space-x-2 items-center text-sm">
                    <div className="flex space-x-1 items-center">
                      <span>Pilih Alamat lain</span>
                      <ChevronDownIcon className="w-3 h-3" />
                    </div>
                    <GrayBorderButton className="py-2 text-gray-700" onClick={() => setAddressModal(true)}>
                      <PlusCircleIcon className="w-4 h-4" />
                      <span>Tambah Alamat</span>
                    </GrayBorderButton>
                  </div> */}
                </div>
                {/* <div className="flex flex-col sm:hidden mb-4">
                  <h2 className="text-base leading-8">Alamat Pengiriman</h2>
                  <HorizontalDivider className="mb-4" />
                  <div className="flex space-x-2 items-center text-sm">
                    <div className="flex flex-1 space-x-1 items-center">
                      <span>Pilih Alamat lain</span>
                      <ChevronDownIcon className="w-3 h-3" />
                    </div>
                    <GrayBorderButton className="py-2 text-gray-700 flex-1" onClick={() => setAddressModal(true)}>
                      <PlusCircleIcon className="w-4 h-4" />
                      <span>Tambah Alamat</span>
                    </GrayBorderButton>
                  </div>
                </div> */}
                {isLoading ? (
                  <p className="py-4 text-gray-700 text-center text-base">Proses Pengambilan Data</p>
                ) : (
                  // 'hahah'
                  <AddressBox
                    className="mb-1"
                    address={{
                      id: mainAddress?.id,
                      active: true,
                      // label: mainAddress?.label,
                      // description: mainAddress?.full_address + ' ' + mainAddress?.city + ' ' + mainAddress?.province,
                      description: mainAddress?.address,
                    }}
                  />
                )}
              </Card>

              <Card className="mb-4">
                <h2 className="text-sm  leading-8">Rincian Pesanan</h2>

                {isLoading ? (
                  <h1>Proses Pengambilan Data</h1>
                ) : (
                  <ul className="divide-y space-y-6 divide-gray-300 divide-dashed list-none bg-gray-50 p-2 px-4 rounded-md">
                    {data.map((cart) => (
                      <Item key={cart.id} cart={cart} />
                    ))}
                  </ul>
                )}
              </Card>

              <Card>
                <GrayBorderButton
                  as="div"
                  hoverState={false}
                  padding="py-1 px-2 sm:px-4 sm:py-3"
                  className="flex flex-col sm:flex-row justify-between sm:items-center w-full text-gray-500 text-sm"
                >
                  <p className="flex-1 leading-none text-left">
                    {/* Dikirim dari <span className="text-gray-700 font-semibold">{data ? data[0]?.location : ''}</span> */}
                    Dikirim dari <span className="text-gray-700 font-semibold">Gudang</span>
                  </p>
                </GrayBorderButton>
              </Card>
            </div>
            {isLoading ? (
              <Card className="p-6 text-gray-900 hidden sm:block sm:w-1/4">
                <h1>Proses</h1>
              </Card>
            ) : (
              <SummaryOrder
                carts={data}
                mainAddress={mainAddress}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                type={type}
                DISCOUNT_VALUE={DISCOUNT_VALUE}
                TOTAL_PRICE={TOTAL_PRICE}
                // TAX={TAX}
                SHIPMENT_FEE={SHIPMENT_FEE}
                discount={discount}
                isCreateOrder={isCreateOrder}
                handleCreateOrder={handleCreateOrder}
                error={error}
              />
            )}
          </div>
        </main>
      </MainLayout>
    </CheckoutProvider>
  )
}

function SummaryOrder({
  carts,
  paymentMethod,
  setPaymentMethod,
  mainAddress,
  type,
  DISCOUNT_VALUE,
  TOTAL_PRICE,
  // TAX,
  SHIPMENT_FEE,
  discount,
  isCreateOrder,
  handleCreateOrder,
  error,

}) {
  const { value, setValue } = useContext(CheckoutContext)
  const { data: paymentTermData, isLoading: isLoadingPaymentTerm } = useQuery(['payment_term', authenticatedUser().id], () =>
    fetchAuthGet(`payment_terms/active`)
  )

  const paymentData = [
    paymentTermData && (
      paymentTermData.map((v, k) => {
        return (
          {
            id: v.id,
            value: v.name,
            key: v.name,
            identifier: v.type,
          }
        )
      })
    )
  ]

  useEffect(() => {
    // if (paymentMethod?.id !== 3) {
    //   discount.current = Math.ceil(value.totalPrice * (DISCOUNT_VALUE / 100))
    // } else {
    //   discount.current = 0
    // }
    if (paymentMethod?.identifier === 'CASH_ON_DELIVERY') {
      discount.current = Math.ceil(value.totalPrice * (DISCOUNT_VALUE / 100))
    } else {
      discount.current = 0
    }
    setValue({
      totalProduct: carts.length,
      totalPrice: TOTAL_PRICE,
      // tax: TAX,
      shipmentFee: 0,
      // totalPurchase: Math.ceil(TOTAL_PRICE + TAX + SHIPMENT_FEE),
      totalPurchase: Math.ceil(TOTAL_PRICE + SHIPMENT_FEE),
      discount_value: DISCOUNT_VALUE,
      mainAddress,
    })
  }, [carts, paymentMethod])

  return (
    <div className="text-gray-900 hidden sm:block sm:w-1/4 sm:space-y-2">
      <Card padding="px-4 py-2">
        <h4 className="text-lg">Ringkasan Belanja</h4>
      </Card>

      <Card>
        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span>
            Total Harga <span className="font-semibold">{`${value.totalProduct} Barang`}</span>
          </span>
          <span>{currencyConverter(value.totalPrice)}</span>
        </div>
        {paymentMethod && paymentMethod?.id !== 3 ? (
          <div className="flex justify-between text-sm text-gray-700 mb-3">
            {/* <span>Discount ({DISCOUNT_VALUE}%)</span> */}
            <span>Discount ({DISCOUNT_VALUE}%)</span>
            <span className="text-red-500">- {currencyConverter(discount.current)}</span>
          </div>
        ) : null}
        {/* {paymentMethod && paymentMethod?.identifier === 'CASH_ON_DELIVERY' ? (
          <div className="flex justify-between text-sm text-gray-700 mb-3">
            <span>Discount ({DISCOUNT_VALUE}%)</span>
            <span className="text-red-500">- {currencyConverter(discount.current)}</span>
          </div>
        ) : null} */}
        {/* <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span>Pajak (11%)</span>
          <span>{currencyConverter(value.tax)}</span>
        </div> */}
        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span>Ongkos Kirim</span>
          <span>{currencyConverter(value.shipmentFee)}</span>
        </div>
        <HorizontalDivider className="border-dashed" color="bg-gray-500" />
        <div className="flex justify-between text-gray-700 text-sm items-center">
          <span>Total Tagihan</span>
          <span className="text-lg text-gray-900 font-semibold leading-8">
            {currencyConverter(value.totalPurchase - discount.current)}
          </span>
        </div>
      </Card>

      <Card>
        {/* <div className="relative mb-4">
          <SelectInput
            onChange={(value) => setPaymentMethod(value)}
            data={paymentData[0]}
            // data={type}
            placeholder="Jenis Pembayaran"
            id="payment-type"
            label="Jenis Pembayaran"
          />
        </div> */}

        <Button
          className="w-full mb-4"
          // type={paymentMethod === undefined ? 'disabled' : isCreateOrder ? Button.PROCESSING : ''}
          type={isCreateOrder ? Button.PROCESSING : ''}
          onClick={handleCreateOrder}
        >
          Bayar
        </Button>
        {error?.message ? <p className="text-red-500 text-sm mb-2">{error.message}</p> : null}
      </Card>
    </div>
  )
}

export default ProtectedRoute(Checkout)
