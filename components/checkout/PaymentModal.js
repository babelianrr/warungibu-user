import {useEffect, useContext} from 'react'

import {StepModal} from '@/components/base/'
import {AddressBox, NewAddress} from '@/components/address'
import {PaymentMethod, PaymentInfo, PaymentAccount} from './index'

export default function PaymentModal({
  open,
  setOpen,
  carts,
  mainAddress,
  PaymentInfoComponent = PaymentInfo,
  discount,
}) {
  const pages = {
    PaymentMethod: {
      id: 1,
      title: 'Pilih Metode Pembayaran',
      before: null,
      Component: PaymentMethod,
    },
    PaymentInfo: {
      id: 2,
      title: 'Pembayaran',
      before: 'PaymentMethod',
      Component: PaymentInfoComponent,
    },
    PaymentAccount: {
      id: 3,
      title: 'Pembayaran',
      before: 'PaymentInfo',
      Component: PaymentAccount,
    },
  }

  return (
    <StepModal
      open={open}
      setOpen={setOpen}
      pages={pages}
      carts={carts}
      initialPage="PaymentMethod"
      mainAddress={mainAddress}
      discountRef={discount}
    />
  )
}
