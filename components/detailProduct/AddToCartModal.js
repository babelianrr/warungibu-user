/* This example requires Tailwind CSS v2.0+ */
import {useRouter} from 'next/router'
import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationIcon, XIcon, XCircleIcon} from '@heroicons/react/outline'
import {Modal, HorizontalDivider} from '@/components/base'
import Button from '../button/Button'
import currencyConverter from 'helpers/currencyConverter'

export default function AddToCartModal({open, setOpen, product}) {
  const router = useRouter()

  return (
    <Modal open={open} setOpen={setOpen} size="bigger">
      <div className="text-center sm:mt-0 sm:w-full">
        <Dialog.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Berhasil ditambahkan
        </Dialog.Title>
        <div className="mt-2 hidden sm:flex justify-between items-center bg-dnr-secondary-gray py-4 px-5 rounded-md">
          <div className="flex space-x-2 items-center">
            <div className="bg-white rounded-lg">
              <img
                src={product.images.length !== 0 ? product.images[0].url : '/assets/default.png'}
                alt="Product Image"
                className="h-20 p-1"
              />
            </div>
            <div>
              <p className="text-gray-900 leading-6 mx-2 text-left text-sm font-medium">{product.name}</p>
              <p className="text-gray-500 leading-6 mx-2 text-left text-sm">
                {currencyConverter(product.price)}/{product.unit}
              </p>
            </div>
          </div>

          <Button className="text-sm px-4 font-light" color="primary" type="border" onClick={() => router.push('/carts')} padding="p-2">
            Lihat Keranjang
          </Button>
        </div>
        <div className="mt-2 sm:hidden flex flex-col space-y-4 bg-gray-100 p-2 rounded-md">
          <div className="flex items-center">
            <img
              src={product.images.length !== 0 ? product.images[0].url : '/assets/default.png'}
              alt="Product Image"
              className="h-20"
            />
            <div>
              <p className="text-gray-900 leading-6 mx-2 text-left text-sm font-medium">{product.name}</p>
              <p className="text-gray-500 leading-6 mx-2 text-left text-sm">
                {currencyConverter(product.price)}/{product.unit}
              </p>
            </div>
          </div>

          <Button color="primary" type="border" onClick={() => router.push('/carts')} padding="p-2">
            Lihat Keranjang
          </Button>
        </div>
      </div>
    </Modal>
  )
}
