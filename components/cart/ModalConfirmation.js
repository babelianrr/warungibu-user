import React from 'react'
import {Dialog} from '@headlessui/react'
import {Modal, HorizontalDivider} from '@/components/base'
import Button from '../button/Button'

export default function ModalConfirmation({open, setOpen, onChange}) {
  const handleClickConfirmation = () => {
    setOpen(false)
    onChange()
  }
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="text-center sm:mt-0 sm:w-full">
        <Dialog.Title as="h3" className="text-xl leading-6 tracking-wide font-medium text-gray-900 text-center mb-4">
          Apakah yakin menghapus barang ini?
        </Dialog.Title>
        <HorizontalDivider />
        <div className="mt-2 flex items-center justify-around">
          <Button className="bg-dnr-dark-green w-1/3" onClick={() => setOpen(false)}>
            Tidak
          </Button>
          <Button className="bg-dnr-dark-orange w-1/3" onClick={handleClickConfirmation}>
            Iya
          </Button>
        </div>
      </div>
    </Modal>
  )
}
