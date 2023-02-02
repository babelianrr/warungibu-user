import {useState} from 'react'
import {LockClosedIcon, PencilIcon} from '@heroicons/react/outline'
import {GrayBorderButton} from '../../button'
import {HorizontalDivider} from '../../base'
import UpdateUserModal from './UpdateUserModal'
import UpdatePasswordModal from './UpdatePasswordModal'
import {authenticatedUser} from 'helpers/isAuthenticated'
import currencyConverter from 'helpers/currencyConverter'

export default function UserDetail({user, refetch}) {
  const [open, setOpen] = useState(false)
  const [openChangePassword, setOpenChangePassword] = useState(false)

  const {name} = authenticatedUser()

  return (
    <section className="h-full flex flex-col">
      <UpdateUserModal open={open} setOpen={setOpen} onSuccess={refetch} />
      <UpdatePasswordModal open={openChangePassword} setOpen={setOpenChangePassword} />
      <div className="flex-1 min-h-300">
        <div className="flex flex-col mb-4">
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              {user?.photo_url ? (
                <img
                  src={process.env.NEXT_PUBLIC_URL + user?.photo_url}
                  className="w-16 h-16 bg-dnr-blue-light rounded-full object-cover items-center"
                  alt="user profile"
                />
              ) : (
                <img
                  src="https://nrcqmmgoobssxyudfvxm.supabase.in/storage/v1/object/public/dnr-asset/user.png"
                  className="w-16 h-16 bg-dnr-blue-light rounded-full object-cover items-center"
                  alt="user profile"
                />
              )}
              <div className="space-y-0.5">
                <p className="text-sm leading-6 font-medium text-gray-900">{name || '-'}</p>
                <p className="text-xs leading-4  text-gray-500">{user?.email || '-'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 sm:bg-gray-50 px-4">
            <span className="text-sm font-extralight leading-8 text-gray-500">Customer ID</span>
            <span className="text-sm leading-8 font-medium text-gray-900">: {user?.customer_id || '-'}</span>
          </div>
          <HorizontalDivider className="block sm:hidden my-2" />

          <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 px-4">
            <span className="text-sm font-extralight leading-8 text-gray-500">Nomor Handphone</span>
            <span className="text-sm leading-8 font-medium text-gray-900">: {user?.phone_number || '-'}</span>
          </div>
          <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 px-4">
            <span className="text-sm font-extralight leading-8 text-gray-500">Credit Limit</span>
            <span className="text-sm leading-8 font-medium text-gray-900">: {user?.loan_level ? currencyConverter(user?.loan_level) : '-'}</span>
          </div>
          <HorizontalDivider className="block sm:hidden my-2" />
          {/* {ktp ? (
            <>
              <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 sm:bg-gray-50 px-4">
                <span className="text-sm font-extralight sm:leading-8 text-gray-500">No. KTP</span>
                <span className="text-sm leading-8 font-medium text-gray-900">: {ktp || '-'}</span>
              </div>
              <HorizontalDivider className="block sm:hidden my-2" />
            </>
          ) : null} */}

          {/* <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 sm:bg-gray-50 px-4">
            <span className="text-sm font-extralight leading-8 text-gray-500">Tanggal Lahir</span>
            <span className="text-sm leading-8 font-medium text-gray-900">: {birthdate || '-'}</span>
          </div>
          <HorizontalDivider className="block sm:hidden my-2" /> */}

          {/* <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 sm:bg-gray-50 px-4 ">
            <span className="text-sm font-extralight leading-8 text-gray-500">Alamat</span>
            <span className="text-sm leading-8 font-medium text-gray-900 col-span-3">
              : Jl. Kampung Rawa Barat RT 005/02 No. B1, Kel. Pondok Pucung, Kec. Pondok Aren, Tangerang Selatan,
              Banten, 15229 Catatan : Cluster Ubud Ville.Bintaro, blok B1
            </span>
          </div> */}
        </div>
      </div>

      <section>
        <HorizontalDivider />
        <div className="flex space-x-4 justify-end">
          {/* <GrayBorderButton
            className="py-2 text-sm flex items-center space-x-2 font-light"
            onClick={() => setOpen(true)}
            hoverColor="hover:bg-dnr-dark-turqoise"
          >
            <PencilIcon className="w-4 h-4 svg-width-custom" />
            <span>Ubah Data Diri</span>
          </GrayBorderButton> */}
          <GrayBorderButton
            className="py-2 text-sm flex items-center space-x-2 font-light"
            onClick={() => setOpenChangePassword(true)}
            hoverColor="hover:bg-dnr-dark-turqoise"
          >
            <LockClosedIcon className="w-4 h-4 svg-width-custom" />
            <span>Ubah Kata Sandi</span>
          </GrayBorderButton>
        </div>
      </section>
    </section>
  )
}
