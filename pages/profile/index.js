import {Fragment, useState} from 'react'
import {Tab} from '@headlessui/react'
import {useQuery} from 'react-query'
import {ExclamationIcon} from '@heroicons/react/outline'

import ProtectedRoute from '@/components/HOC/ProtectedRoute'
import {Breadcrumb, Card, HorizontalDivider} from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import {
  UserDetail,
  AddressDetail,
  AccountDetail,
  Sidebar,
  OutletDetail,
  OutletLicense,
  AddCustomerIdModal,
} from '@/components/profile'

import {authenticatedUser} from 'helpers/isAuthenticated'
import {fetchAuthGet} from 'helpers/fetch'

function Profile() {
  const [open, setOpen] = useState(false)
  const userId = authenticatedUser().id

  const {data, isLoading, isError, refetch} = useQuery(['users', userId], () => fetchAuthGet(`users/${userId}`), {
    retry: false,
  })

  return (
    <MainLayout>
      <main className="mx-auto py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl">
        <AddCustomerIdModal
          open={open}
          setOpen={setOpen}
          onSuccess={() => {
            setOpen(false)
            refetch()
          }}
        />
        <section className="mb-4 hidden sm:block">
          <Breadcrumb path={[{name: 'Beranda', path: '/'}, 'Profile']} />
        </section>

        <section className="flex space-x-4">
          <Sidebar activeRoute="/" />
          <div className="flex-1">
            {!isLoading && data?.customer_id === null ? (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 capitalize">Masukan Customer Id Anda</h3>
                  </div>
                  <div className="ml-auto">
                    <h3
                      className="text-sm font-medium text-red-800 hover:underline cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      Tambahkan
                    </h3>
                  </div>
                </div>
              </div>
            ) : null}
            <Card className="flex-1 p-5 text-gray-700">
              <h1 className="text-lg font-medium leading-4 tracking-normal mb-4">Akun Saya</h1>
              <HorizontalDivider className="mb-2" />
              <Tab.Group as="div">
                <section className="border-b border-gray-400 border-opacity-30 text-sm font-light text-gray-500 cursor-pointer mb-6">
                  <Tab.List className="flex space-x-10">
                    <Tab
                      className={({selected}) =>
                        `font-light ${
                          selected ? 'border-wi-blue font-normal' : null
                        } py-2.5 hover:text-gray-900 border-b-2 border-transparent hover:border-wi-blue`
                      }
                    >
                      Informasi Data Diri
                    </Tab>
                    <Tab
                      className={({selected}) =>
                        `font-light ${
                          selected ? 'border-wi-blue font-normal' : null
                        } py-2.5 hover:text-gray-900 border-b-2 border-transparent hover:border-wi-blue `
                      }
                    >
                      Informasi Data Perusahaan
                    </Tab>
                    {/* <Tab
                      className={({selected}) =>
                        `font-light ${
                          selected ? 'border-wi-blue font-normal' : null
                        } py-2.5 hover:text-gray-900 border-b-2 border-transparent hover:border-wi-blue `
                      }
                    >
                      Perijinan Outlet
                    </Tab> */}
                    <Tab
                      className={({selected}) =>
                        `font-light ${
                          selected ? 'border-wi-blue font-normal' : null
                        } py-2.5 hover:text-gray-900  border-b-2 border-transparent hover:border-wi-blue`
                      }
                    >
                      Alamat Pengiriman
                    </Tab>
                    {/* <Tab
                      className={({selected}) =>
                        `${
                          selected ? 'border-wi-blue' : null
                        } py-2.5 hover:text-gray-900 border-b-2 border-transparent hover:border-wi-blue`
                      }
                    >
                      Rekening Pembayaran
                    </Tab> */}
                  </Tab.List>
                </section>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="" as="section">
                    <UserDetail user={data} refetch={refetch} />
                  </Tab.Panel>
                  <Tab.Panel className="h-96" as="section">
                    <OutletDetail />
                  </Tab.Panel>
                  {/* <Tab.Panel className="" as="section">
                    <OutletLicense />
                  </Tab.Panel> */}
                  <Tab.Panel className="h-96" as="section">
                    <AddressDetail />
                  </Tab.Panel>
                  {/* <Tab.Panel className="h-96" as="section">
                    <AccountDetail />
                  </Tab.Panel> */}
                </Tab.Panels>
              </Tab.Group>
            </Card>
          </div>
        </section>
      </main>
    </MainLayout>
  )
}

export default ProtectedRoute(Profile)
