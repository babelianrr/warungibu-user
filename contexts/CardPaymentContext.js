import {createContext, useState} from 'react'

export const CardPaymentContext = createContext()

export function CardPaymentProvider({children}) {
  const [value, setValue] = useState({
    amount : 0,
    cardNumber: '',
    cardExpired: '',
    cardExpYear: '',
    cardCvn: '',
    isMultipleUse: false,
    isSkip3DS: false
  })

  const cardPaymentValue = {value, setValue}

  return <CardPaymentContext.Provider value={cardPaymentValue}>{children}</CardPaymentContext.Provider>
}
