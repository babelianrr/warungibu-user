import {useMutation} from 'react-query'

import {Modal, TextArea, HorizontalDivider} from '@/components/base'
import {StarIcon} from '@heroicons/react/solid'
import {Button} from '../../button'

import {fetchAuthPost} from 'helpers/fetch'

export default function ConfirmDeliveryModal({open, setOpen, onConfirm, orderId}) {
  const {mutate, isLoading} = useMutation('confirm-delivery', () => fetchAuthPost(`orders/${orderId}/complete`), {
    onSuccess() {
      onConfirm()
    },
  })
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      Button={() => (
        <Button onClick={mutate} className="w-full" type={isLoading ? Button.PROCESSING : ''}>
          Saya Telah Menerima Barang Dengan Baik
        </Button>
      )}
    >
      <div className="text-center sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Konfirmasi Barang Diterima
        </Modal.Title>
        <HorizontalDivider className="mb-4" />
        <div className="mt-2 text-gray-700 tracking-wide text-sm">
          Apakah anda yakin untuk konfirmasi barang telah sampai.
        </div>
      </div>
    </Modal>
  )
}
