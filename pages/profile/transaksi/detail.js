import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { StarIcon } from '@heroicons/react/solid'
import { ClockIcon, DownloadIcon } from '@heroicons/react/outline'
import useOrderDetail from 'hooks/useOrderDetail'
import useCountdown from 'hooks/useCountdown'
import addDays from 'date-fns/addDays'

import MainLayout from '@/components/layouts/MainLayout'
import { Breadcrumb, Card, HorizontalDivider } from '@/components/base'
import { Button, GrayBorderButton } from '@/components/button'
import {
  OrderTrackingModal,
  OrderStatus,
  AddReviewModal,
  ConfirmDeliveryModal,
  BackendOrderStatus,
} from '@/components/profile'
import { AddressBox } from '@/components/address'
import SelectedProduct from '@/components/products/SelectedProduct'
import { PaymentModal } from '@/components/checkout'
import { CheckoutContext, CheckoutProvider } from 'contexts/CheckoutContext'
import UpdatePaymentInfo from '@/components/profile/transaction/UpdatePaymentInfo'
import NavLink from '@/components/base/NavLink'
import { generateStatusInformation } from '@/components/profile/transaction/OrderCard'

import currencyConverter from 'helpers/currencyConverter'
import formatDate from 'helpers/formatDate'
import { generatePriceFromCart } from 'helpers/generatePrice'
import tokenConverter from 'helpers/tokenConverter'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchAuthGet, fetchAuthPost } from 'helpers/fetch'


