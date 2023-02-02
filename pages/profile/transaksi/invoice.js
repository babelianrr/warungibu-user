import Image from 'next/image'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import useOrderDetail from 'hooks/useOrderDetail'

import { Card, HorizontalDivider } from '@/components/base'
import { CheckoutProvider } from 'contexts/CheckoutContext'
import currencyConverter from 'helpers/currencyConverter'
import { formateReviewDate } from 'helpers/formatDate'
import dnrLogo from 'public/assets/dnr_logo.svg'
// import bicartLogo from './../../public/assets/bicart-ic.png'
import bicartLogo from './../../../public/assets/bicart-ic.png'
import Lunas from 'public/assets/lunas_icon.svg'
import { fetchAuthGet } from 'helpers/fetch'
import { generatePriceFromCart } from 'helpers/generatePrice'
import { useEffect, useState } from 'react'

export default function Detail() {
  const router = useRouter()
  const orderId = router.query.order_id
  // const [total, setTotal] = useState(0)
  const { isLoading, data, isIdle } = useOrderDetail(orderId, 'invoice')
  const { data: user } = useQuery(['users'], () => fetchAuthGet(`users/${data?.user_id}`), {
    enabled: Boolean(data?.user_id),
    
  })
  // const mainAddress = user?.outlet_addresses?.find((address) => address.isMain) || user?.outlet_addresses[0]
  const mainAddress = user?.outlet_types_id
  let total = 0

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

  if (data) {
    data?.carts.map((cart, i) => (
      total+=cart.final_unit_price
    ))
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

  function countBatch(data) {
    let total_batch = 0
    data && (
      data.map((batch) => {
        total_batch += batch.quantity
      })
    )
    return total_batch
  }

  function dueTime(date, due) {
    var dates = new Date(date)
    var rawDate = dates.setDate(dates.getDate() + due)
    var fix = new Date(rawDate)
    var result = formateReviewDate(fix)

    return result
  }

  let count = 0
  function numList() {
    let val = count += 1
    return val
  }


  return (
    <CheckoutProvider>
      <main className="bg-white min-h-screen ">
        <section className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-gray-900">
          <section className={`w-full sm:w-3/4 mx-auto relative`}>
            {/* <Image src={Lunas} alt="Sudah Lunas" width={500} height={400} /> transform  -rotate-45 */}
            {
              data.payment.status === "SUCCESS" ?
                <>
                  <div className={`invisible  md:visible absolute bottom-1/4 left-1/4 border-4 border-green-300 w-120 h-32 flex items-center justify-center opacity-40`}> 
                    <span className={`text-5xl text-center text-green-300`}>Sudah Lunas</span>
                  </div>

                  <div className={`visible md:invisible absolute bottom-7 left-16 sm:left-1/4 border-4 border-green-300 w-48 h-12 flex items-center justify-center opacity-60`}> 
                    <span className={`text-2xl text-center text-green-300`}>Sudah Lunas</span>
                  </div>
                </>
              :
                <>
                  <div className={`invisible  md:visible absolute bottom-1/4 left-1/4 border-4 border-red-300 w-120 h-32 flex items-center justify-center opacity-40`}> 
                    <span className={`text-5xl text-center text-red-300`}>Belum Lunas</span>
                  </div>

                  <div className={`visible md:invisible absolute bottom-7 left-16 sm:left-1/4 border-4 border-red-300 w-48 h-12 flex items-center justify-center opacity-60`}> 
                    <span className={`text-2xl text-center text-red-300`}>Belum Lunas</span>
                  </div>
                </>
            }

            <div className="mb-3 flex justify-between items-center">
              <Image src={bicartLogo} alt="Logo" width={65} height={65} />
              <div className="mb-3 flex items-center">
                <h3 className="w-full text-right sm:text-left text-sm sm:text-base font-semibold text-gray-900 mr-5">Invoice {data?.transaction_number}</h3>
              </div>
            </div>

            {/* <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" /> */}

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-gray-700 tracking-wide text-xs sm:text-sm">Pembeli</p>
                  <p className="text-gray-900 col-span-2 text-xs sm:text-sm">: {user?.name ?? '-'}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-gray-700 tracking-wide text-xs sm:text-sm">Tanggal</p>
                  <p className="text-gray-900 col-span-2 text-xs sm:text-sm">: {data?.payment?.invoice_date ? formateReviewDate(data.payment.invoice_date) : '-'}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center sm:hidden">
                  <p className="text-gray-700 tracking-wide text-xs sm:text-sm">Alamat</p>
                  <p className="text-gray-900 col-span-2 text-xs sm:text-sm">: {mainAddress?.address ?? '-'}</p>
                </div>
              </div>
              <div className='space-y-2 hidden sm:block'>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <p className="text-gray-700 tracking-wide text-sm">Alamat</p>
                  <p className="text-gray-900 col-span-2 text-sm">: {mainAddress?.address ?? '-'}</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex flex-col">
                {/* <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
                <div className="-my-2 sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    {/* <div className="shadow overflow-hidden"> */}
                    <div className="shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-1 py-0.5 md:px-6 md:py-3 bg-wi-blue text-left font-medium text-white uppercase tracking-wider border border-black"
                            >
                              <span className='text-xxs sm:text-xs'>Produk</span>
                            </th>
                            <th
                              scope="col"
                              className="px-1 py-0.5 md:px-6 md:py-3 bg-wi-blue text-left font-medium text-white uppercase tracking-wider border border-black"
                            >
                              <span className='text-xxs sm:text-xs'>Jumlah</span>
                            </th>
                            <th
                              scope="col"
                              className="px-1 py-0.5 md:px-6 md:py-3 bg-wi-blue text-left font-medium text-white uppercase tracking-wider border border-black"
                            >
                              <span className='text-xxs sm:text-xs leading-xxs'>Harga Produk</span>
                            </th>
                            {/* <th
                              scope="col"
                              className="px-1 py-0.5 md:px-6 md:py-3 bg-wi-blue text-left font-medium text-white uppercase tracking-wider border border-black"
                            >
                              <span className='text-xxs sm:text-xs'>Diskon</span>
                            </th>
                            <th
                              scope="col"
                              className="px-1 py-0.5 md:px-6 md:py-3 bg-wi-blue text-left font-medium text-white uppercase tracking-wider border border-black"
                            >
                              <span className='text-xxs sm:text-xs'>Harga Diskon</span>
                            </th> */}
                            <th
                              scope="col"
                              className="px-1 py-0.5 md:px-6 md:py-3 bg-wi-blue text-left font-medium text-white uppercase tracking-wider border border-black"
                            >
                              <span className='text-xxs sm:text-xs'>Subtotal</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            data?.carts.map((cart, i) => (

                              // cart.batch ? (
                              //   cart?.batch.map((batches, index) => (
                              //     <tr className={'bg-white'} key={batches.id}>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {cart.product.sku_number}
                              //       </td>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {cart.product.name}
                              //       </td>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {batches.batch_no}
                              //       </td>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {formateReviewDate(batches.exp_date)}
                              //       </td>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {cart.product.unit}
                              //       </td>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {batches.quantity}
                              //       </td>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {currencyConverter(cart.unit_price)}
                              //       </td>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {currencyConverter(cart.product.discount_price)}
                              //       </td>
                              //       <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                              //         {currencyConverter(cart.unit_price * batches.quantity)}
                              //       </td>
                              //     </tr>
                              //   ))
                              // ) : (
                                <tr className={'bg-white'} key={cart.id}>
                                  <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 border border-black">
                                    {cart.product.name}
                                  </td>
                                  <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 border border-black">
                                    {cart.quantity} {cart.product.unit}
                                  </td>
                                  <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 border border-black">
                                    {currencyConverter(cart.product.price)}
                                  </td>
                                  {/* <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 border border-black">
                                    {cart?.discount_percentage ? cart?.discount_percentage+'%' : '-'}
                                  </td>
                                  <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 border border-black">
                                    {currencyConverter((cart.unit_price * cart?.discount_percentage/100))}
                                  </td> */}
                                  <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 border border-black">
                                    {currencyConverter(cart.final_unit_price)}
                                  </td>
                                </tr>
                                
                              // )
                            ))
                          }
                          <tr className={'bg-white'} key='total'>
                            <td colSpan={3} className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-right font-semibold text-gray-900 border border-black">
                              Total
                            </td>
                            <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm font-semibold text-gray-900 border border-black">
                              {currencyConverter(total)}
                            </td>
                          </tr>
                          <tr className={'bg-white'} key={1}>
                            <td colSpan={4} className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap">
                            </td>
                          </tr>
                          <tr className={'bg-white'} key={1}>
                            <td colSpan={3} className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 text-right border border-black">
                              Biaya Layanan
                            </td>
                            <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 border border-black">
                              {/* {currencyConverter(data?.shipment?.price)} */}
                              {currencyConverter(0)}
                            </td>
                          </tr>
                          <tr className={'bg-white'} key={2}>
                            <td colSpan={3} className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 text-right border border-black">
                              Total Pembayaran
                            </td>
                            <td className="px-1 py-0.5 md:px-6 md:py-4 whitespace-nowrap text-xxs sm:text-sm text-gray-900 border border-black">
                              {currencyConverter(total+data?.shipment?.price)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </section>
        </section>
      </main>
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
