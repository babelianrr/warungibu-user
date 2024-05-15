import {useState} from 'react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import MainLayout from '@/components/layouts/MainLayout'
import {LinkIcon, PencilIcon, TrashIcon} from '@heroicons/react/outline'

import {ImageModal} from '@/components/base'
import EditOutletLicenseModal from '@/components/profile/account/EditOutletLicenseModal'
import ConfirmDeleteLicenseModal from '@/components/profile/account/ConfirmDeleteLicenseModal'

import {fetchAuthGet} from 'helpers/fetch'

export default function OutletLicenseDetail() {
  // change with API base on params
  const router = useRouter()

  const {
    data: license,
    isLoading,
    refetch,
  } = useQuery(['outlet-detail', router.query.id], () => fetchAuthGet(`outlet_docs/${router.query.id}`), {
    enabled: Boolean(router.query.id),
  })

  const [open, setOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState({})

  return (
    <MainLayout backTo="/profile/mobile/outlet-license">
      <EditOutletLicenseModal
        open={open}
        setOpen={setOpen}
        license={selectedDocument}
        onSuccess={() => {
          setOpen(false)
          refetch()
        }}
      />
      <ConfirmDeleteLicenseModal
        open={deleteModal}
        setOpen={setDeleteModal}
        license={selectedDocument}
        onSuccess={() => {
          setDeleteModal(false)
          refetch()
        }}
      />
      <ImageModal open={showImage} setOpen={setShowImage} src={selectedDocument.path} alt={selectedDocument.name} />
      <main className="mx-auto py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl">
        <h4 className="text-sm text-gray-500">Detail Dokumen</h4>
        {isLoading ? (
          <p className="py-4 text-base">Sedang memproses data</p>
        ) : (
          <>
            <h4 className=" text-lg text-dnr-light-turqoise tracking-wide mb-4">{license?.name}</h4>
            <div className="bg-white">
              <ul className="divide-y divide-opacity-30 divide-dnr-dark-orange text-sm font-light text-gray-600 mb-6">
                <li className="flex justify-between py-4 px-4 text-gray-700 text-sm">
                  <p>Dokumen</p>
                  <p className="font-semibold ">{license?.name}</p>
                </li>
                <li className="flex justify-between py-4 px-4 text-gray-700 text-sm">
                  <p>Nomor</p>
                  <p className="font-semibold ">{license?.file_no}</p>
                </li>
                <li className="flex justify-between py-4 px-4 text-gray-700 text-sm">
                  <p>Tanggal Berlaku</p>
                  <p className="font-semibold ">{license?.expired_date}</p>
                </li>
                <li className="flex justify-between py-4 px-4 text-gray-700 text-sm">
                  <p>Lampiran</p>
                  <div
                    className="flex space-x-2 items-center text-dnr-dark-turqoise"
                    onClick={() => {
                      setShowImage(true)
                      setSelectedDocument(license)
                    }}
                  >
                    {license?.path ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_URL}${license?.path}`}
                        alt="License Image"
                        className="h-20 p-1"
                      />
                    ) : null}
                  </div>
                </li>
                <li className="flex justify-between py-4 px-4 text-gray-700 text-sm space-x-4">
                  <div
                    className="flex-1 p-2 rounded-md flex items-center justify-center border border-gray-500 space-x-2"
                    onClick={() => {
                      setOpen(true)
                      setSelectedDocument(license)
                    }}
                  >
                    <PencilIcon className="w-4 h-4" />
                    <p>Ubah</p>
                  </div>
                  <div
                    className="flex-1 p-2 rounded-md flex items-center justify-center border border-gray-500 space-x-2"
                    onClick={() => {
                      setDeleteModal(true)
                      setSelectedDocument(license)
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <p>Hapus</p>
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
      </main>
    </MainLayout>
  )
}
