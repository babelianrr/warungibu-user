/* This example requires Tailwind CSS v2.0+ */
import {useRouter} from 'next/router'
import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationIcon, XIcon, XCircleIcon} from '@heroicons/react/outline'
import {Modal, HorizontalDivider} from '@/components/base'
import Button from '../button/Button'

export default function NeedLoginModal({open, setOpen}) {
  const router = useRouter()

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="text-center sm:mt-0 sm:w-full">
        <Dialog.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Add to Cart Gagal
        </Dialog.Title>
        <HorizontalDivider />
        <div className="mt-2 flex flex-col items-center space-y-4">
          <p className="text-gray-900 leading-6 mx-2 text-sm ">
            Silahkan login terlebih dahulu untuk menambahkan barang ke cart
          </p>

          <Button className="w-full" onClick={() => router.push('/login')}>
            Login
          </Button>
        </div>
      </div>
    </Modal>
  )
}
