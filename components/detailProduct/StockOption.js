import React, {useState} from 'react'
import Selectoption from '@/components/base/SelectOption'
import {classNames} from 'helpers/classNames'
import {ChevronDownIcon} from '@heroicons/react/outline'
import {SelectorIcon} from '@heroicons/react/solid'

export default function StockOption({onChange, location}) {
  // const [stockLocation, setStockLocation] = useState([
  //   {id: 1, value: 'DKI Jakarta', stock: 100},
  //   {id: 2, value: 'Bandung', stock: 500},
  //   {id: 3, value: 'Surabaya', stock: 100},
  //   {id: 4, value: 'Malang', stock: 100},
  //   {id: 5, value: 'Semarang', stock: 100},
  //   {id: 6, value: 'Papua', stock: 0},
  //   {id: 7, value: 'Makasar', stock: 100},
  //   {id: 8, value: 'Pontianak', stock: 0},
  //   {id: 9, value: 'Medan', stock: 100},
  //   {id: 10, value: 'Palembang', stock: 100},
  //   {id: 11, value: 'Aceh', stock: 0},
  //   {id: 12, value: 'Lampung', stock: 100},
  // ])

  if (!location) {
    return <h1>Dummy error page</h1>
  }

  const jakarta = location.find((location) => location.location === 'Cakung')

  if (jakarta) {
    onChange(jakarta)
  }

  return (
    <Selectoption
      data={location}
      defaultValue={jakarta}
      onChange={onChange}
      selectedElement={(selected) => (
        <>
          <div className="relative">
            <Selectoption.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm">
              <span className={`${selected ? 'text-gray-900' : 'text-gray-500'} text-sm `}>
                <span>Stok: </span>
                {selected?.location ?? 'Pilih Region Terdekat'}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Selectoption.Button>
          </div>
        </>
      )}
    >
      <Selectoption.Options
        static
        className="absolute z-10 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        {location.map((location) => (
          <Selectoption.Option
            key={location.location}
            disabled={location.stock === 0 || location.location !== 'Cakung'}
            className={({active}) =>
              classNames(
                active ? 'text-white bg-dnr-dark-orange' : 'text-gray-900',
                'cursor-default select-none relative py-2 px-4'
              )
            }
            value={location}
          >
            {({selected, disabled}) => (
              <div className="flex justify-between">
                <span
                  className={classNames(
                    selected ? 'font-semibold' : 'font-normal',
                    'block truncate',
                    disabled ? 'text-gray-300' : null
                  )}
                >
                  {location.location}
                </span>
                <span
                  className={classNames(
                    selected ? 'font-semibold' : 'font-normal',
                    'block truncate',
                    disabled ? 'text-gray-300' : null
                  )}
                >
                  Stock: {location.stock}
                </span>
              </div>
            )}
          </Selectoption.Option>
        ))}
      </Selectoption.Options>
    </Selectoption>
  )
}
