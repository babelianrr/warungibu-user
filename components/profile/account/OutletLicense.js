import React from 'react'
import {useState} from 'react'
import {useQuery} from 'react-query'
import Link from 'next/link'
import {PencilIcon, LinkIcon, TrashIcon, ExclamationIcon, ChevronRightIcon} from '@heroicons/react/outline'
import {CheckCircleIcon} from '@heroicons/react/solid'

import {GrayBorderButton, Button} from '../../button'
import {HorizontalDivider, InfoModal, ImageModal} from '../../base'
import EditOutletLicenseModal from './EditOutletLicenseModal'
import ConfirmDeleteLicenseModal from './ConfirmDeleteLicenseModal'
import OutletLicenseRow from './OutletLicenseRow'

import {authenticatedUser} from 'helpers/isAuthenticated'
import {fetchAuthGet} from 'helpers/fetch'

const dummyLicense = [
  {
    id: 1,
    name: 'SIUP',
    path: null,
  },
  {
    id: 2,
    name: 'TDP',
    path: null,
  },
  {
    id: 3,
    name: 'KTP Pemilik',
    path: null,
  },
  {
    id: 4,
    name: 'KTP AJP',
    path: null,
  },
  {
    id: 5,
    name: 'Izin Sarana',
    path: null,
  },
  {
    id: 6,
    name: 'SIKA/SIPA',
    path: null,
  },
  {
    id: 7,
    name: 'SIKTTK',
    path: null,
  },
  {
    id: 8,
    name: 'Specimen TTD',
    path: null,
  },
  {
    id: 9,
    name: 'FPP/KYC',
    path: null,
  },
]

export default function OutletLicense({onClick}) {
  const userId = authenticatedUser().id

  const {data, isLoading, isError, refetch} = useQuery(['outlet', userId], () => fetchAuthGet(`outlets/${userId}`), {
    retry: false,
  })

  const hasEmptyFile = data?.outlet_docs.filter((doc) => !doc.file || doc.status !== 'APPROVED').length !== 0

  const [open, setOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState({})

  return (
    <section className="h-full flex flex-col">
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
      <InfoModal
        open={showValidation}
        setOpen={setShowValidation}
        title={'Permintaan Validasi Diterima'}
        message={'Terima kasih telah melakukan validasi. Admin kami akan memproses permintaan anda.'}
      />

      {authenticatedUser().role_status === 'AJP_USER' ? (
        <div className="rounded-md bg-green-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-normal text-green-800">
                Izin APJ Terverifikasi {hasEmptyFile ? 'Silahkan lengkapi data dokumen dibawah ini' : ''}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Lengkapi dokumen perijinan untuk dapat melakukan transaksi di DNR+
              </h3>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <p className="py-4 text-gray-500 text-center text-sm">Proses Pengambilan Data</p>
      ) : (
        <div className="flex-1 overflow-x-scroll">
          {/* <p className="text-dnr-dark-turqoise text-sm mb-4">Pharmacy (Apotik)</p> */}
          <div className="flex flex-col mb-4 border border-gray-200">
            <table>
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider ">Dokumen</th>
                  <th className="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider">Nomor</th>
                  <th className="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider">Tanggal Berlaku</th>
                  <th className="px-6 py-3 text-left text-xs font-normal uppercase tracking-wider">Lampiran</th>
                  <th className=" py-3 text-left text-xs font-normal uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {(isError ? dummyLicense : data.outlet_docs)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((license, index) => (
                    <OutletLicenseRow
                      key={license + index}
                      setOpen={setOpen}
                      license={license}
                      setSelectedDocument={setSelectedDocument}
                      setDeleteModal={setDeleteModal}
                      setShowImage={setShowImage}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <section>
        <HorizontalDivider />
        <div className="flex flex-row-reverse justify-between">
          <Button
            padding="px-4 py-2"
            className="text-sm flex items-center space-x-2"
            onClick={() => {
              if (onClick) {
                onClick()
              } else {
                setShowValidation(true)
              }
            }}
          >
            <span>Permintaan Validasi</span>
          </Button>
        </div>
      </section>
    </section>
  )
}
