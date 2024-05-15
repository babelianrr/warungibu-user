import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
import ReactTooltip from 'react-tooltip'
import {DocumentDuplicateIcon, ChevronDownIcon} from '@heroicons/react/outline'

import {Breadcrumb, Card, HorizontalDivider, Modal} from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import {Button, GrayBorderButton} from '@/components/button'
import SelectedProduct from '@/components/products/SelectedProduct'
import PaymentData from '@/components/checkout/PaymentData'
import ModalSuccess from '@/components/checkout/ModalSuccess'

import currencyConverter from 'helpers/currencyConverter'
import formatDate from 'helpers/formatDate'
import {fetchAuthPost} from 'helpers/fetch'
import useOrderDetail from 'hooks/useOrderDetail'
import useCountdown from 'hooks/useCountdown'
import {generatePaymentStep} from 'helpers/generatePaymentSteps'

function paymentMethod(id, payment) {
  if (id === 'XENDIT_VA') {
    return `${payment.channel} Virtual Account`
  }

  return 'Bank Transfer'
}

function paymentLogo(id) {
  const va = {
    BCA: 'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
    BNI: '/assets/bni.svg',
    BRI: 'https://www.linkaja.id//uploads/images//YW50aWtvZGVfXzE2MDEwOTA0OTRfYnJpLWJyYXZhLTA3LXBuZw.png',
    MANDIRI:
      'https://cdn.i.haymarketmedia.asia/?n=campaign-asia%2Fcontent%2Fbank-mandiri-logo1.jpg&h=570&w=855&q=100&v=20170226&c=1',
    PERMATA: '/assets/permata-logo.svg',
  }

  return (
    va[id] ||
    'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png'
  )
}

