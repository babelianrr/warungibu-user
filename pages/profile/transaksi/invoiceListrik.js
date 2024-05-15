import Image from 'next/image'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import useOrderDetail from 'hooks/useOrderDetail'

import { Card, HorizontalDivider } from '@/components/base'
import { CheckoutProvider } from 'contexts/CheckoutContext'
import currencyConverter from 'helpers/currencyConverter'
import formatDate, { formateReviewDate } from 'helpers/formatDate'
import dnrLogo from 'public/assets/dnr_logo.svg'
// import bicartLogo from './../../public/assets/bicart-ic.png'
import bicartLogo from './../../../public/assets/bicart-ic.png'
import Lunas from 'public/assets/lunas_icon.svg'
import { fetchAuthGet } from 'helpers/fetch'
import { generatePriceFromCart } from 'helpers/generatePrice'
import { useEffect, useState } from 'react'
import tokenConverter from 'helpers/tokenConverter'

export default function Detail() {
  const router = useRouter()
  const orderId = router.query.order_id
  // const [total, setTotal] = useState(0)
  const { data: invoice, isLoading } = useQuery(['invoice-ppob'], () => fetchAuthGet(`orders/${orderId}/get-invoice-ppob`))

  if (isLoading) {
    return (
      <Card className="w-full mb-4 text-sm">
        <h4>Proses Pengambilan Data</h4>
      </Card>
    )
  }

  // if (data) {
  //   data?.order?.carts.map((cart, i) => (
  //     total+=cart.final_unit_price
  //   ))
  // }

  // console.log('data1 :', data?.order)
  // return ""
  return (
    <CheckoutProvider>
      <main className="bg-white min-h-screen ">
        <section className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-gray-900">
          <section className={`w-full sm:w-3/4 mx-auto relative`}>
            {/* <Image src={Lunas} alt="Sudah Lunas" width={500} height={400} /> transform  -rotate-45 */}

            <div className="mb-3 flex justify-between items-center">
              <Image src={bicartLogo} alt="Logo" width={90} height={90} />
              <div className="mb-3 flex items-center">
                <h3 className="w-full text-right sm:text-left text-sm sm:text-base font-semibold text-gray-900 mr-5">Invoice {invoice?.order?.transaction_number}</h3>
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
                    <img
                      className="w-14 h-14 rounded-md"
                      alt="product image"
                      src={`${process.env.NEXT_PUBLIC_URL}/assets/token-listrik.png`}
                    />
                  </td>
                  <td>
                    <table className='ml-2'>
                      <tr>
                        <td><p className='text-gray-900 text-xs font-medium sm:text-sm pr-2'>Nomor Transaksi</p></td>
                        <td><p className='text-gray-700 text-xs sm:text-sm'>{invoice?.order?.transaction_number ?? '-'}</p></td>
                      </tr>
                      <tr>
                        <td><p className='text-gray-900 text-xs font-medium sm:text-sm pr-2'>Tanggal</p></td>
                        <td><p className='text-gray-700 text-xs sm:text-sm'>{ invoice?.order?.created_at ? formatDate(invoice?.order?.created_at) :'-' }</p></td>
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
                    <td className='text-xs sm:text-sm px-2 py-2'>{invoice?.order?.carts[0]?.product?.name ?? '-'}</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>No Meter</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{invoice?.order?.payment?.account_number ?? '-'}</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>ID Pelanggan</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{invoice?.order?.payment?.payment_reference_number ?? '-'}</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Nama</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{invoice?.order?.payment?.account_name ?? '-'}</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Tarif/Daya</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{invoice?.order?.payment?.channel ?? '-'}</td>
                  </tr>
                  {/* <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>No Ref</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{invoice?.order?.payment?.channel ?? '-'}</td>
                  </tr> */}
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Rp Bayar</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{currencyConverter(invoice?.order?.payment?.total_amount)}</td>
                  </tr>
                  {/* <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>PPn</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{currencyConverter(0)}</td>
                  </tr>
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>PPj</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{currencyConverter(0)}</td>
                  </tr> */}
                  {/* <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Rp Stroom/Token</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{currencyConverter(54000)}</td>
                  </tr> */}
                  {/* <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Jml KWH</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>33,000</td>
                  </tr> */}
                  <tr className='bg-white border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Stroom/Token</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>{tokenConverter(invoice?.order?.payment?.reference_number)}</td>
                  </tr>
                  <tr className='bg-gray-400 border border-gray-600'>
                    <td className='text-xs sm:text-sm px-2 py-2'>Info Tambahan</td>
                    <td className='text-xs sm:text-sm px-2 py-2'>Informasi Hubungi Call center</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section className="mb-8 flex justify-end">
              <div className='flex gap-5'>
                <p className='text-dnr-dark-orange text-sm font-bold'>Total Bayar</p>
                <p className='text-dnr-dark-orange text-sm font-semibold'>{currencyConverter(invoice?.order?.payment?.total_amount)}</p>
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
