import {LocationMarkerIcon, PencilIcon} from '@heroicons/react/outline'

export default function AddressBox({
  active = true,
  editable = false,
  className,
  onEdit = () => {},
  onClick = () => {},
  address,
  RightComponent,
  RightMobileComponent,
}) {
  const activeClass = 'border-gray-100 bg-gray-50 text-gray-700'
  const inactiveClass = 'border-gray-300 bg-white text-gray-700'

  return (
    <div
      className={`p-3 border rounded-md text-sm cursor-pointer ${active ? activeClass : inactiveClass} ${className}`}
      onClick={() => onClick(address)}
    >
      <div className="flex justify-between">
        <div className="space-x-2 flex w-full">
          <div>
            <LocationMarkerIcon className="w-5 h-5 mt-0.5 svg-width-custom" />
          </div>
          <div className="opacity-100 text-left">
            <div className="flex justify-between items-center mb-1">
              {/* <p className="text-base font-medium tracking-wide">{address.label}</p> */}
              <p className="text-base font-medium tracking-wide">Alamat Pengiriman</p>
            </div>
            <p className="leading-5 font-light">{address?.description}</p>
            {/* <p className="leading-5 font-light">{address.description}</p> */}
            {editable ? (
              <div
                className="text-gray-600 text-sm space-x-2 cursor-pointer hover:underline mt-2 hidden sm:flex"
                onClick={onEdit}
              >
                <PencilIcon className="w-3 h-3 mt-1" />
                <span>Ubah Alamat</span>
              </div>
            ) : null}
          </div>
        </div>
        {RightMobileComponent ? <RightMobileComponent /> : null}

        {RightComponent ? <RightComponent /> : null}
      </div>
    </div>
  )
}
