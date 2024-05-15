import {useState} from 'react'
import {useQuery} from 'react-query'
import {PlusIcon, TrashIcon, PencilIcon} from '@heroicons/react/outline'

import {GrayBorderButton} from '../../button'
import {AddressBox} from '../../address'
import AddAddressModal from './AddAddressModal'
import {ConfirmationModal, HorizontalDivider} from '../../base'
import EditAddressModal from './EditAddressModal'

import {fetchAuthGet} from 'helpers/fetch'
import {authenticatedUser} from 'helpers/isAuthenticated'

export default function AddressDetail() {
  const [open, setOpen] = useState(false)
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [address, setSelectedAddress] = useState(null)

  const outletId = authenticatedUser().outlet_types_id?.id
  const {data, isLoading, isError, refetch} = useQuery(['outlet', outletId], () => fetchAuthGet(`outlet_types/${outletId}`), {
    retry: false,
  })

  // const {data, isLoading, refetch} = useQuery(
  //   ['address', authenticatedUser().id],
  //   () => fetchAuthGet(`outlet_addresses`),
  //   {
  //     select(addresses) {
  //       return addresses
  //         .map((data) => ({
  //           ...data,
  //           id: data.id,
  //           active: data.is_main,
  //           label: data.label,
  //           description: data.full_address + ' ' + data.city + ' ' + data.province,
  //         }))
  //         .sort((a, b) => (a.active ? -1 : 1))
  //     },
  //   }
  // )

  return (
    <section className="h-full">
      {/* <AddAddressModal
        open={open}
        setOpen={setOpen}
        onSuccess={() => {
          setOpen(false)
          refetch()
        }}
      /> */}
      {/* <EditAddressModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        address={address}
        onSuccess={() => {
          setOpenEditModal(false)
          refetch()
        }}
      /> */}
      {/* <ConfirmationModal
        open={openConfirmationModal}
        setOpen={setOpenConfirmationModal}
        title="Menghapus Alamat"
        message="Apakah anda yakin untuk menghapus alamat ini"
        confirmLabel="Hapus Alamat"
      /> */}
      <section className="flex-1 h-80 overflow-x-scroll mb-4">
        <div className="space-y-4">
          {isLoading ? (
            <p className="py-4 text-gray-500 text-center text-sm">Proses Pengambilan Data</p>
          ) : (
            <>
              {/* {data.map((address) => ( */}
                <AddressBox
                  address={{description:data?.address}}
                  // key={address.id}
                  // active={address.active}
                  editable={false}
                  // onEdit={() => {
                  //   setSelectedAddress(address)
                  //   setOpenEditModal(true)
                  // }}
                  // RightMobileComponent={() => (
                  //   <div className="sm:hidden space-x-4 flex items-center text-gray-300">
                  //     <TrashIcon
                  //       className="w-5 h-5 hover:text-red-500"
                  //       onClick={() => setOpenConfirmationModal(true)}
                  //     />
                  //     <PencilIcon
                  //       className="w-5 h-5 hover:text-dnr-blue"
                  //       onClick={() => {
                  //         setSelectedAddress(address)
                  //         setOpenEditModal(true)
                  //       }}
                  //     />
                  //   </div>
                  // )}
                />
              {/* ))} */}
            </>
          )}
        </div>
      </section>
      <section>
        <HorizontalDivider />
        {/* <div className="flex space-x-4 justify-end">
          <GrayBorderButton
            className="py-2 text-sm text-gray-700 flex space-x-1 items-center font-light button-disabled"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="w-4 h-4 svg-width-custom" />
            <span>Tambah Alamat</span>
          </GrayBorderButton>
        </div> */}
      </section>
    </section>
  )
}
