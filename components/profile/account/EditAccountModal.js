import {Modal, Input, SelectInput, HorizontalDivider} from '../../base'
import {Button} from '../../button'

export default function EditAccountModal({open, setOpen}) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Update Rekening
        </Modal.Title>
        <HorizontalDivider />
        <div className="mt-4 text-left">
          <form className="space-y-4">
            <div className="relative">
              <SelectInput
                data={[
                  {id: 1, value: 'BCA'},
                  {id: 2, value: 'Mandiri'},
                  {id: 3, value: 'BNI'},
                ]}
                placeholder="Pilih Bank"
                id="bank"
                label="Nama Bank*"
              />
            </div>
            <Input id="account-holder" label="Nama Pemilik Rekening*" />
            <Input id="account-number" label="Nomor Rekening*" type="number" />
            <Input id="accont-branch" label="Nama Cabang*" />
            <Button className="ml-auto px-8 bg-dnr-dark-green">Simpan</Button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
