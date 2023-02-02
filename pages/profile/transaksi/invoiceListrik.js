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

            <div className="mb-3 flex justify-between items-center">
              <Image src={bicartLogo} alt="Logo" width={130} height={90} />
              <div className="mb-3 flex items-center">
                <h3 className="w-full text-right sm:text-left text-sm sm:text-base font-semibold text-gray-900 mr-5">Invoice {data?.transaction_number}</h3>
              </div>
            </div>

            <div>
              <p className='text-gray-900 text-xs font-medium sm:text-sm'>Invoice Listrik</p>
              <p className='text-gray-700 text-xs sm:text-sm'>Invoice ini merupakan bukti pembayaran yang sah, dan diterbitkan atas nama Partner</p>
            </div>

            <section className="mb-4 mt-3">
              <table>
                <tr>
                  <td>
                    <Image src={bicartLogo} alt="Logo" width={70} height={70} />
                  </td>
                  <td>
                    <table className='ml-2'>
                      <tr>
                        <td><p className='text-gray-900 text-xs font-medium sm:text-sm pr-2'>Nomor Transaksi</p></td>
                        <td><p className='text-gray-700 text-xs sm:text-sm'>AA9970</p></td>
                      </tr>
                      <tr>
                        <td><p className='text-gray-900 text-xs font-medium sm:text-sm pr-2'>Tanggal</p></td>
                        <td><p className='text-gray-700 text-xs sm:text-sm'>Kamis, 05 Januari 2023</p></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </section>

            <section className="mb-8">
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-400'>
                    <th className='text-xs sm:text-sm px-2 py-2 border border-gray-400'>
                      <span className='float-left'>Keterangan</span>
                    </th>
                    <th className='text-xs sm:text-sm px-2 py-2 border border-gray-400'>
                      <span className='float-left'>
                        Transaksi Berhasil
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Produk</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>Token Listrik {currencyConverter(5000)}</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>No Meter</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>34323456567</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>ID Pelanggan</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>56678788597</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Nama</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>Agustusan</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Tarif/Daya</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>R1/00889VA</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>No Ref</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>046FGGHJKKK</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Rp Bayar</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{currencyConverter(42000)}</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>PPn</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{currencyConverter(0)}</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>PPj</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{currencyConverter(0)}</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Rp Stroom/Token</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{currencyConverter(54000)}</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Jml KWH</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>33,000</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Stroom/Token</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{'645775.787.8766'}</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Info Tambahan</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>Informasi Hubungi Call center</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="mb-8 flex justify-end">
              <div className='flex gap-5'>
                <p className='text-dnr-dark-orange text-sm font-bold'>Total Bayar</p>
                <p className='text-dnr-dark-orange text-sm font-semibold'>{currencyConverter(42000)}</p>
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
