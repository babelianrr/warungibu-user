import React, {useState} from 'react'
import Selectoption from '@/components/base/SelectOption'
import {classNames} from 'helpers/classNames'
import {ChevronDownIcon} from '@heroicons/react/outline'

export default function DeliveryOption() {
  const [deliveryOptions, setDeliveryOptions] = useState([
    {id: 1, price: 10000, estimation: '1-2 Hari', type: 'Reguler'},
    {id: 2, price: 20000, estimation: '1-2 Hari', type: 'Express'},
    {id: 3, price: 30000, estimation: '2-5 Hari', type: 'Kargo'},
  ])

  return (
    <p className="text-sm text-gray-700 font-base">
      <span className="font-semibold">Rp 9.000</span> (Estimasi 2-3 Hari)
    </p>
  )

  return (
    <Selectoption
      data={deliveryOptions}
      selectedElement={(selected) => (
        <>
          <Selectoption.Label className="flex items-center space-x-1 cursor-pointer">
            <p className="text-sm text-dnr-blue font-base">
              Rp. {selected.price.toLocaleString()}
              <span className="font-light text-gray-500 ml-0.5">(Estimasi {selected.estimation}) </span>
            </p>
          </Selectoption.Label>
          <div className="relative mr-2">
            <Selectoption.Button className="flex items-center space-x-1 cursor-pointer">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-base text-dnr-dark-green">Pilihan Kurir Lain</p>
                {/* <ChevronDownIcon className="w-5 h-5 text-dnr-green" /> */}
              </div>
            </Selectoption.Button>
          </div>
        </>
      )}
    >
      <Selectoption.Options
        static
        className="absolute z-10 top-6 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        {deliveryOptions.map((option) => (
          <Selectoption.Option
            key={option.id}
            className={({active}) =>
              classNames(
                active ? 'text-white bg-dnr-dark-orange' : 'text-gray-900',
                'cursor-pointer select-none relative py-2 px-4'
              )
            }
            value={option}
          >
            {({selected, active}) => (
              <div className="flex justify-between text-sm">
                <div>
                  <p className="tracking-wide">{option.type}</p>
                  <p className={`text-xs font-light ${active ? 'text-white' : 'text-gray-500'}`}>{option.estimation}</p>
                </div>
                <div>
                  <h5>
                    Rp. {option.price.toLocaleString()}
                    <sub className={`text-xs font-light ${active ? 'text-white' : 'text-gray-500'}`}>/kg</sub>
                  </h5>
                </div>
              </div>
            )}
          </Selectoption.Option>
        ))}
      </Selectoption.Options>
    </Selectoption>
  )
}
