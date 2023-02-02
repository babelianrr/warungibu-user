import {useState} from 'react'
import {PencilIcon} from '@heroicons/react/outline'
import {useQuery} from 'react-query'

import {GrayBorderButton} from '../../button'
import {HorizontalDivider} from '../../base'
import UpdateOutletModal from './UpdateOutletModal'
import AddCustomerIdModal from './AddCustomerIdModal'

import {fetchAuthGet} from 'helpers/fetch'
import {authenticatedUser} from 'helpers/isAuthenticated'

export default function OutletDetail() {
  const [open, setOpen] = useState(false)
  const [addCustomerId, setCustomerId] = useState(false)

  const outletId = authenticatedUser().outlet_types_id?.id
  const {data, isLoading, isError, refetch} = useQuery(['outlet', outletId], () => fetchAuthGet(`outlet_types/${outletId}`), {
    retry: false,
  })

  const {data: outletTypes} = useQuery('outlet_types', () => fetchAuthGet(`outlet_types`), {
    select(outletTypes) {
      return outletTypes.map((outletType) => ({id: outletType?.id, value: outletType.name}))
    },
    initialData: [],
  })

  return (
    <section className="h-full flex flex-col">
      <UpdateOutletModal open={open} setOpen={setOpen} refetch={refetch} data={data} outletTypes={outletTypes} />
      <AddCustomerIdModal
        open={addCustomerId}
        setOpen={setCustomerId}
        onSuccess={() => {
          setCustomerId(false)
          refetch()
        }}
      />

      <div className="flex-1">
        {isLoading ? (
          <p className="py-4 text-gray-700 text-center text-sm font-light">Proses Pengambilan Data</p>
        ) : isError ? (
          <p className="py-4 text-gray-700 text-center text-sm font-light">Data Outlet tidak tersedia</p>
        ) : (
          <div className="flex flex-col mb-4">
            <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 px-4 sm:bg-gray-50">
              <span className="text-sm font-extralight leading-8 text-gray-500">Nama Perusahaan</span>
              <span className="text-sm leading-8 font-medium text-gray-900">: {data.name || '-'}</span>
            </div>
            {/* <HorizontalDivider className="block sm:hidden my-2" />
            <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 px-4">
              <span className="text-sm font-extralight leading-8 text-gray-500">Jenis Outlet</span>
              <span className="text-sm leading-8 font-medium text-gray-900">: {data.type || '-'}</span>
            </div> */}
            {/* <HorizontalDivider className="block sm:hidden my-2" />

            <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 px-4 sm:bg-gray-50">
              <span className="text-sm font-extralight leading-8 text-gray-500">No. NPWP</span>
              <span className="text-sm leading-8 font-medium text-gray-900">: {data.npwp || '-'}</span>
            </div> */}
            <HorizontalDivider className="block sm:hidden my-2" />

            <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 px-4">
              <span className="text-sm font-extralight leading-8 text-gray-500">No. Telp Perusahaan</span>
              <span className="text-sm leading-8 font-medium text-gray-900">: {data.phone || '-'}</span>
            </div>
            {/* <HorizontalDivider className="block sm:hidden my-2" />

            <div className="flex flex-col sm:inline-grid sm:grid-cols-4 sm:gap-4 p-2 px-4 sm:bg-gray-50">
              <span className="text-sm font-extralight leading-8 text-gray-500">No. Handphone Outlet</span>
              <span className="text-sm leading-8 font-medium text-gray-900">: {data.mobile_phone || '-'}</span>
            </div> */}
          </div>
        )}
      </div>

      <section>
        <HorizontalDivider />
        <div className="flex space-x-4 justify-end">
          {/* <GrayBorderButton
            className="py-2 text-sm flex items-center space-x-2 font-light"
            onClick={() => setOpen(true)}
            hoverColor="hover:bg-dnr-dark-turqoise"
          >
            <PencilIcon className="w-3.5 h-3.5 svg-width-custom" />
            <span>Ubah Informasi Outlet</span>
          </GrayBorderButton> */}
        </div>
      </section>
    </section>
  )
}
