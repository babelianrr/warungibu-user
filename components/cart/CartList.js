import React from 'react'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import { Card } from '@/components/base'

export default function CartList({ cartList, setIdDelete, handleChangeQty, handleChangeCheckbox, setOpen }) {
  const stock = handleStock()

  function handleStock() {
    const arrStock = []
    cartList.map((val) => {
      arrStock.push(val.product.stock)
    })
    if (arrStock.includes(0)) {
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <div className="flex-1 space-y-2 w-full">
        <Card padding="px-4 py-3">
          <h3 className="text-base leading-7 font-medium">Keranjang Belanja</h3>
        </Card>
        <div className="bg-white rounded-md shadow p-4 w-full">
          {cartList.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              setIdDelete={setIdDelete}
              handleChangeQty={handleChangeQty}
              handleChangeCheckbox={handleChangeCheckbox}
              setOpen={setOpen}
              stockAvailable={item.product.stock}
            />
          ))}
        </div>
      </div>
      <CartSummary cartList={cartList} stockAvailable={stock} />
    </>
  )
}
