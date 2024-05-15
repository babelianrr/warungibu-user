import Image from 'next/image'
import {useQuery} from 'react-query'
import {useRouter} from 'next/router'
import useOrderDetail from 'hooks/useOrderDetail'

import {Card, HorizontalDivider} from '@/components/base'
import {CheckoutProvider} from 'contexts/CheckoutContext'
import currencyConverter from 'helpers/currencyConverter'
import {formateReviewDate} from 'helpers/formatDate'
import dnrLogo from 'public/assets/dnr_logo.svg'
import Lunas from 'public/assets/lunas_icon.svg'
import {fetchAuthGet} from 'helpers/fetch'
import {generatePriceFromCart} from 'helpers/generatePrice'

export default function Detail() {
  const router = useRouter()
  const orderId = router.query.order_id
  const {isLoading, data, isIdle} = useOrderDetail(orderId, 'invoice')
  const {data: user} = useQuery(['users'], () => fetchAuthGet(`users/${data?.user_id}`), {
    enabled: Boolean(data?.user_id),
  })
  const mainAddress = user?.outlet_addresses?.find((address) => address.isMain) || user?.outlet_addresses[0]

  function calculateSubTotal(carts) {
    return currencyConverter(carts.reduce((sum, cart) => sum + cart.final_unit_price, 0))
  }

  if (isLoading || isIdle || data === '' || !user) {
    return (
      <Card className="w-full mb-4 text-sm">
        <h4>Proses Pengambilan Data</h4>
      </Card>
    )
  }

  //let total_diskon = payment.promotion_discount !== null ? payment.promotion_discount : 0;
/*   let total_diskon = 0;
  
  function generateDiscount(cart){
    let diskon = Math.ceil( cart.unit_price - (cart.final_unit_price / cart.quantity) )
    total_diskon = total_diskon + Math.ceil((cart.unit_price * cart.quantity ) - cart.final_unit_price )

    if(diskon != 0){
      return currencyConverter(diskon)
    } else {
      return "-"
    }
  } */

  return (
    <CheckoutProvider>
      <main className="bg-white min-h-screen ">
        <section className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-gray-900">
          <section className={`w-full sm:w-3/4 mx-auto relative`}>
            <div className="absolute bottom-1/4 left-1/4 pointer-events-none">
              <Image src={Lunas} alt="Sudah Lunas" width={500} height={400} />
            </div>
            <div className="mb-2 flex justify-between items-center">
              <Image src={dnrLogo} alt="DNR Logo" width={100} height={40} />
              <h1 className="text-base font-semibold text-gray-900">Invoice {data.transaction_number}</h1>
            </div>
            <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />

            <section className="grid grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-gray-700 tracking-wide text-sm">Jenis Outlet</p>
                  <p className="text-gray-900 col-span-2">: {user?.outlets?.type}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-gray-700 tracking-wide text-sm">Pembeli</p>
                  <p className="text-gray-900 col-span-2">: {user?.outlets?.name}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-gray-700 tracking-wide text-sm">Tanggal</p>
                  <p className="text-gray-900 col-span-2">: {formateReviewDate(data.created_at)}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-gray-700 tracking-wide text-sm">No SIA</p>
                  <p className="text-gray-900 col-span-2">: {user?.outlets?.no_sia ?? '-'}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-gray-700 tracking-wide text-sm">No SIP</p>
                  <p className="text-gray-900 col-span-2">: {user?.outlets?.no_sipa ?? '-'}</p>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-gray-700 tracking-wide text-sm">Alamat: </p>
                  <p className="text-gray-900 col-span-2">
                    {mainAddress?.full_address + ' ' + mainAddress?.city + ' ' + mainAddress?.province}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Produk
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Jumlah
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Harga Produk
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Diskon/pcs
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Harga Diskon
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.carts.map((cart) => (
                            <tr className={'bg-white'} key={cart.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {cart.product.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cart.quantity}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {currencyConverter(cart.unit_price)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {cart.discount_percentage ? `${cart.discount_percentage}%` : '-'}
                                {/* {generateDiscount(cart)} */}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {currencyConverter(generatePriceFromCart(cart))}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {currencyConverter(cart.final_unit_price)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td
                              colSpan={4}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 text-right"
                            >
                              Subtotal Harga Barang
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {calculateSubTotal(data.carts)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border border-gray-300 rounded-md divide-y divide-gray-300 mb-8">
              {data.payment.order_discount ? (
                <div className="flex justify-between items-center px-6 py-4">
                  <span className="text-gray-700 tracking-wide text-sm">Potongan Discount</span>
                  <div className="text-red-500 font-semibold ">- {currencyConverter(data.payment.order_discount)}</div>
                </div>
              ) : null}
{/*               {total_diskon != 0 ? (
              <div className="flex justify-between items-center px-6 py-4">
                <span className="text-gray-700 tracking-wide text-sm">Potongan Discount</span>
                <div className="text-red-500 font-semibold">- {currencyConverter(total_diskon)}</div>
              </div>) : null }  */}  
              
              <div className="flex justify-between items-center px-6 py-4">
                <span className="text-gray-700 tracking-wide text-sm">Biaya Layanan</span>
                {/* <div className="text-gray-900 font-semibold">{state}</div> */}
                <div className="text-gray-900 font-semibold">{currencyConverter(data.payment.channel_fee)}</div>
              </div>
              <div className="flex justify-between items-center px-6 py-4">
                <span className="text-gray-700 tracking-wide text-sm">Pajak 11%</span>
                {/* <div className="text-gray-900 font-semibold">{state}</div> */}
                <div className="text-gray-900 font-semibold">{currencyConverter(data.payment.tax)}</div>
              </div>
              <div className="flex justify-between items-center px-6 py-4">
                <span className="text-gray-700 tracking-wide text-sm">Ongkos Kirim</span>
                {/* <div className="text-gray-900 font-semibold">{state}</div> */}
                <div className="text-gray-900 font-semibold">Rp 0</div>
              </div>
              {
                data.payment.promotion_discount > 0 ? (
                      <div className="flex justify-between items-center px-6 py-4">
                        <span className="text-gray-700 tracking-wide text-sm">Discount</span>
                        {/* <div className="text-gray-900 font-semibold">{state}</div> */}
                        <div className="text-gray-900 font-semibold">({currencyConverter(data.payment.promotion_discount)})</div>
                      </div>
                  ) : null
              }
            </section>

            <section className="mb-8">
              <div className="flex justify-end space-x-4 items-center p-4 bg-gray-50 rounded-md">
                <span className="text-gray-700 tracking-wide text-sm">Total Bayar</span>
                {/* <div className="text-gray-900 font-semibold">{state}</div> */}
                <div className="text-gray-900 font-semibold">{currencyConverter(data.payment.total_amount - data.payment.promotion_discount)}</div>
              </div>
            </section>
          </section>
        </section>
      </main>
    </CheckoutProvider>
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
