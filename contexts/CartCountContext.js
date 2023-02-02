import {createContext, useState} from 'react'
import {useMutation} from 'react-query'

export const CartCountContext = createContext()

export function CartCountProvider({children}) {
  const [value, setValue] = useState({
    count: 0,
  })

  const countValue = {value, setValue}

  return <CartCountContext.Provider value={countValue}>{children}</CartCountContext.Provider>
}
