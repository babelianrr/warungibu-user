import {useState} from 'react'
import {useRouter} from 'next/router'
import {Card} from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import {ChevronRightIcon, ExclamationIcon} from '@heroicons/react/outline'
import NavLink from '@/components/base/NavLink'
import {authenticatedUser} from 'helpers/isAuthenticated'
import {AddCustomerIdModal} from '@/components/profile'

export default function Profile() {
  const router = useRouter()
  const {name, email, photo_url, customer_id} = authenticatedUser()
  const [open, setOpen] = useState(false)

  function logoutUser() {
    localStorage.removeItem('google_token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <MainLayout>
      <AddCustomerIdModal
        open={open}
        setOpen={setOpen}
        onSuccess={() => {
          setOpen(false)
        }}
      />
      <main className="mx-auto py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl">
        <section className="space-y-4">
          {!customer_id ? (
            <Card className="px-2 flex cursor-pointer w-full bg-red-50 mb-4 items-center" onClick={() => setOpen(true)}>
              <div className="flex space-x-2 flex-1 items-center">
                <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                <h6 className="flex-1 text-red-800 leading-4  p-1">Masukkan Customer Id Anda</h6>
              </div>
              <h3 className="text-sm font-medium text-red-800 hover:underline cursor-pointer">Tambahkan</h3>
            </Card>
          ) : null}
          <NavLink href="/profile/mobile/user">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-6 items-center">
                <img
                  src={
                    photo_url
                      ? process.env.NEXT_PUBLIC_URL + photo_url
                      : 'https://nrcqmmgoobssxyudfvxm.supabase.in/storage/v1/object/public/dnr-asset/user.png'
                  }
                  className="w-24 h-24 bg-dnr-blue-light rounded-full object-cover items-center"
                  alt="user profile"
                />
                <div className="space-y-0.5">
                  <p className="text-lg leading-6 font-semibold text-gray-900">{name}</p>
                  <p className="text-sm leading-4  text-gray-500">{email}</p>
                </div>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            </div>
          </NavLink>
          <NavLink href="/profile/mobile/outlet-information">
            <Card className="px-2 flex items-center cursor-pointer w-full mb-4">
              <h6 className="flex-1 text-gray-900 leading-4  p-1">Informasi</h6>
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            </Card>
          </NavLink>
          {/* <NavLink href="/profile/mobile/outlet-license">
            <Card className="px-2 flex items-center cursor-pointer w-full mb-4">
              <h6 className="flex-1 text-gray-900 leading-4  p-1">Perijinan Outlet</h6>
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            </Card>
          </NavLink> */}
          <NavLink href="/profile/mobile/address">
            <Card className="px-2 flex items-center cursor-pointer w-full mb-4">
              <h6 className="flex-1 text-gray-900 leading-4  p-1">Alamat Pengiriman</h6>
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            </Card>
          </NavLink>
          {/* <NavLink href="/profile/mobile/rekening">
            <Card className="px-2 flex items-center cursor-pointer w-full mb-4">
              <h6 className="flex-1 text-gray-900 leading-4  p-1">Rekening Pembayaran</h6>
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            </Card>
          </NavLink> */}
          <div onClick={logoutUser}>
            <Card className="px-2 flex items-center cursor-pointer w-full mb-4">
              <h6 className="flex-1 text-gray-900 leading-4  p-1">Keluar</h6>
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            </Card>
          </div>
        </section>
      </main>
    </MainLayout>
  )
}
