import React from 'react'
import {EmojiSadIcon, ShoppingBagIcon} from '@heroicons/react/outline'

export default function CartEmpty() {
  return (
    <div className="flex w-full flex-col flex-1 bg-white rounded-md shadow p-8 items-center">
      <ShoppingBagIcon className="w-14 h-14 svg-width-custom mt-3" />
      <p className="pb-5 pt-2 text-base font-light">Keranjang belanjaan anda kosong</p>
    </div>
  )
}
