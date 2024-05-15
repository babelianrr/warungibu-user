import {Card} from '../../base'
import NavLink from '@/components/base/NavLink'
import {PencilIcon, LinkIcon, TrashIcon, ExclamationIcon, ChevronRightIcon} from '@heroicons/react/outline'
import {isBefore} from 'date-fns'

export default function OutletLicenseRowMobile({license, setSelectedDocument, setOpen, setDeleteModal, setShowImage}) {
  function isExpired(date) {
    if (!date) {
      return false
    }
    return isBefore(new Date(date), new Date())
  }

  return (
    <>
      <Card className="flex justify-between items-center" padding="px-4 py-2" key={license.id}>
        {!license.path ? (
          <>
            {/* when license null */}
            <div>
              <p className="text-xs">Dokumen</p>
              <h4 className="text-base text-gray-500 font-semibold">{license.name}</h4>
            </div>
            <div className="flex text-gray-500 space-x-4 cursor-pointer">
              <div
                className="flex text-gray-300 text-sm space-x-2 group items-center py-4 cursor-pointer"
                onClick={() => {
                  setOpen(true)
                  setSelectedDocument(license)
                }}
              >
                <span className="group-hover:text-gray-900">Lengkapi Dokumen</span>
                <ChevronRightIcon className="w-4 h-4 group-hover:text-gray-900" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* when license not null */}
            {/* when expired */}
            {isExpired(license.expired_date) ? (
              <div className="flex items-center space-x-2 text-red-500">
                <ExclamationIcon className="w-5 h-5 " />
                <div>
                  <p className="text-xs text-gray-500">Dokumen</p>
                  <h4 className="text-base font-semibold">{license.name || '-'}</h4>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-gray-500">Dokumen</p>
                <h4 className="text-base font-semibold text-gray-900">{license.name || '-'}</h4>
              </div>
            )}

            <div className="flex text-gray-500 space-x-4 cursor-pointer">
              <PencilIcon
                className="w-5 h-5 hover:text-dnr-blue"
                onClick={() => {
                  setOpen(true)
                  setSelectedDocument(license)
                }}
              />
              <TrashIcon
                className="w-5 h-5 hover:text-red-500"
                onClick={() => {
                  setDeleteModal(true)
                  setSelectedDocument(license)
                }}
              />
              {/* link to ? */}
              <NavLink href={`/profile/mobile/outlet-license/${license.id}`}>
                <ChevronRightIcon className="w-5 h-5 hover:text-red-500" />
              </NavLink>
            </div>
          </>
        )}
      </Card>
    </>
  )
}
