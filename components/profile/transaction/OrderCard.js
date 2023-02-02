import {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {StarIcon} from '@heroicons/react/solid'
import {ChevronRightIcon, ClockIcon} from '@heroicons/react/outline'
import addDays from 'date-fns/addDays'

import {Button, GrayBorderButton} from '@/components/button'
import {ConfirmationModal, Card, HorizontalDivider} from '@/components/base'
import {
  OrderStatus,
  OrderTrackingModal,
  AddReviewModal,
  BackendOrderStatus,
  ConfirmDeliveryModal,
} from '@/components/profile'
import NavLink from '@/components/base/NavLink'

import useCountdown from 'hooks/useCountdown'
import {classNames} from 'helpers/classNames'
import formatDate from 'helpers/formatDate'
import currencyConverter from 'helpers/currencyConverter'
import {generatePrice} from 'helpers/generatePrice'

function CountDownTime({createdAt}) {
  const {hours, minutes, seconds, padStart} = useCountdown(1, 'days', new Date(createdAt))

  return (
    <div className="flex items-center text-xs sm:text-sm">
      <div className="sm:bg-dnr-dark-orange sm:py-0.5 sm:px-1.5 sm:shadow sm:rounded-md text-dnr-primary sm:text-white">
        {padStart(hours)}
      </div>
      <div className="mx-0.5 sm:mx-1">:</div>
      <div className="sm:bg-dnr-dark-orange sm:py-0.5 sm:px-1.5 sm:shadow sm:rounded-md text-dnr-primary sm:text-white">
        {padStart(minutes)}
      </div>
      <div className="mx-0.5 sm:mx-1">:</div>
      <div className="sm:bg-dnr-dark-orange sm:py-0.5 sm:px-1.5 sm:shadow sm:rounded-md text-dnr-primary sm:text-white">
        {padStart(seconds)}
      </div>
    </div>
  )
}

function generateInformationBasedOnstatus(status) {
  switch (status) {
    case OrderStatus.waiting:
      return {
        StatusFooter({createdAt, expiredAt}) {
          return (
            <div className="text-gray-500 text-xs leading-none bg-dnr-blue-light px-3 py-3 rounded-md flex flex-col sm:flex-row items-center">
              <span className="mr-2">Bayar sebelum</span>
              <div className="flex">
                <div className="mr-2 flex space-x-1 items-center">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-gray-900">{formatDate(expiredAt, {withTime: false, withoutYear: true})}</span>
                </div>
                <CountDownTime createdAt={expiredAt} />
              </div>
            </div>
          )
        },
        StatusFooterMobile({createdAt, expiredAt}) {
          return (
            <div className="flex flex-col items-end">
              <p className="text-gray-500 text-xs leading-none tracking-none">Bayar Sebelum</p>
              <div className="flex">
                <div className="text-dnr-primary text-xs leading-6 flex items-center space-x-1 mr-1">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-dnr-primary">
                    {formatDate(expiredAt, {withTime: false, withoutYear: false, mobileFormat: true})}
                  </span>
                </div>
                <CountDownTime createdAt={expiredAt} />
              </div>
            </div>
          )
        },
        PaymentFooter() {
          return (
            <p className="text-gray-500 text-xs leading-none">
              1162300100096851 <span className="text-dnr-blue font-medium">Salin</span>
            </p>
          )
        },
        StatusButton({router, status, orderId}) {
          return (
            <div className="flex space-x-3">
              <GrayBorderButton
                className="leading-none text-sm text-gray-500 hidden sm:block shadow"
                padding="py-3 px-3"
                onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${orderId}`)}
              >
                Lihat Detail Transaksi
              </GrayBorderButton>
              <NavLink href={`/checkout/finish?order_id=${orderId}`}>
                <Button className="bg-wi-blue leading-none text-sm ml-auto border border-wi-blue" padding="py-3 px-3">
                  Lihat Metode Pembayaran
                </Button>
              </NavLink>
            </div>
          )
        },
      }
    case OrderStatus.processed:
      return {
        StatusFooter() {
          return (
            <div className="text-dnr-primary text-xs font-medium leading-none tracking-none bg-dnr-blue-light px-3 py-3 rounded-md flex items-center">
              Sedang Diproses
            </div>
          )
        },
        StatusFooterMobile({createdAt, expiredAt}) {
          return (
            <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-center">
              <p className="text-gray-500 text-xs leading-none tracking-none">Sedang Diproses</p>
            </div>
          )
        },
        PaymentFooter() {
          return null
        },
        StatusButton({status, router, orderId}) {
          return (
            <GrayBorderButton
              className="leading-none text-sm text-gray-500 hidden sm:block shadow"
              padding="py-3 px-3"
              onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${orderId}`)}
            >
              Lihat Detail Transaksi
            </GrayBorderButton>
          )
        },
      }
    case OrderStatus.ongoing:
      return {
        StatusFooter() {
          return (
            <div className="text-dnr-primary text-xs font-medium leading-none tracking-none bg-dnr-blue-light px-3 py-3 rounded-md flex items-center">
              Sedang Dikirim
            </div>
          )
        },
        StatusFooterMobile({createdAt, expiredAt}) {
          return (
            <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-center">
              <p className="text-gray-500 text-xs leading-none tracking-none">Sedang Dikirim</p>
            </div>
          )
        },
        PaymentFooter() {
          return null
        },
        StatusButton({router, status, orderId, order}) {
          const [open, setOpen] = useState(false)
          return (
            <div className="flex space-x-3">
              <OrderTrackingModal open={open} setOpen={setOpen} order={order} />
              <GrayBorderButton
                className="leading-none text-sm text-gray-500 hidden sm:block shadow"
                padding="py-3 px-3"
                onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${orderId}`)}
              >
                Lihat Detail Transaksi
              </GrayBorderButton>
              <Button
                color="primary"
                type="border"
                className="text-sm leading-none font-normal shadow"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(true)
                }}
              >
                Status Pengiriman
              </Button>
            </div>
          )
        },
      }
    case OrderStatus.arrived:
      return {
        StatusFooter({createdAt, expiredAt, updatedAt, orderId, deadline}) {
          return (
            <div className="text-gray-500 text-xs leading-none bg-dnr-blue-light px-2 sm:px-3 py-3 rounded-md flex flex-col sm:flex-row items-center">
              <p className="sm:mr-2 text-center sm:text-left">
                Barang telah <span className="text-dnr-primary font-medium">Sampai</span>,{' '}
                <br className="block sm:hidden" /> Batas Konfirmasi
              </p>
              <div className="flex items-center justify-between">
                <div className="mr-2 flex space-x-1 items-center">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-gray-900">
                    {formatDate(deadline ? new Date(deadline) : null, {
                      withTime: false,
                      withoutYear: true,
                    })}
                  </span>
                </div>
                <div className="flex">
                  <CountDownTime createdAt={deadline} />
                </div>
              </div>
            </div>
          )
        },
        StatusFooterMobile({createdAt, expiredAt, updatedAt}) {
          return (
            <div className="flex flex-col items-end">
              <p className="text-gray-500 text-xs leading-none tracking-none">
                {' '}
                Barang telah <span className="text-dnr-primary font-medium">Sampai</span>
              </p>
              <div className="flex">
                <div className="text-dnr-primary text-xs leading-6 flex items-center space-x-1 mr-1">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-dnr-primary">
                    {formatDate(updatedAt ? addDays(new Date(updatedAt), 1) : null, {
                      withTime: false,
                      withoutYear: false,
                      mobileFormat: true,
                    })}
                  </span>
                </div>
                <CountDownTime createdAt={updatedAt} />
              </div>
            </div>
          )
        },
        PaymentFooter() {
          return null
        },
        StatusButton({router, status, orderId, refetch}) {
          const [open, setOpen] = useState(false)

          return (
            <div className="flex space-x-3">
              <ConfirmDeliveryModal
                open={open}
                setOpen={setOpen}
                onConfirm={() => {
                  setOpen(false)
                  refetch()
                }}
                orderId={orderId}
              />
              <GrayBorderButton
                className="leading-none text-sm text-gray-500 hidden sm:block shadow"
                padding="py-3 px-3"
                onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${orderId}`)}
              >
                Lihat Detail Transaksi
              </GrayBorderButton>
              <Button className="bg-wi-blue text-sm leading-none border border-wi-blue shadow" padding="py-3 px-4" onClick={() => setOpen(true)}>
                Konfirmasi
              </Button>
            </div>
          )
        },
      }
    case OrderStatus.writeReview:
      return {
        StatusFooter() {
          return (
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-gray-500 hidden sm:block">Status Pesanan</span>
              <div className="text-dnr-primary text-xs font-medium leading-none tracking-none bg-dnr-blue-light px-3 py-3 rounded-md flex items-center">
                Selesai
              </div>
            </div>
          )
        },
        StatusFooterMobile({createdAt, expiredAt}) {
          return (
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-gray-500 hidden sm:block">Status Pesanan</span>
              <div className="text-dnr-primary text-xs font-medium leading-none tracking-none bg-dnr-blue-light px-3 py-3 rounded-md flex items-center">
                Selesai
              </div>
            </div>
          )
        },
        PaymentFooter() {
          return null
        },
        StatusButton({router, status, orderId, order, refetch}) {
          const [open, setOpen] = useState(false)
          return (
            <div className="flex space-x-3 items-center">
              <AddReviewModal
                open={open}
                setOpen={setOpen}
                orderId={order.id}
                carts={order.carts}
                onSuccess={() => {
                  setOpen(false)
                  refetch()
                }}
              />
              <p
                className="text-dnr-primary underline leading-6 text-sm cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Tulis Penilaian
              </p>
              <GrayBorderButton
                className="leading-none text-sm text-gray-500 hidden sm:block shadow"
                padding="py-3 px-3"
                onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${orderId}`)}
              >
                Lihat Detail Transaksi
              </GrayBorderButton>
              <NavLink href={`/products/${order.carts[0].product.id}`}>
                <Button className="bg-wi-blue text-sm leading-none border border-wi-blue shadow" padding="py-3 px-4">
                  Beli Lagi
                </Button>
              </NavLink>
            </div>
          )
        },
      }
    case OrderStatus.finished:
      return {
        StatusFooter() {
          return (
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-gray-500 hidden sm:block">Status Pesanan</span>
              <div className="text-dnr-primary text-xs font-medium leading-none tracking-none bg-dnr-blue-light px-3 py-3 rounded-md flex items-center">
                Selesai
              </div>
            </div>
          )
        },
        StatusFooterMobile({createdAt, expiredAt}) {
          return (
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-gray-500 hidden sm:block">Status Pesanan</span>
              <div className="text-dnr-primary text-xs font-medium leading-none tracking-none bg-dnr-blue-light px-3 py-3 rounded-md flex items-center">
                Selesai
              </div>
            </div>
          )
        },
        PaymentFooter() {
          return null
        },
        StatusButton({router, status, order, orderId}) {
          const [open, setOpen] = useState(false)
          const [review] = order.carts[0]?.product?.reviews

          return (
            <div className="flex space-x-3 items-center">
              <AddReviewModal open={open} setOpen={setOpen} />
              <div className="space-x-2 flex flex-col sm:flex-row">
                <span className="text-xs text-gray-500 mb-1">Penilaian Pesanan</span>
                <div className="flex space-x-1">
                  <p className="text-xs text-gray-900 ">{review.rating}</p>
                  <div className="flex">
                    {Array.from({length: review.rating}).map((_, index) => (
                      <StarIcon key={index} className="w-4 h-4 text-dnr-dark-green" />
                    ))}
                  </div>
                </div>
              </div>
              <GrayBorderButton
                className="leading-none text-sm text-gray-500 hidden sm:block shadow"
                padding="py-3 px-3"
                onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${orderId}`)}
              >
                Lihat Detail Transaksi
              </GrayBorderButton>
              <NavLink href={`/products/${order.carts[0].product.id}`}>
                <Button className="bg-wi-blue text-sm leading-none border border-wi-blue shadow" padding="py-3 px-4">
                  Beli Lagi
                </Button>
              </NavLink>
            </div>
          )
        },
      }
    case OrderStatus.expired:
      return {
        StatusFooter() {
          return (
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-gray-500 hidden sm:block ">Status Pesanan</span>
              <div className="text-gray-500 text-xs font-medium leading-none tracking-none bg-gray-100 px-3 py-3 rounded-md flex items-center">
                Dibatalkan
              </div>
            </div>
          )
        },
        StatusFooterMobile({createdAt, expiredAt}) {
          return (
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-gray-500 hidden sm:block ">Status Pesanan</span>
              <div className="text-gray-500 text-xs font-medium leading-none tracking-none bg-gray-100 px-3 py-3 rounded-md flex items-center">
                Kadaluarsa
              </div>
            </div>
          )
        },
        PaymentFooter() {
          return null
        },
        StatusButton({router, status, order, orderId}) {
          return (
            <div className="flex space-x-3 items-center">
              <GrayBorderButton
                className="leading-none text-sm text-gray-500 hidden sm:block shadow"
                padding="py-3 px-3"
                onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${orderId}`)}
              >
                Lihat Detail Transaksi
              </GrayBorderButton>
              <NavLink href={`/products/${order.carts[0].product.id}`}>
                <Button className="bg-wi-blue text-sm leading-none border border-wi-blue shadow" padding="py-3 px-4">
                  Beli Lagi
                </Button>
              </NavLink>
            </div>
          )
        },
      }
    case OrderStatus.cod:
    case OrderStatus.tempo:
      return {
        StatusFooter() {
          return (
            <div className="text-dnr-primary text-xs font-medium leading-none tracking-none bg-dnr-blue-light px-3 py-3 rounded-md flex items-center">
              {status}
            </div>
          )
        },
        StatusFooterMobile({createdAt, expiredAt}) {
          return (
            <div className="text-dnr-primary text-xs font-medium leading-none tracking-none py-2 rounded-md flex items-center">
              {status}
            </div>
          )
        },
        PaymentFooter() {
          return null
        },
        StatusButton({status, router, orderId, order}) {
          return (
            <div className="flex items-center space-x-3">
              {order.status == BackendOrderStatus.COMPLETED && status === OrderStatus.tempo ? (
                <p className="text-dnr-primary underline leading-6 text-sm cursor-pointer">
                  Pesananan telah sampai
                </p>
              ) : null}
              <GrayBorderButton
                className="leading-none text-sm text-gray-500 hidden sm:block shadow"
                padding="py-3 px-3"
                onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${orderId}`)}
              >
                Lihat Detail Transaksi
              </GrayBorderButton>
            </div>
          )
        },
      }
    default:
      return {
        StatusFooter() {
          return null
        },
        StatusFooterMobile({createdAt, expiredAt}) {
          return null
        },
        PaymentFooter() {
          return null
        },
        StatusButton() {
          return (
            <>
              <Button type="border">Beli Lagi</Button>
            </>
          )
        },
      }
  }
}

