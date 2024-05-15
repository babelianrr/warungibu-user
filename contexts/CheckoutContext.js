import {createContext, useState} from 'react'
import {useMutation} from 'react-query'

export const CheckoutContext = createContext()

export function CheckoutProvider({children}) {
  const initialState = {
    totalPrice: 0,
    discount: 0,
    tax: 0,
    shipementFee: 0,
    totalProduct: 0,
    totalPurchase: 0,
    accountNumber: '',
    accountName: '',
    carts: [],
    paymentMethod: '',
    paymentChannel: '',
  }
  const [value, setValue] = useState(initialState)

  const checkoutValue = {value, setValue}

  return <CheckoutContext.Provider value={checkoutValue}>{children}</CheckoutContext.Provider>
}
