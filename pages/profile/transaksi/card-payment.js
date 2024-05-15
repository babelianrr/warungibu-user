import {useState, useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import {StarIcon} from '@heroicons/react/solid'
import {ClockIcon,DownloadIcon} from '@heroicons/react/outline'
import useOrderDetail from 'hooks/useOrderDetail'
import useCountdown from 'hooks/useCountdown'
import addDays from 'date-fns/addDays'
import Xendit from 'xendit-js-node'

import MainLayout from '@/components/layouts/MainLayout'
import {Breadcrumb, Card, HorizontalDivider, Input} from '@/components/base'
import {Button, GrayBorderButton} from '@/components/button'
import {
  OrderStatus,
} from '@/components/profile'
import SelectedProduct from '@/components/products/SelectedProduct'
import {CardPaymentContext, CardPaymentProvider} from 'contexts/CardPaymentContext'
import NavLink from '@/components/base/NavLink'
import {generateStatusInformation} from '@/components/profile/transaction/OrderCard'

import currencyConverter from 'helpers/currencyConverter'
import {CheckoutContext} from "../../../contexts/CheckoutContext";
import {XENDIT_PUBLIC_KEY} from "../../../helpers/config";
import {PaymentModal} from "@/components/checkout";
import UpdatePaymentInfo from "@/components/profile/transaction/UpdatePaymentInfo";
import CardPaymentValidationModal from "@/components/profile/transaction/CardPaymentValidationModal";
import useChargeCardPayment from "../../../hooks/useChargeCardPayment";
import {useQuery} from "react-query";
import {fetchAuthPost} from "../../../helpers/fetch";

function Timer({date, time, unit, type, color = 'bg-dnr-dark-orange'}) {
  const {days, hours, minutes, seconds, padStart} = useCountdown(time, unit, date)

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

function mapPaymentType(payment) {
  const table = {
    DIRECT: 'Pembayaran Langsung',
    CASH_ON_DELIVERY: 'Pembayaran COD',
    LOAN: 'Pembayaran Tempo',
  }

  return table[payment] || '-'
}

export default function CardPayment() {
  const router = useRouter()
  const orderId = router.query.order_id
  const state = router.query.state || OrderStatus.waiting
  const {isLoading, data, isIdle} = useOrderDetail(orderId, state)
  const [orderNumber, setOrderNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvn, setCardCvn] = useState('');
  const [isMultipleUse, setIsMultipleUse] = useState(false);
  const [isSkip3DS, setIsSkip3DS] = useState(false);
  const [cardExpired, setCardExpired] = useState('');
  const [tokenValidationCheck, setTokenValidationCheck] = useState(false);
  const [authValid, setAuthValid] = useState(false);
  const [cardPaymentModal, setCardPaymentModal] = useState(false);
  const [token, setToken] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0)
  const [promoCode, setPromoCode] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const xenditService = Xendit;

  xenditService.setPublishableKey(procees.env.NEXT_PUBLIC_XENDIT_SECRET_KEY);

  useEffect(() => {
    if (data) {
      if (data.status !== 'COMPLETED'){
        router.push('/profile/transaksi?state=state=Pembayaran%20Tempo&order_id='+orderId)
      }

      setOrderNumber(data.transaction_number)

      if(!tokenValidationCheck){
        setAmount(data.payment.total_amount)
      }
    }
  }, [data])

  function formatString(e) {
    const inputChar = String.fromCharCode(e.keyCode);
    const code = e.keyCode;
    const allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    e.target.value = e.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
        /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
        /\/\//g, '/' // Pre entering more than 1 `/`
    );

    setCardExpired(e.target.value) ;
  }

  function cardPaymentHandler(e){
    e.preventDefault();

    const expired = cardExpired.split('/');

    if (expired.length < 2){
      return false;
    }

    const request = {
      amount,
      card_number: cardNumber,
      card_exp_month: expired[0],
      card_exp_year: '20' + expired[1],
      card_cvn: cardCvn,
      is_multiple_use: isMultipleUse,
      should_authenticate: !isSkip3DS,
      currency: '',
      on_behalf_of: ''
    }

    xenditService.card.createToken(request, (err, token) => {
      if (err) {
        setErrMessage(err.message)
        // alert(JSON.stringify(err));
        return;
      }

      setErrMessage('');

      switch (token.status) {
        case 'APPROVED':
        case 'VERIFIED':
          setToken(token)
          setCardPaymentModal(true)
          break;
        case 'FAILED':
          break;
        case 'IN_REVIEW':
          setToken(token)
          setCardPaymentModal(true)
          break;
        default:
          alert('Unknown token status');
          break;
      }
    });

  }

  return (
    <CardPaymentProvider>
      <MainLayout>
        <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-gray-900">
          <section className="mb-4 hidden sm:block">
            <Breadcrumb
              path={[
                {name: 'Akun', path: '/profile'},
                {name: 'Transaksi', path: '/profile/transaksi'},
                {name: 'Transaksi '+orderNumber, path: '/profile/transaksi?state=Pembayaran%20Tempo&order_id='+orderId},
                'Pembayaran Kartu',
              ]}
            />
          </section>

          <section className={`w-full ${data?.payment?.type === 'LOAN' ? 'sm:w-6/12' : ' sm:w-5/12'} mx-auto`}>
            {!isLoading && !isIdle && data !== '' ? (
                <CardPaymentValidationModal
                    open={cardPaymentModal}
                    setOpen={setCardPaymentModal}
                    payment={data.payment}
                    token={token}
                    check={setTokenValidationCheck}
                    discount={setDiscountAmount}
                    cardCvn={cardCvn}
                    orderId={orderId}
                    auth={setAuthValid}
                />
            ) : null

            }
            <div className="mb-2">
              <h1 className="text-xl  text-gray-900">Pembayaran Kartu</h1>
            </div>
            {isLoading || isIdle || data === '' ? (
              <Card className="w-full mb-4 text-sm">
                <h4>Proses Pengambilan Data</h4>
              </Card>
            ) : (
              <div className="w-full mb-4 text-sm space-y-2">
                <Card>
                  <h4 className="text-base text-gray-900 font-semibold mb-2">Ringkasan Belanja</h4>
                  <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 tracking-wide text-xs">Total Belanja</span>
                    <div className="text-gray-900 font-semibold">{currencyConverter(data.payment.total_amount)}</div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 tracking-wide text-xs">
                      Ongkos Kirim Dari: <span className="text-gray-900">DKI Jakarta</span>
                    </span>
                    <div className="text-gray-900 font-semibold">Rp 0</div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 tracking-wide text-xs">Total Pembayaran</span>
                    <div className="text-gray-900 font-semibold">{currencyConverter(data.payment.total_amount)}</div>
                  </div>
                  <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                  <div className="space-y-4 divide-y divide-gray-500 divide-dashed divide-opacity-40 bg-dnr-secondary-gray p-2 rounded-md">
                    <form className="flex flex-wrap gap-3 w-full mt-5 mb-5" onSubmit={cardPaymentHandler}>
                      <label className="relative w-full flex flex-col">
                        <span className="font-bold mb-3">Card number</span>
                        <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                               type="text" name="card_number" placeholder="0000 0000 0000"
                               onChange={(e) => {setCardNumber(e.target.value)}}
                               maxLength={16} required/>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                        </svg>
                      </label>

                      <label className="relative flex-1 flex flex-col">
                        <span className="font-bold mb-3">Expire date</span>
                        <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 p-5"
                               type="text" name="expire_date" placeholder="MM/YY"
                               onChange={(e) => {formatString(e)}}
                               defaultValue={cardExpired}
                               maxLength={7}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </label>

                      <label className="relative flex-1 flex flex-col">
                          <span className="font-bold flex items-center gap-3 mb-3">
                            CVC/CVV
                          </span>
                        <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                               type="number" name="card_cvc" placeholder="&bull;&bull;&bull;"
                               onChange={(e) => {setCardCvn(e.target.value)}}
                               maxLength={3} />
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                      </label>
                    </form>
                  </div>
                  <h4 className="text-base text-red-600 font-semibold mb-2 mt-2 animate-pulse text-center">{errMessage}</h4>
                  <HorizontalDivider className="border-dashed mt-2 mb-4" color="bg-gray-500" />
                  <div className="space-y-2">

                    <div className="text-gray-900 text-base leading-5 py-2 rounded-md flex-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between items-center">
                      <span className="mr-2">Batas Waktu Pembayaran</span>
                      <Timer
                          date={data.expired_at ? new Date(data.expired_at) : null}
                          unit="until"
                          time={30}
                          type="monthly"
                          color="bg-wi-blue"
                      />
                    </div>
                    <div className="flex space-x-2 mb-4">
                      {/*PembayaranButton*/}
                      <Button className="flex-1" onClick={cardPaymentHandler}>
                        Bayar Tagihan
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </section>
          <section>
            <SelectedProduct />
          </section>
        </main>
      </MainLayout>
    </CardPaymentProvider>
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
