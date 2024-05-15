import {NewAddress} from '../../address'
import {Modal, HorizontalDivider} from '../../base'
import {CustomerId} from '@/components/register'

export default function AddCustomerIdModal({open, setOpen, onSuccess}) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Masukkan Customer Id
        </Modal.Title>
        <HorizontalDivider />
        <div className="mt-4 text-left">
          <CustomerId onSuccess={onSuccess} />
        </div>
      </div>
    </Modal>
  )
}
