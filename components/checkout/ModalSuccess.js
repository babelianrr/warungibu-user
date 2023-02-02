import {Dialog} from '@headlessui/react'
import {useRouter} from 'next/router'
import {Modal, HorizontalDivider} from '@/components/base'
import {Button} from '../button'

export default function ModalSuccess({open, setOpen}) {
  const router = useRouter()
  return (
    <Modal open={open} setOpen={setOpen} size="bigger" closable={false}>
      <div className="text-center sm:mt-0 sm:w-full">
        <Dialog.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Konfirmasi Berhasil!
        </Dialog.Title>
        <HorizontalDivider />
        <div className="mt-2 flex flex-col items-center space-y-4">
          <p className="text-gray-900 leading-6 mx-2 text-sm ">
            Konfirmasi berhasil, kode akan kami berikan. silahkan lanjutkan proses berikutnya
          </p>
          <Button className="mx-auto" onClick={() => router.push('/profile/transaksi')}>
            Menuju Halaman Order
          </Button>
        </div>
      </div>
    </Modal>
  )
}
