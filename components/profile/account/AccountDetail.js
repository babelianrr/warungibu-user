import {useState} from 'react'
import {PlusIcon, TrashIcon, PencilIcon} from '@heroicons/react/outline'
import {useQuery} from 'react-query'

import {GrayBorderButton} from '../../button'
import AddAccountModal from './AddAccountModal'
import EditAccountModal from './EditAccountModal'
import {ConfirmationModal, HorizontalDivider} from '../../base'

import {authenticatedUser} from 'helpers/isAuthenticated'
import {fetchAuthGet} from 'helpers/fetch'

export default function AccountDetail() {
  const [open, setOpen] = useState(false)
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const {data, isLoading} = useQuery(['account', authenticatedUser().id], () => fetchAuthGet(`bank_accounts`))

  return (
    <section className="h-full">
      <AddAccountModal open={open} setOpen={setOpen} />
      <EditAccountModal open={openEditModal} setOpen={setOpenEditModal} />

      <ConfirmationModal
        open={openConfirmationModal}
        setOpen={setOpenConfirmationModal}
        title="Menghapus Rekening"
        message="Apakah anda yakin untuk menghapus rekening ini"
        confirmLabel="Hapus Rekening"
      />
      <section className="flex-1 h-80 overflow-x-scroll mb-4">
        {isLoading ? (
          <p className="py-4 text-gray-700 text-center text-lg">Proses Pengambilan Data</p>
        ) : data.length === 0 ? (
          <p className="py-4 text-gray-700 text-center text-lg">Tidak ada rekening yang terdaftar</p>
        ) : (
          <div className="space-y-4 hidden sm:block">
            <div className="border border-gray-300 p-4 rounded-md shadow text-sm text-gray-700 flex justify-between">
              <div>
                <p className="leading-6">
                  <span className="text-gray-900 font-semibold">Bank BCA</span> - Cabang Setia budi
                </p>
                <p>
                  Nomor Rekening <span className="text-dnr-dark-green">: 123-123-123</span> a/n
                  <span className="text-gray-900 font-semibold ml-1">Mr Lorem Ipsum</span>
                </p>
              </div>
              <div className="space-x-4 flex items-center text-gray-300">
                <TrashIcon
                  className="w-4 h-4 hover:text-red-500 cursor-pointer"
                  onClick={() => setOpenConfirmationModal(true)}
                />
                <PencilIcon
                  className="w-4 h-4 hover:text-dnr-blue cursor-pointer"
                  onClick={() => setOpenEditModal(true)}
                />
              </div>
            </div>
            <div className="border border-gray-300 p-4 rounded-md shadow text-sm text-gray-700 flex justify-between">
              <div>
                <p className="leading-6">
                  <span className="text-gray-900 font-semibold">Bank BCA</span> - Cabang Setia budi
                </p>
                <p>
                  Nomor Rekening <span className="text-dnr-dark-green">: 123-123-123</span> a/n
                  <span className="text-gray-900 font-semibold ml-1">Mr Lorem Ipsum</span>
                </p>
              </div>
              <div className="space-x-4 flex items-center text-gray-300">
                <TrashIcon
                  className="w-4 h-4 hover:text-red-500 cursor-pointer"
                  onClick={() => setOpenConfirmationModal(true)}
                />
                <PencilIcon
                  className="w-4 h-4 hover:text-dnr-blue cursor-pointer"
                  onClick={() => setOpenEditModal(true)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 block sm:hidden">
          <div className="border border-gray-300 p-4 rounded-md shadow text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <div>
                <div className="leading-6 text-sm">
                  <p className="text-gray-500 text-xs">Bank</p>
                  <p className="text-gray-900 font-semibold">BCA</p>
                  <p className="text-gray-700">Cabang Setia budi</p>
                </div>
              </div>
              <div className="space-x-4 flex items-center text-gray-300 self-start">
                <TrashIcon
                  className="w-5 h-5 hover:text-red-500 cursor-pointer"
                  onClick={() => setOpenConfirmationModal(true)}
                />
                <PencilIcon
                  className="w-5 h-5 hover:text-dnr-blue cursor-pointer"
                  onClick={() => setOpenEditModal(true)}
                />
              </div>
            </div>
            <p>
              Nomor Rekening <span className="text-dnr-dark-green">: 123-123-123</span> a/n
              <span className="text-gray-900 font-semibold ml-1">Mr Lorem Ipsum</span>
            </p>
          </div>

          <div className="border border-gray-300 p-4 rounded-md shadow text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <div>
                <div className="leading-6 text-sm">
                  <p className="text-gray-500 text-xs">Bank</p>
                  <p className="text-gray-900 font-semibold">BCA</p>
                  <p className="text-gray-700">Cabang Setia budi</p>
                </div>
              </div>
              <div className="space-x-4 flex items-center text-gray-300 self-start">
                <TrashIcon
                  className="w-5 h-5 hover:text-red-500 cursor-pointer"
                  onClick={() => setOpenConfirmationModal(true)}
                />
                <PencilIcon
                  className="w-5 h-5 hover:text-dnr-blue cursor-pointer"
                  onClick={() => setOpenEditModal(true)}
                />
              </div>
            </div>
            <p>
              Nomor Rekening <span className="text-dnr-dark-green">: 123-123-123</span> a/n
              <span className="text-gray-900 font-semibold ml-1">Mr Lorem Ipsum</span>
            </p>
          </div>
        </div>
      </section>
      <section>
        <HorizontalDivider />
        <GrayBorderButton
          className="py-2 text-sm text-gray-700 flex space-x-2 items-center"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="w-4 h-4" />
          <span className="pt-1">Tambah Rekening</span>
        </GrayBorderButton>
      </section>
    </section>
  )
}
