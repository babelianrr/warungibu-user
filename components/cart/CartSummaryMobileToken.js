import {useState} from 'react'
import {useRouter} from 'next/router'
import Button from '../button/Button'
import currencyConverter from 'helpers/currencyConverter'

export default function CartSummaryMobileToken({data , buy}) {
  const router = useRouter()

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 ">
      <div className=" w-full px-4 py-2 border-2 shadow-lg border-white bg-white rounded-lg flex justify-between">
        <div className="font-extralight text-sm flex-1 flex flex-col space-y-1">
          <p className="text-xs">{`Total Harga Barang)`}</p>
          {/* <p className="text-dnr-dark-orange text-base font-bold">{currencyConverter(calcTotalPrice())}</p> */}
        </div>
        <Button
          className="flex-1"
          // type={selectedItem.length === 0 ? 'disabled' : ''}
          // onClick={() => buy()}
        >{`Beli`}</Button>
      </div>
    </div>
  )
}
