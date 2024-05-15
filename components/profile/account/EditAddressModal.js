import {EditAdress} from '../../address'
import {Modal, HorizontalDivider} from '../../base'

export default function EditAddressModal({open, setOpen, address, onSuccess}) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Ubah Alamat
        </Modal.Title>
        <HorizontalDivider />
        <div className="mt-4 text-left">
          {address ? <EditAdress defaultAddress={address} onSuccess={onSuccess} /> : null}
        </div>
      </div>
    </Modal>
  )
}
