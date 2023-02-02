import {Fragment, useState} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {ChatIcon, RefreshIcon, HomeIcon, UserIcon, ShoppingCartIcon} from '@heroicons/react/outline'
import {Input} from '@/components/base'
import {Button} from '@/components/button'
import {AddToCartModal} from '@/components/detailProduct'

export default function AddToCart({product, isLoading, handleAddToCart}) {
  const [open, setOpen] = useState(false)

  function handleClickAddCart() {
    setOpen(true)
    handleAddToCart()
  }

  return (
    <div className="fixed inset-x-0 bottom-0">
      <AddToCartModal open={open} setOpen={setOpen} product={product} />
      <div className="bg-white w-full px-6 py-2 border-2 shadow-lg border-white rounded-lg flex space-x-4 cursor-pointer">
        {/* <div className="space-y-1  flex flex-col justify-center items-center text-dnr-primary border border-wi-blue px-2 py-1 rounded-md">
          <ChatIcon className="w-5 h-5" />
          <p className="text-sm leading-4 font-light tracking-wide">Chat</p>
        </div> */}
        <Button
          className="flex-1 w-full"
          color="primary"
          type={isLoading ? 'processing' : 'border'}
          onClick={handleClickAddCart}
        >
          <div className="flex items-center">
            <ShoppingCartIcon className="w-6 h-6 mr-3 inline" />
            Masukkan Keranjang
          </div>
        </Button>
      </div>
    </div>
  )
}
