import React, {useState} from 'react'
import Selectoption from '@/components/base/SelectOption'
import {classNames} from 'helpers/classNames'
import {ChevronDownIcon} from '@heroicons/react/outline'

export default function WarehouseOption({location}) {
  const [warehouse, setWarehouse] = useState([
    {id: 1, value: 'DKI Jakarta'},
    {id: 2, value: 'Bandung'},
    {id: 3, value: 'Surabaya'},
  ])

  return (
    <p className="text-sm font-light space-x-2">
      <span>Dikirim Dari</span>
      <span className="text-sm font-semibold text-gray-900">{location}</span>
    </p>
  )

  return (
    <Selectoption
      data={warehouse}
      selectedElement={(selected) => (
        <>
          <Selectoption.Label className="text-sm font-light">Dikirim Dari</Selectoption.Label>
          <div className="relative">
            <Selectoption.Button className="flex items-center space-x-1 cursor-pointer">
              <p className="text-sm font-base text-dnr-dark-green">{selected.value}</p>
              {/* <ChevronDownIcon className="w-5 h-5 text-dnr-green" /> */}
            </Selectoption.Button>
          </div>
        </>
      )}
    >
      <Selectoption.Options
        static
        className="absolute z-10 mt-6 -left-3 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        {warehouse.map((location) => (
          <Selectoption.Option
            key={location.id}
            className={({active}) =>
              classNames(
                active ? 'text-white bg-dnr-blue' : 'text-gray-900',
                'cursor-pointer select-none relative py-2 pl-3 pr-9'
              )
            }
            value={location}
          >
            {({selected, active}) => (
              <>
                <span
                  className={classNames(
                    selected ? 'font-semibold text-dnr-dark-orange' : 'font-normal',
                    active ? 'text-white' : null,
                    'block truncate'
                  )}
                >
                  {location.value}
                </span>
              </>
            )}
          </Selectoption.Option>
        ))}
      </Selectoption.Options>
    </Selectoption>
  )
}