export default function Finish() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const orderId = router.query.order_id
  const {isLoading, data, isIdle} = useOrderDetail(orderId)
  const {
    isLoading: mutationLoading,
    mutate,
    error,
  } = useMutation((payload) => fetchAuthPost(`orders/${orderId}`, payload, 'PATCH'), {
    onSuccess(response) {
      setOpen(true)
    },
    onError(err) {
    },
  })

  const currency = currencyConverter(data?.payment?.total_amount)

  const rekeningName =
    data?.payment?.method === 'BANK_TRANSFER' ? `PT. DOS NI ROHA` : `${data?.payment?.channel} Virtual Account`
  const rekeningNumber = data?.payment?.method === 'BANK_TRANSFER' ? `006-300-8823` : data?.payment?.account_number

  const steps = generatePaymentStep(rekeningNumber, data?.payment?.channel)

  const handleConfirmationClick = (accountData) => {
    mutate({
      payment: {
        total_price: data.payment.total_amount - data.payment.channel_fee - data.payment.unique_amount,
        payment_method: data.payment.method,
        payment_channel: data.payment.channel,
        account_number: accountData.accountNumber,
        account_name: accountData.accountName,
        account_bank: accountData.accountBank,
      },
    })
  }

  return (
    <MainLayout>
      <ModalSuccess open={open} setOpen={setOpen} />
      <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-gray-900">
        <section className="mb-4 hidden sm:block">
          <Breadcrumb path={[{name: 'Beranda', path: '/'}, 'Checkout']} />
        </section>

        <section className="w-full sm:w-5/12 mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col justify-between items-center space-y-4">
              <h1 className="text-lg text-gray-900 ">Selesaikan Pembayaran dalam</h1>
              {data?.expired_at && <CountDownTime created_at={data?.created_at} />}
            </div>
            <span className="text-gray-900 text-xs flex flex-col mb-4 items-center">
              Batas Akhir Pembayaran :{' '}
              {isLoading || isIdle || data === '' ? null : (
                <span className="text-dnr-primary text-sm">
                  {formatDate(data.expired_at, {withTime: true, withoutYear: true})}
                </span>
              )}
            </span>
          </div>

          <section className="mt-4">
            {isLoading || isIdle || data === '' ? (
              <Card className="w-full mb-4 text-sm">
                <h4>Proses Pengambilan Data</h4>
              </Card>
            ) : (
              <>
                <div className="w-full mb-4 space-y-2">
                  <Card>
                    <h4 className="text-sm text-gray-700 mb-4">Jenis Pembayaran</h4>
                    <section className="flex justify-between items-center mb-4 border border-gray-300 rounded-md p-2">
                      <img
                        src={paymentLogo(data.payment.channel)}
                        alt="payment"
                        className="w-24  bg-cover object-center"
                      />
                      <h4 className="text-sm text-gray-800 leading-4">
                        {paymentMethod(data.payment.method, data.payment)}
                      </h4>
                    </section>
                  </Card>
                  <Card>
                    <section className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-xs text-gray-500 mb-2 leading-6">Nomor Rekening</span>
                        <h4 className="text-lg text-gray-900 font-semibold leading-4 tracking-wide pt-0.5 mb-2">
                          {rekeningNumber}
                        </h4>
                        <h4 className="text-xs  text-gray-500 leading-none">{rekeningName}</h4>
                      </div>
                      <div className="flex space-x-1">
                        <ClipBoard rekeningNumber={rekeningNumber} text="Salin No. Rekening" id="copy_account" />
                      </div>
                    </section>
                  </Card>
                  {/* <HorizontalDivider className="mb-4" /> */}
                  <Card>
                    <section className="flex justify-between items-end mb-4">
                      <div>
                        <span className="text-xs text-gray-500 leading-6 mb-2">Total Tagihan</span>
                        <h4 className="text-lg text-gray-900 leading-4 pt-0.5 font-semibold">
                          {data.payment.method === 'BANK_TRANSFER' ? (
                            <>
                              {currency.substring(0, currency.length - 3)}
                              <span className="text-dnr-dark-orange">{currency.substring(currency.length - 3)}</span>
                            </>
                          ) : (
                            currency
                          )}
                        </h4>
                      </div>
                      <div className="flex space-x-1">
                        <ClipBoard rekeningNumber={data?.payment?.total_amount} text="Salin Nominal" id="copy_amount" />
                      </div>
                    </section>
                    <section className="rounded-md bg-gray-100 border-gray-500 text-sm p-2 mb-4 space-y-4">
                      {steps
                        ? Object.entries(steps).map(([key, list]) => (
                            <div key={`${key}-${rekeningName}`}>
                              <p className="text-gray-900 leading-1 mb-2">{key}</p>
                              <ul className="text-gray-500 space-y-1 list-disc list-outside ml-4">
                                {list.map((item, index) => (
                                  <li key={`${key}-${index}`} dangerouslySetInnerHTML={{__html: item}}></li>
                                ))}
                                <li>Transaksi Anda Telah Selesai</li>
                              </ul>
                            </div>
                          ))
                        : null}

                      {/* <p className="text-gray-900 mb-2 t">Penting</p>
                      <ul className="text-gray-500 space-y-1 text-xs list-disc list-outside ml-4">
                        <li>Transaksi ini akan otomatis menggantikan tagihan</li>
                        {data?.payment?.method === 'BANK_TRANSFER' && (
                          <li>Total sudah termasuk kode unik: {data?.payment?.unique_amount}</li>
                        )}
                        <li>Dapatkan kode pembayaran setelah klik “Konfirmasi”.</li>
                        <li>Tidak disarankan bayar melalui bank lain agar transaksi dapat diproses tanpa kendala.</li>
                      </ul> */}
                    </section>
                  </Card>
                </div>
                {data.payment.method === 'BANK_TRANSFER' && (
                  <PaymentData
                    account_name={data.payment.account_name}
                    account_number={data.payment.account_number}
                    account_bank={data.payment.account_bank}
                    onClick={handleConfirmationClick}
                    mutationLoading={mutationLoading}
                  />
                )}
              </>
            )}
            <span className="text-xs text-gray-500 leading-none">
              Pastikan pembayaran Anda sudah BERHASIL dan unggah bukti untuk mempercepat proses verifikasi
            </span>
          </section>
        </section>
        <section>
          <SelectedProduct />
        </section>
      </main>
    </MainLayout>
  )
}

function ClipBoard({rekeningNumber, text, id}) {
  const [tipText, setTipText] = useState(`Copy to clipboard`)

  return (
    <>
      <ReactTooltip id={id} getContent={() => tipText} />
      <div
        className="flex items-center space-x-1 cursor-pointer"
        data-for={id}
        data-tip
        onClick={() => {
          navigator.clipboard.writeText(String(rekeningNumber).split('-').join(''))
          setTipText(`Copied: ${rekeningNumber}`)
        }}
      >
        <span className="text-sm text-gray-500 leading-none">{text}</span>
        <DocumentDuplicateIcon className="w-5 h-5 text-dnr-primary cursor-pointer" />
      </div>
    </>
  )
}

function CountDownTime({created_at}) {
  const {hours, minutes, seconds, padStart} = useCountdown(1, 'days', new Date(created_at))

  return (
    <div className="flex items-center text-sm font-light">
      <div className="bg-wi-blue text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
        <div>
          {padStart(hours)}
          <p className="text-xs leading-none">hh</p>
        </div>
      </div>
      <div className="mx-2 text-base">:</div>
      <div className="bg-wi-blue text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
        <div>
          {padStart(minutes)}
          <p className="text-xs leading-none">mm</p>
        </div>
      </div>
      <div className="mx-2 text-base">:</div>
      <div className="bg-wi-blue text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
        <div>
          {padStart(seconds)}
          <p className="text-xs leading-none">ss</p>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const {order_id} = context.query

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
