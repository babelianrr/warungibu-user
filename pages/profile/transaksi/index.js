import {Fragment} from 'react'
import {useQuery} from 'react-query'
import {Tab} from '@headlessui/react'

import {Breadcrumb, Card, HorizontalDivider} from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import {Sidebar, OrderDetail, OrderStatus, ReturStatus, BackendOrderStatus} from '@/components/profile'
import {fetchAuthGet} from 'helpers/fetch'

export default function Transaction() {
  const {data, isLoading, refetch} = useQuery('orders', () => fetchAuthGet('orders'))

  const processedOrder =
    data?.filter((order) => {
      if (order.payment.type === 'LOAN') {
        if (order.status === BackendOrderStatus.COMPLETED) {
          return order.payment.status === 'PENDING'
        }
        return order.status !== BackendOrderStatus.CANCELED
      }
      return order.status !== BackendOrderStatus.CANCELED && order.status !== BackendOrderStatus.COMPLETED
    }) ?? []
  const cancelledOrder = data?.filter((order) => order.status === BackendOrderStatus.CANCELED) ?? []
  const successOrder =
    data?.filter((order) => order.status === BackendOrderStatus.COMPLETED && order.payment.status === 'SUCCESS') ?? []

  return (
    <MainLayout>
      <main className="py-4 px-4 sm:px-0 mb-5 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <section className="mb-4 hidden sm:block">
          <Breadcrumb path={[{name: 'Beranda', path: '/'}, 'Transaksi']} />
        </section>
        <section className="flex sm:space-x-4">
          <Sidebar activeRoute="/transaksi" />
          <Card className="flex-1 text-gray-700" padding="p-0">
            <div className="px-5 pt-5">
              <h1 className="text-lg font-medium leading-4 tracking-normal mb-4">Transaksi</h1>
              <HorizontalDivider className="mb-2" />
            </div>

            <Tab.Group as="div">
              <section className="border-b border-gray-400 border-opacity-30 text-sm text-gray-500 cursor-pointer mb-4 px-5 font-light bg-white">
                <Tab.List className="flex space-x-10">
                  <Tab
                    className={({selected}) =>
                      `font-light ${
                        selected ? 'border-wi-blue font-normal' : null
                      } py-2.5 hover:text-gray-900 border-b-2 border-transparent hover:border-wi-blue`
                    }
                  >
                    Saat ini
                  </Tab>
                  <Tab
                    className={({selected}) =>
                      `font-light ${
                        selected ? 'border-wi-blue font-normal' : null
                      } py-2.5 hover:text-gray-900 border-b-2 border-transparent hover:border-wi-blue`
                    }
                  >
                    Selesai
                  </Tab>
                  <Tab
                    className={({selected}) =>
                      `font-light ${
                        selected ? 'border-wi-blue font-normal' : null
                      } py-2.5 hover:text-gray-900 border-b-2 border-transparent hover:border-wi-blue`
                    }
                  >
                    Dibatalkan
                  </Tab>
                  {/* <Tab
                    className={({selected}) =>
                      `${
                        selected ? 'border-wi-blue font-normal' : null
                      } py-2 border-b-2 border-transparent hover:border-dnr-dark-orange`
                    }
                  >
                    Retur
                  </Tab> */}
                </Tab.List>
              </section>

              <Tab.Panels as="div" className="px-4 pb-2">
                <Tab.Panel className="" as="section">
                  {/* Handle using loading */}
                  {isLoading ? (
                    <p className="py-4 text-gray-700 text-center text-sm">Proses Pengambilan Data</p>
                  ) : (
                    <OrderDetail list={processedOrder} refetch={refetch} />
                  )}
                </Tab.Panel>

                {/* <Tab.Panel className="" as="section">
                  <OrderDetail
                    list={[
                      OrderStatus.waiting,
                      OrderStatus.processed,
                      OrderStatus.ongoing,
                      OrderStatus.cod,
                      OrderStatus.tempo,
                      OrderStatus.arrived,
                    ]}
                  />
                </Tab.Panel> */}
                <Tab.Panel className="" as="section">
                  <section className="h-full text-center">
                    <div className="space-y-4">
                      {isLoading ? (
                        <p className="py-4 text-gray-700 text-center text-sm">Proses Pengambilan Data</p>
                      ) : (
                        <OrderDetail list={successOrder} refetch={refetch} />
                      )}
                    </div>
                  </section>
                  {/* <OrderDetail list={[OrderStatus.writeReview, OrderStatus.finished]} /> */}
                </Tab.Panel>
                <Tab.Panel className="" as="section">
                  <section className="h-full text-center">
                    <div className="space-y-4">
                      {isLoading ? (
                        <p className="py-4 text-gray-700 text-center text-sm">Proses Pengambilan Data</p>
                      ) : (
                        <OrderDetail list={cancelledOrder} refetch={refetch} />
                      )}
                    </div>
                  </section>
                  {/* <OrderDetail list={[OrderStatus.expired, OrderStatus.expired]} /> */}
                </Tab.Panel>
                {/* <Tab.Panel className="" as="section">
                  <OrderDetail list={Object.values(ReturStatus)} type="retur" />
                </Tab.Panel> */}
              </Tab.Panels>
            </Tab.Group>
          </Card>
        </section>
      </main>
    </MainLayout>
  )
}
