import {createContext, useContext, useState} from 'react'
import {Dialog} from '@headlessui/react'
import {StepModal, HorizontalDivider} from '@/components/base/'
import {AddressBox, NewAddress} from '@/components/address'

export default function AddressListModal({open, setOpen, address, setActiveAddress}) {
  const AddressContext = createContext()

  const pages = {
    ListAddress: {
      id: 1,
      title: 'Daftar Alamat',
      before: null,
      Component({goTo}) {
        const addressList = useContext(AddressContext)

        return (
          <div className="mt-2 text-left">
            <div
              className="px-2 py-2 text-gray-600 text-center border-2  border-dashed border-gray-300 mb-2 rounded-md text-sm cursor-pointer"
              onClick={() => goTo('AddAddress')}
            >
              Tambah Alamat
            </div>
            <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
              {addressList.map((address) => (
                <AddressBox
                  editable
                  onEdit={() => goTo('EditAddress')}
                  active={address.active}
                  onClick={setActiveAddress}
                  address={address}
                  key={address.id}
                />
              ))}
            </div>
          </div>
        )
      },
    },
    AddAddress: {
      id: 2,
      title: 'Tambah Alamat Baru',
      before: 'ListAddress',
      Component() {
        return (
          <div className="mt-2 text-left">
            <NewAddress />
          </div>
        )
      },
    },
    EditAddress: {
      id: 3,
      title: 'Update alamat',
      before: 'ListAddress',
      Component() {
        return (
          <div className="mt-2 text-left">
            <NewAddress />
          </div>
        )
      },
    },
  }

  return (
    <AddressContext.Provider value={address}>
      <StepModal open={open} setOpen={setOpen} overflowHidden={false} pages={pages} initialPage="ListAddress" />
    </AddressContext.Provider>
    // <Modal open={open} setOpen={setOpen} overflowHidden={false}>
    //   <div className="text-center sm:mt-0 sm:w-full">
    //     <Dialog.Title as="h3" className="text-xl leading-6 tracking-wide font-medium text-gray-900 text-left mb-4">
    //       Daftar Alamat
    //     </Dialog.Title>
    //     <HorizontalDivider />
    //     <div className="mt-2 text-left">
    //       <NewAddress />
    //       {/* <div className="px-2 py-2 text-gray-600 text-center border-2  border-dashed border-gray-300 mb-2 rounded-md text-sm">
    //         Tambah Alamat
    //       </div>

    //       <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
    //         <AddressBox editable />
    //         <AddressBox active={false} editable />
    //         <AddressBox active={false} editable />
    //       </div> */}
    //     </div>
    //   </div>
    // </Modal>
  )
}