function Timer({ date, time, unit, type, color = 'bg-dnr-dark-orange' }) {
  const { days, hours, minutes, seconds, padStart } = useCountdown(time, unit, date)

  if (type === 'monthly') {
    return (
      <div className="flex text-sm">
        <div className="flex items-center">
          <div
            className={`${color} text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none`}
          >
            <div>
              {padStart(days)}
              <br />
              <div className="text-xs leading-none">dd</div>
            </div>
          </div>
          <div className="mx-2 text-base">:</div>
          <div
            className={`${color} text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none`}
          >
            <div>
              {padStart(hours)}
              <br />
              <p className="text-xs leading-none">hh</p>
            </div>
          </div>
          <div className="mx-2 text-base">:</div>
          <div
            className={`${color} text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none`}
          >
            <div>
              {padStart(minutes)}
              <br />
              <p className="text-xs leading-none">mm</p>
            </div>
          </div>
          <div className="mx-2 text-base">:</div>
          <div
            className={`${color} text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none`}
          >
            <div>
              {padStart(seconds)}
              <br />
              <p className="text-xs leading-none">ss</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'daily') {
    return (
      <div className="flex">
        <div className="flex items-center">
          <div
            className={`${color} text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none`}
          >
            <div>
              {padStart(hours)}
              <br />
              <p className="text-xs leading-none">hh</p>
            </div>
          </div>
          <div className="mx-2 text-base">:</div>
          <div
            className={`${color} text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none`}
          >
            <div>
              {padStart(minutes)}
              <br />
              <p className="text-xs leading-none">mm</p>
            </div>
          </div>
          <div className="mx-2 text-base">:</div>
          <div
            className={`${color} text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none`}
          >
            <div>
              {padStart(seconds)}
              <br />
              <p className="text-xs leading-none">ss</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function generateInfoBasedOnStatus(state) {
  const type = {
    [OrderStatus.waiting]: {
      Head({ order }) {
        return (
          <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
            Menunggu Pembayaran
          </div>
        )
      },
      Footer({ order }) {
        const { setValue } = useContext(CheckoutContext)
        const [paymentModal, setPaymentModal] = useState(false)

        useEffect(() => {
          const TOTAL_PRICE = order.carts?.reduce((prev, curr) => prev + curr.final_unit_price, 0)
          const TAX = Math.ceil(TOTAL_PRICE * (11 / 100)) // 11%
          const SHIPMENT_FEE = 0

          setValue({
            totalProduct: order?.carts ? order?.carts?.length : 0,
            totalPrice: TOTAL_PRICE,
            tax: TAX,
            shipmentFee: 0,
            totalPurchase: Math.ceil(TOTAL_PRICE + TAX + SHIPMENT_FEE),
            discount_value: order.payment.type === 'DIRECT' ? 0.9 : 0,
            orderId: order.id,
          })
        }, [])

        return (
          <>
            <div className="flex space-x-2 mb-4">
              <div className="text-gray-900 text-sm leading-5 py-2 rounded-md flex-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between items-center">
                <span className="mr-2">Batas Waktu Pembayaran</span>
                <Timer
                  color="bg-wi-blue"
                  date={order.created_at ? new Date(order?.created_at) : null}
                  unit="days"
                  time={1}
                  type="daily"
                />
              </div>
            </div>
            <div className="flex space-x-2 mb-4">
              <PaymentModal
                open={paymentModal}
                setOpen={setPaymentModal}
                carts={order?.carts}
                PaymentInfoComponent={UpdatePaymentInfo}
              />
              <GrayBorderButton
                className="flex-1"
                display="block"
                hoverState={false}
                onClick={() => setPaymentModal(true)}
              >
                Ubah Metode Pembayaran
              </GrayBorderButton>
              <NavLink href={`/checkout/finish?order_id=${order.id}`}>
                <Button className="flex-1">Lihat Metode Pembayaran</Button>
              </NavLink>
            </div>
            <span className="text-xs text-gray-500 leading-none">
              *Bila anda tidak melakukan pembayaran dalam kurun waktu 1x24 jam maka transaksi akan otomatis dibatalkan.
            </span>
          </>
        )
      },
    },
    [OrderStatus.processed]: {
      Head() {
        return (
          <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
            Sedang Diproses
          </div>
        )
      },
      Footer() {
        return null
      },
    },
    [OrderStatus.ongoing]: {
      Head() {
        return (
          <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
            Sedang Dikirim
          </div>
        )
      },
      Footer({ order }) {
        const [openTracking, setOpenTracking] = useState(false)

        return (
          <>
            <OrderTrackingModal open={openTracking} setOpen={setOpenTracking} order={order?.order} />
            <GrayBorderButton className="w-full py-2.5" display="block" onClick={() => setOpenTracking(true)}>
              Status Pengiriman
            </GrayBorderButton>
          </>
        )
      },
    },
    [OrderStatus.arrived]: {
      Head({ order }) {
        return (
          <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
            Barang Telah Sampai
          </div>
        )
      },
      Footer({ order, router }) {
        const [open, setOpen] = useState(false)
        return (
          <>
            <div className="flex space-x-2 mb-4">
              <div className="text-gray-900 text-base leading-5 py-2 rounded-md flex-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between items-center">
                <span className="mr-2">Batas Waktu Pembayaran</span>
                <Timer
                  color="bg-wi-blue"
                  date={order?.order?.completion_deadline ? new Date(order?.order?.completion_deadline) : null}
                  unit="days"
                  time={1}
                  type="daily"
                />
              </div>
            </div>
            <div className="flex space-x-2 mb-4">
              <ConfirmDeliveryModal
                open={open}
                setOpen={setOpen}
                onConfirm={() => {
                  setOpen(false)
                  router.push(
                    `/profile/transaksi/detail?state=${OrderStatus.writeReview}&order_id=${order?.order?.id}`,
                    undefined,
                    {
                      shallow: true,
                    }
                  )
                }}
                orderId={order?.order?.id}
              />
              {/* <GrayBorderButton className="w-1/3" display="block" hoverState={false}>
              Retur Barang
            </GrayBorderButton> */}
              <Button onClick={() => setOpen(true)} className="w-full bg-dnr-dark-turqoise" color="turqoise">
                Konfirmasi Barang Diterima
              </Button>
            </div>
          </>
        )
      },
    },
    [OrderStatus.writeReview]: {
      Head() {
        return (
          <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
            Transaksi selesai
          </div>
        )
      },
      Footer({ order, router }) {
        const [openReview, setOpenReview] = useState(false)

        return (
          <div className="flex space-x-2 mb-4">
            <AddReviewModal
              open={openReview}
              setOpen={setOpenReview}
              orderId={order?.id}
              carts={order?.carts}
              onSuccess={() => {
                setOpenReview(false)
                router.push(`/profile/transaksi/detail?state=${OrderStatus.finished}&order_id=${order?.id}`, undefined, {
                  shallow: true,
                })
              }}
            />
            <Button className="w-full" onClick={() => setOpenReview(true)}>
              Tulis Penilaian
            </Button>
          </div>
        )
      },
    },
    [OrderStatus.finished]: {
      Head() {
        return (
          <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
            Transaksi selesai
          </div>
        )
      },
      Footer({ order }) {
        const [review] = order?.carts[0].product?.reviews

        return (
          <div className="mb-4">
            <h4 className="text-base text-gray-900 mb-2">Penilaian</h4>
            <HorizontalDivider className="mb-4" />
            <div className="flex justify-between mb-4">
              <span className="text-gray-700 tracking-wide text-sm">Rating: {review.rating} Bintang</span>
              <div className="flex space-x-2">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <StarIcon key={index} className="w-4 h-4 text-dnr-dark-green" />
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-md p-4 text-gray-700 text-sm leading-6">{review.notes}</div>
          </div>
        )
      },
    },
    [OrderStatus.expired]: {
      Head() {
        return (
          <div className="text-gray-500 text-sm font-semibold leading-5 tracking-wide bg-gray-100 px-4 py-2 rounded-md flex items-center">
            Pesanan Dibatalkan
          </div>
        )
      },
      Footer() {
        return null
      },
    },
    [OrderStatus.cod]: {
      Head() {
        return (
          <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
            {OrderStatus.processed}
          </div>
        )
      },
      Footer() {
        return null
      },
    },
    [OrderStatus?.tempo]: {
      Head({ order }) {
        return (
          <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
            {order?.status === BackendOrderStatus.COMPLETED ? OrderStatus?.arrived : OrderStatus?.processed}
          </div>
        )
      },
      Footer({ order }) {
        const { value, setValue } = useContext(CheckoutContext)
        const [paymentModal, setPaymentModal] = useState(false)
        const [openTracking, setOpenTracking] = useState(false)

        useEffect(() => {
          const TOTAL_PRICE = order.carts?.reduce((prev, curr) => prev + curr.final_unit_price, 0)
          const TAX = Math.ceil(TOTAL_PRICE * (11 / 100)) // 11%
          const SHIPMENT_FEE = 0

          setValue({
            totalProduct: order?.carts ? order?.carts?.length : 0,
            totalPrice: TOTAL_PRICE,
            tax: TAX,
            shipmentFee: 0,
            totalPurchase: Math.ceil(TOTAL_PRICE + TAX + SHIPMENT_FEE),
            discount_value: 0,
            orderId: order.id,
          })
        }, [])

        return (
          <div className="space-y-2">
            <OrderTrackingModal open={openTracking} setOpen={setOpenTracking} order={order?.order} />

            <PaymentModal
              open={paymentModal}
              setOpen={setPaymentModal}
              carts={order?.carts}
              PaymentInfoComponent={UpdatePaymentInfo}
            />

            {order?.status === BackendOrderStatus.COMPLETED && order?.payment?.status === 'PENDING' ? (
              <Button className="text-sm w-full text-wi-blue hover:text-white hover:bg-wi-blue border border-wi-blue bg-transparent-force">Barang telah diterima oleh pembeli</Button>
            ) : (
              order?.order?.carts[0]?.product.product_type !== 'PPOB' && (
                <Button color="turqoise" type="border" className="text-sm w-full" onClick={() => setOpenTracking(true)}>
                  Status Pengiriman
                </Button>
              )
            )}

            {/* <div className="text-gray-900 text-base leading-5 py-2 rounded-md flex-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between items-center">
              <span className="mr-2">Batas Waktu Pembayaran</span>
              <Timer
                date={order.expired_at ? new Date(order.expired_at) : null}
                unit="until"
                time={30}
                type="monthly"
                color="bg-wi-blue"
              />
            </div> */}
            {/* <div className="flex space-x-2 mb-4">
              <Button className="flex-1" onClick={() => {}}>
                Lihat Invoice
              </Button>
              <Button className="text-sm text-dnr-primary hover:text-white 
              hover:bg-wi-blue border border-wi-blue bg-transparent-force">
                <DownloadIcon/>
              </Button>
            </div> */}
          </div>
        )
      },
    },
  }

  return type[state]
}

function mapPaymentType(payment) {
  const table = {
    DIRECT: 'Pembayaran Langsung',
    CASH_ON_DELIVERY: 'Pembayaran COD',
    LOAN: 'Pembayaran Tempo',
  }

  return table[payment] || '-'
}

export default function Detail() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const orderId = router?.query?.order_id
  const transaction_number = router?.query?.transaction_number
  const customer_no = router?.query?.customer_no
  const buyer_sku_code = router?.query?.buyer_sku_code
  const state = router.query.state || OrderStatus.waiting
  const [load, setLoad] = useState(false)

  if (transaction_number) {
    const { error } = useQuery(['status'], (payload) => fetchAuthPost(`ppob/${transaction_number}/check`, {
        buyer_sku_code: buyer_sku_code,
        customer_no: customer_no,
      }),{
        retry:1, // refetch 1 time
        onSuccess() {
          setLoad(true)
        },
        onError() {
          setLoad(true)
        },
      }
  
    )
  }

  const { isLoading, data, isIdle } = useQuery(['order-detail', orderId, state], () => {
    if (!orderId) {
      // Prevent fetch API call when orderId still undefined
      return Promise.resolve('')
    }
    return fetchAuthGet(`orders/${orderId}`)
  },{
    enabled: transaction_number ? load : true,
  })

  const { Head, Footer } = generateInfoBasedOnStatus(data?.order?.status === 'PAID' ? OrderStatus.processed : router.query.state)
  
  useEffect(() => {
    if (data?.order?.status) {
      const newState = generateStatusInformation(data?.order)

      if (state !== newState) {
        router.push(`/profile/transaksi/detail?state=${newState}&order_id=${orderId}`, undefined, {
          shallow: true,
        })
      }
    }
    
  }, [data])


  return (
    <CheckoutProvider>
      <MainLayout>
        <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-gray-900">
          <section className="mb-4 hidden sm:block">
            <Breadcrumb
              path={[
                { name: 'Akun', path: '/profile' },
                { name: 'Transaksi', path: '/profile/transaksi' },
                'Detail Transaksi',
              ]}
            />
          </section>

          <section className={`w-full ${data?.order?.payment?.type === 'LOAN' ? 'sm:w-6/12' : ' sm:w-5/12'} mx-auto`}>
            <div className="mb-2">
              <h1 className="text-xl  text-gray-900">Detail Transaksi</h1>
            </div>
            {isLoading || isIdle || data === '' ? (
              <Card className="w-full mb-4 text-sm">
                <h4>Proses Pengambilan Data</h4>
              </Card>
            ) : (
              <div className="w-full mb-4 text-sm space-y-2">
                <Card>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 tracking-wide text-sm">Status Pesanan</span>
                    {
                      data?.order?.carts[0]?.product?.product_type === "PPOB" ?
                      <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
                        {
                          data?.order?.status === 'PENDING' ? 
                            'Transaksi Pending'
                          :
                          data?.order?.status === 'CANCELED' ? 
                            'Transaksi Dibatalkan'
                          :
                            'Transaksi Berhasil'
                        }
                      </div>
                      :
                      <Head order={data} />
                    }
                  </div>
                  {state === OrderStatus.expired ? (
                    <p className="text-xs text-gray-500 leading-tight mb-2 my-3">
                      *Pesanan dibatalkan otomatis karena anda melebihi waktu yang kami tentukan yaitu 1x24 jam untuk
                      melakukan pembayaran.
                    </p>
                  ) : null}
                  <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                  {
                    data?.order?.carts[0]?.product?.product_type !== "PPOB" ?
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 tracking-wide text-sm">Jenis Pembayaran</span>
                        {/* <div className="text-gray-900 font-semibold">{state}</div> */}
                        <div className="text-gray-900 font-semibold">{mapPaymentType(data?.order?.payment?.type)}</div>
                      </div>
                    :
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 tracking-wide text-sm">Jenis Layanan</span>
                        <div className="text-gray-900 font-semibold">Token Listrik</div>
                      </div>
                  }
                  {/* <HorizontalDivider className="mb-4" /> */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 tracking-wide text-sm">No. Transaksi</span>
                    <div className="text-gray-900 font-semibold">{data?.order?.transaction_number}</div>
                  </div>

                  {
                    data?.order?.carts[0]?.product?.product_type === "PPOB" && (
                      <>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 tracking-wide text-sm">No Meter/ID Pel.</span>
                        <div className="text-gray-900 font-semibold">
                          {data?.order?.payment?.account_number ?? '-'}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 tracking-wide text-sm">Nama</span>
                        <div className="text-gray-900 font-semibold">
                          {data?.order?.payment?.account_name ?? '-'}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 tracking-wide text-sm">Tarif/Daya</span>
                        <div className="text-gray-900 font-semibold">
                          {data?.order?.payment?.channel ?? '-'}
                        </div>
                      </div>
                      </>
                    )
                  }

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 tracking-wide text-sm">Tanggal Pesanan</span>
                    <div className="text-gray-900 font-semibold">
                      {formatDate(data?.order?.created_at)}
                      {/* {data.created_at ? format(new Date(data.created_at), 'cccc dd MMMM yyyy', {locale: id}) : ''} */}
                    </div>
                    {/* <div className="text-gray-900 font-semibold">Rabu, 01 Januari 2020</div> */}
                  </div>
                  {/* <HorizontalDivider className="mb-4" /> */}
                  {/* {data?.order?.payment?.type === 'LOAN' ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 tracking-wide text-sm">Batas Pembayaran</span>
                        <div className="text-gray-900 font-semibold">
                          {data.expired_at ? formatDate(new Date(data.expired_at)) : null}
                        </div>
                      </div>
                      <HorizontalDivider className="mb-4" />
                    </>
                  ) : null} */}
                </Card>
                {
                  data?.order?.carts[0]?.product?.product_type !== "PPOB" && (
                    <Card>
                      <div>
                        <h4 className="text-base text-gray-900 mb-4">Info Pengiriman</h4>
                        <AddressBox
                          address={{
                            // label: data?.order?.shipment.address.label,
                            description:data?.order?.user.outlet_types_id.address
                          }}
                        />
                      </div>
                    </Card>
                  )
                }

                <Card>
                  <div>
                    <h4 className="text-base text-gray-900 font-semibold mb-2">Rincian Pesanan</h4>
                    <div className="space-y-4 divide-y divide-gray-500 divide-dashed divide-opacity-40 bg-dnr-secondary-gray p-2 rounded-md">
                      {data?.order?.carts.map((cart, index) => (
                        <div key={`${cart.id}${index}`} className="pt-2">
                          <div className="flex space-x-4 items-center flex-1">
                            <div className="border border-gray-300 p-1 rounded-md">
                              {
                                cart?.product?.product_type === "PPOB" ?
                                <img
                                  className="w-10"
                                  alt="product image"
                                  src={`${process.env.NEXT_PUBLIC_URL}/assets/token-listrik.png`}
                                />
                                :
                                <img
                                  className="w-10"
                                  src={
                                    (cart.product?.images ? cart.product?.images?.length : 0) !== 0 ? 
                                      cart.product.images[0].url 
                                    : 
                                    '/assets/default.png'
                                  }
                                  alt="product image"
                                />
                              }
                            </div>
                            <div className="flex-1">
                              <h5 className="text-sm">{cart.product.name}</h5>
                              <span className="text-xs text-gray-500">
                                {currencyConverter(generatePriceFromCart(cart))} 
                                {
                                  cart?.product?.product_type !== "PPOB" ?
                                    `x ${cart.quantity} ${cart.product.unit}`
                                  :''
                                }
                              </span>
                            </div>
                            {/* data?.order?.carts[0]?.product?.product_type !== "PPOB" ? */}
                            <div className="w-auto">
                              {cart.discount_percentage != 0 ? (`${cart.discount_percentage} %`) : ""}
                            </div>
                            <span className="text-sm text-gray-900">{currencyConverter(cart.final_unit_price)}</span>
                            {['arrived', 'finished', 'reviewed', 'expired'].includes(state) ? (
                              <NavLink href={`/products/${data?.order?.carts[0].product.id}`}>
                                <Button className="bg-dnr-dark-turqoise text-sm" padding="py-3 px-5">
                                  Beli Lagi
                                </Button>
                              </NavLink>
                            ) : null}
                          </div>
                          {
                            cart?.product?.product_type === 'PPOB' && (
                              <div className="pl-16">
                                <div className='grid grid-cols-5 w-full'>
                                  <p className='col-span-1 text-xs sm:text-sm'>token</p>
                                  {/* <p className='col-span-4 text-xs sm:text-sm'>: 5345 534534 43646</p> */}
                                  {/* <p className='col-span-4 text-xs sm:text-sm'>: {Number(data?.order?.payment?.reference_number).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0})}</p> */}
                                  {/* <p className='col-span-4 text-xs sm:text-sm'>: {data?.order?.payment?.reference_number.split("").map((d) => ('+'))}</p> */}
                                  {/* <p className='col-span-4 text-xs sm:text-sm'>: {tokenConverter(data?.order?.payment?.reference_number)}</p> */}
                                  <p className='col-span-4 text-xs sm:text-sm'>: {data?.order?.payment?.reference_number}</p>
                                </div>
                              </div>
                            )
                          }
                          
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <h4 className="text-base text-gray-900 font-semibold mb-2">Ringkasan Belanja</h4>
                  <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 tracking-wide text-xs">Total Belanja</span>
                    <div className="text-gray-900 font-semibold">{currencyConverter(data?.order?.payment?.total_amount)}</div>
                  </div>
                  {
                    data?.order?.carts[0]?.product?.product_type !== "PPOB" ?
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 tracking-wide text-xs">
                          Ongkos Kirim Dari: <span className="text-gray-900">DKI Jakarta</span>
                        </span>
                        <div className="text-gray-900 font-semibold">Rp 0</div>
                      </div>
                    :''
                  }
                  {data?.order?.payment?.status === 'SUCCESS' && data?.order?.payment?.promotion_discount > 0 ? (
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700 tracking-wide text-xs">Discount ({data?.order?.payment?.promotion_code})</span>
                      <div className="text-gray-900 font-semibold">({currencyConverter(data?.order?.payment?.promotion_discount)})</div>
                    </div>
                  ) : null}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 tracking-wide text-xs">Total Pembayaran</span>
                    <div className="text-gray-900 font-semibold">{currencyConverter(data?.order?.payment.total_amount - data?.order?.payment.promotion_discount)}</div>
                  </div>
                  <HorizontalDivider className="border-dashed mb-2" color="bg-gray-500" />
                  <Footer order={data} router={router} />
                  {/* {data?.order?.payment.status === 'SUCCESS' ? (
                    <> */}
                      <HorizontalDivider className="border-none mb-1 mt-1" color="bg-gray-500" />

                      <div className="flex space-x-2">
                        <div style={{ width: '100%' }}>
                          {
                            data?.order?.carts[0]?.product?.product_type !== "PPOB" ?
                              <NavLink href={`/profile/transaksi/invoice/?order_id=${orderId}`}>
                                <Button className="bg-dnr-dark-turqoise text-sm" padding="py-2 border border-wi-blue px-5 w-full">
                                  Lihat Invoice
                                </Button>
                              </NavLink>
                            :
                              <NavLink href={`/profile/transaksi/invoiceListrik/?order_id=${data?.order?.transaction_number}`}>
                                <Button className="bg-dnr-dark-turqoise text-sm" padding="py-2 border border-wi-blue px-5 w-full">
                                  Lihat Invoice
                                </Button>
                              </NavLink>
                          }
                        </div>
                        <div>
                          {
                            data?.order?.carts[0]?.product?.product_type !== "PPOB" ?
                              <a className="flex border border-wi-blue bg-transparent rounded-md py-2 px-3 w-full" href={`${process.env.NEXT_PUBLIC_BASE_URL}orders/${data?.order?.transaction_number}/invoice`}>
                                <DownloadIcon className="w-5 h-5 text-wi-blue leading-tight" />
                              </a>
                            :                                                                                           
                              <a className="flex border border-wi-blue bg-transparent rounded-md py-2 px-3 w-full" href={`${process.env.NEXT_PUBLIC_BASE_URL}orders/${data?.order?.transaction_number}/invoice-ppob`}>
                                <DownloadIcon className="w-5 h-5 text-wi-blue leading-tight" />
                              </a>

                          }
                        </div>
                      </div>
                    {/* </>
                  ) : null} */}
                </Card>
              </div>
            )}
          </section>
          <section>
            <SelectedProduct />
          </section>
        </main>
      </MainLayout>
    </CheckoutProvider>
  )
}

export async function getServerSideProps(context) {
  const { order_id } = context.query

  if (!order_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