export function generateStatusInformation(item) {
  let table = {
    [BackendOrderStatus.DELIVERED]: OrderStatus.arrived,
    [BackendOrderStatus.ONGOING]: OrderStatus.ongoing,
    [BackendOrderStatus.CANCELED]: OrderStatus.expired,
    [BackendOrderStatus.PROCESSED]: OrderStatus.processed,
  }

  if (item.status === BackendOrderStatus.COMPLETED && item.payment.status === 'SUCCESS') {
    if (item.carts && item.carts[0].product?.reviews?.length !== 0) {
      return OrderStatus.finished
    }
    return OrderStatus.writeReview
  }

  if (['XENDIT_VA', 'BANK_TRANSFER'].includes(item.payment.method) && item.payment.status === 'PENDING') {
    return OrderStatus.waiting
  }

  let result = table[item.status]

  if (result) {
    return result
  }

  if (item.payment.status === 'SUCCESS') {
    return OrderStatus.processed
  }

  if (item.payment.type === 'CASH_ON_DELIVERY') {
    return OrderStatus.cod
  }
  if (item.payment.type === 'LOAN') {
    return OrderStatus.tempo
  }
}

export default function OrderCard({item, refetch}) {
  const status = generateStatusInformation(item)
  const {StatusFooter, StatusFooterMobile, PaymentFooter, StatusButton} = generateInformationBasedOnstatus(status)
  const writeReview = status === OrderStatus.writeReview
  const router = useRouter()

  const {carts} = item

  const cart = carts[0]

  return (
    <Card className="text-gray-700">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-8">
          <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-center">
            <p className="text-gray-500 text-xs leading-none tracking-none">Tanggal Pesanan</p>
            <p className="text-gray-900 text-xs leading-6 font-medium hidden sm:block">
              {formatDate(item.created_at, {withTime: false, withoutYear: true})}
            </p>
            <p className="text-gray-900 text-xs leading-6 font-medium block sm:hidden">
              {formatDate(item.created_at, {withTime: false, withoutYear: true, mobileFormat: true})}
            </p>
          </div>
          <div className="sm:flex space-x-3 items-center hidden">
            <p className="text-gray-500 text-xs leading-none tracking-none">No Pesanan</p>
            <p className="text-gray-900 text-xs leading-6 font-medium">{item.transaction_number}</p>
          </div>
        </div>
        <div className="space-x-2 items-center flex">
          <div className="hidden sm:block">
            {item?.created_at && (
              <StatusFooter
                createdAt={item?.created_at}
                expiredAt={item?.expired_at}
                updatedAt={item?.updated_at}
                deadline={item?.completion_deadline}
              />
            )}
          </div>

          {/* Mobile Version */}
          <div className="block sm:hidden">
            {item?.created_at && (
              <StatusFooterMobile
                createdAt={item?.created_at}
                expiredAt={item?.expired_at}
                updatedAt={item?.updated_at}
              />
            )}
          </div>
          <ChevronRightIcon
            className="w-4 h-4 text-gray-500 block sm:hidden"
            onClick={() => router.push(`/profile/transaksi/detail?state=${status}&order_id=${item.id}`)}
          />
        </div>
      </div>
      <HorizontalDivider className="mb-4" />

      {/* Mobile Version */}
      <div className="flex  space-x-4 items-center justify-between sm:hidden">
        <p className="text-gray-500 text-xs leading-none tracking-none">No Pesanan</p>
        <p className="text-gray-900 text-xs leading-6 font-medium">{item.transaction_number}</p>
      </div>

      <HorizontalDivider className="my-4 sm:hidden" />

      <div className="flex items-start pt-2 justify-between mb-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3 items-center">
              <div className="border border-gray-300 p-1 rounded-md">
                <img
                  className="w-10"
                  src={
                    cart?.product?.images && cart.product.images[0]
                      ? cart?.product?.images[0].url
                      : '/assets/default.png'
                  }
                  alt={cart?.product?.name}
                />
              </div>
              <div className="text-left">
                <h5 className="text-xs sm:text-base font-medium tracking-none text-gray-900">{cart.product.name}</h5>
                <span className="text-xs text-gray-700">
                  {currencyConverter(generatePrice(cart.product))} x {cart.quantity} pcs
                </span>
              </div>
            </div>
          </div>
          {carts.length > 1 ? (
            <h5 className="text-sm text-left text-gray-500">+{carts.length - 1} produk lainnya</h5>
          ) : null}
        </div>
        <div className="hidden sm:block">
          <p className="text-gray-500 text-xs leading-none text-right mb-1">Total Pembayaran</p>
          <p className="text-lg text-right leading-none tracking-none font-medium">
            {currencyConverter(item.payment.total_amount)}
          </p>
        </div>
      </div>

      {/* Mobile Version */}
      <HorizontalDivider className="block sm:hidden mb-4" />
      <div className="flex justify-between sm:justify-start sm:flex-row-reverse">
        <div className="block sm:hidden">
          <p className="text-gray-500 text-xs leading-none text-left sm:text-right mb-1">Total Pembayaran</p>
          <p className="text-lg text-left sm:text-right leading-none tracking-none font-medium">
            {currencyConverter(item.payment.total_amount)}
          </p>
        </div>
        <StatusButton status={status} router={router} orderId={item.id} refetch={refetch} order={item} />
      </div>
    </Card>
  )
}
