import {useState, useContext} from 'react'
import currencyConverter from 'helpers/currencyConverter'
import {CheckoutContext} from 'contexts/CheckoutContext'
import {Button} from '@/components/button'
import PaymentTypeModal from './PaymentTypeModal'

export default function CheckoutSummaryMobile({DISCOUNT_VALUE, error, carts, mainAddress, setPaymentModal}) {
  const {value} = useContext(CheckoutContext)

  const [open, setOpen] = useState(false)
  return (
    <div className="fixed inset-x-0 bottom-0">
      <PaymentTypeModal
        open={open}
        setOpen={setOpen}
        DISCOUNT_VALUE={DISCOUNT_VALUE}
        error={error}
        carts={carts}
        mainAddress={mainAddress}
        setPaymentModal={setPaymentModal}
      />
      <div className=" w-full px-4 py-2 border-2 shadow-lg border-white bg-white rounded-lg flex justify-between items-center">
        <div className="font-extralight text-sm flex-1 flex flex-col space-y-1">
          <p className="text-xs">Total Tagihan</p>
          <p className="text-dnr-dark-orange text-base font-bold">{currencyConverter(value.totalPurchase)}</p>
        </div>

        <Button className="flex-1" color="primary" onClick={() => setOpen(true)}>
          Bayar
        </Button>
      </div>
    </div>
  )
}
