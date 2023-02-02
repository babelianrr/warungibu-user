import {useState} from 'react'
import {useQuery} from 'react-query'
import {format, isBefore} from 'date-fns'
import {
  PencilIcon,
  LinkIcon,
  TrashIcon,
  ExclamationIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import {GrayBorderButton, Button} from '../../button'
import {HorizontalDivider, ConfirmationModal, Card, ImageModal, InfoModal} from '../../base'
import EditOutletLicenseModal from './EditOutletLicenseModal'
import ConfirmDeleteLicenseModal from './ConfirmDeleteLicenseModal'
import OutletLicenseRowMobile from './OutletLicenseRowMobile'

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

  const licenses = [
    {
      id: 1,
      name: 'SIUP',
      number: '02/DAS/389',
      expiredUntil: new Date(2021, 11, 10),
      attachment: 'images001.jpeg',
      uploaded: true,
    },
    {
      id: 2,
      name: 'TDP',
      number: '02/DAS/389',
      expiredUntil: new Date(2021, 10, 4),
      attachment: 'images001.jpeg',
      uploaded: true,
    },
    {
      id: 3,
      name: 'KTP Pemilik',
      number: '02/DAS/389',
      expiredUntil: new Date(2021, 3, 4),
      attachment: 'images001.jpeg',
      uploaded: true,
    },
    {
      id: 4,
      name: 'KTP AJP',
      number: '02/DAS/389',
      expiredUntil: new Date(2021, 3, 4),
      attachment: 'images001.jpeg',
      uploaded: true,
    },
    {
      id: 5,
      name: 'Izin Sarana',
      number: '02/DAS/389',
      expiredUntil: new Date(2021, 10, 4),
      attachment: 'images001.jpeg',
      uploaded: true,
    },
    {
      id: 6,
      name: 'SIKA/SIPA',
      number: '02/DAS/389',
      expiredUntil: new Date(2021, 10, 4),
      attachment: 'images001.jpeg',
      uploaded: false,
    },
    {
      id: 7,
      name: 'SIKTTK',
      number: '02/DAS/389',
      expiredUntil: new Date(2021, 10, 4),
      attachment: 'images001.jpeg',
      uploaded: false,
    },
    {
      id: 8,
      name: 'Specimen TTD',
      number: '02/DAS/389',
      expiredUntil: new Date(2022, 1, 4),
      attachment: 'images001.jpeg',
      uploaded: false,
    },
    {
      id: 9,
      name: 'FPP/KYC',
      number: '02/DAS/389',
      expiredUntil: new Date(2021, 10, 4),
      attachment: 'images001.jpeg',
      uploaded: false,
    },
  ]

  function isExpired(date) {
    return isBefore(date, new Date())
  }
  const [open, setOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState({})

  function StatusRoleUser() {
    if (authenticatedUser().role_status === 'AJP_USER') {
      return (
        <div className="rounded-md bg-green-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Izin APJ Terverifikasi</h3>
            </div>
          </div>
        </div>
      )
    }

    return (
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
    )
  }

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

      <StatusRoleUser />
      {/* {authenticatedUser().role_status === 'AJP_USER' ? (
        <div className="rounded-md bg-green-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Izin APJ Terverifikasi</h3>
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
      )} */}

      <div className="flex-1 space-y-4 h-80 mb-4 overflow-x-scroll">
        {isLoading ? (
          <p className="py-4 text-gray-700 text-center text-lg">Proses Pengambilan Data</p>
        ) : (
          <div className="flex-1 overflow-x-scroll">
            <div className="flex flex-col mb-4 sm:rounded-lg border border-gray-200">
              {(isError ? dummyLicense : data.outlet_docs)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((license, index) => (
                  <OutletLicenseRowMobile
                    key={license + index}
                    setOpen={setOpen}
                    license={license}
                    setSelectedDocument={setSelectedDocument}
                    setDeleteModal={setDeleteModal}
                    setShowImage={setShowImage}
                  />
                ))}
            </div>
          </div>
        )}
        {/* {licenses.map((license) => (
          <Card className="flex justify-between items-center" padding="px-4 py-2" key={license.id}>
            {isExpired(license.expiredUntil) ? (
              <div className="flex items-center space-x-2 text-red-500">
                <ExclamationIcon className="w-5 h-5 " />
                <div>
                  <p className="text-xs text-gray-500">Dokumen</p>
                  <h4 className="text-base font-semibold">{license.name}</h4>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-gray-500">Dokumen</p>
                <h4 className="text-base font-semibold text-gray-900">{license.name}</h4>
              </div>
            )}
            <div className="flex text-gray-500 space-x-4 cursor-pointer">
              <PencilIcon className="w-5 h-5 hover:text-dnr-blue" onClick={() => setOpen(true)} />
              <TrashIcon className="w-5 h-5 hover:text-red-500" onClick={() => setDeleteModal(true)} />
              <NavLink href="/profile/mobile/outlet-license/1">
                <ChevronRightIcon className="w-5 h-5 hover:text-red-500" />
              </NavLink>
            </div>
          </Card>
        ))} */}
      </div>
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
