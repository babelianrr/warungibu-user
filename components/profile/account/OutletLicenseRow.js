import {PencilIcon, LinkIcon, TrashIcon, ExclamationIcon, ChevronRightIcon} from '@heroicons/react/outline'
import {format, isBefore} from 'date-fns'

export default function OutletLicenseRow({license, setSelectedDocument, setOpen, setDeleteModal, setShowImage}) {
  function isExpired(date) {
    if (!date) {
      return false
    }
    return isBefore(new Date(date), new Date())
  }

  function safeFormat(date) {
    if (!date) {
      return ''
    }
    return format(new Date(date), 'dd/MM/yyyy')
  }
  return (
    <>
      {license.path ? (
        <tr
          className={`odd:bg-gray-50 even:bg-white ${
            isExpired(license.expired_date) ? 'text-red-500' : 'text-gray-900'
          }`}
          key={license.id}
        >
          <td className="px-6 py-4 font-medium">{license.name}</td>
          <td className="px-6 py-4">{license.file_no}</td>
          <td className="px-6 py-4">
            {isExpired(license.expired_date) ? (
              <div className="flex items-center space-x-2 text-red-500">
                <ExclamationIcon className="w-4 h-4 " />
                <span>Expired</span>
              </div>
            ) : (
              safeFormat(license.expired_date, 'dd/MM/yyyy')
            )}
          </td>
          <td
            className={`flex space-x-2 ${
              isExpired(license.expired_date) ? 'text-gray-400' : 'text-dnr-turqoise'
            } items-center px-6 py-4 `}
          >
            <div
              className="bg-white rounded-lg border-2 cursor-pointer"
              onClick={() => {
                setShowImage(true)
                setSelectedDocument(license)
              }}
            >
              <img src={`${process.env.NEXT_PUBLIC_URL}${license.path}`} alt="License Image" className="h-20 p-1" />
            </div>
            {/* <LinkIcon className="w-4 h-4" />
            <span className={`underline`}>{license.path}</span> */}
          </td>
          <td className=" py-4">
            <div className="flex text-gray-300 space-x-4 cursor-pointer">
              <PencilIcon
                className="w-4 h-4 hover:text-dnr-blue"
                onClick={() => {
                  setOpen(true)
                  setSelectedDocument(license)
                }}
              />
              <TrashIcon
                className="w-4 h-4 hover:text-red-500"
                onClick={() => {
                  setDeleteModal(true)
                  setSelectedDocument(license)
                }}
              />
            </div>
          </td>
        </tr>
      ) : (
        <tr
          className={`odd:bg-gray-50 even:bg-white ${
            isExpired(license.expired_date) ? 'text-red-500' : 'text-gray-900'
          }`}
          key={license.id}
        >
          <td className="px-6 py-4 font-medium">{license.name}</td>
          <td className="px-6 py-4 font-medium">-</td>
          <td className="px-6 py-4 font-medium">-</td>
          <td className="px-6 py-4 font-medium">-</td>
          <td
            className="flex text-gray-300 space-x-2 group items-center py-4 cursor-pointer"
            onClick={() => {
              setOpen(true)
              setSelectedDocument(license)
            }}
          >
            <span className="group-hover:text-gray-900">Lengkapi Dokumen</span>
            <ChevronRightIcon className="w-4 h-4 group-hover:text-gray-900" />
          </td>
        </tr>
      )}
    </>
  )
}
