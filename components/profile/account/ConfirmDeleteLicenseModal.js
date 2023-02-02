import {useMutation} from 'react-query'

import {ConfirmationModal} from '@/components/base'
import {fetchAuthPost} from 'helpers/fetch'

export default function ConfirmDeleteLicenseModal({open, setOpen, onSuccess, license}) {
  const {mutate, isLoading} = useMutation(
    'delete-outlet-address',
    (payload) => fetchAuthPost(`outlet_docs/${license.id}`, payload, 'PATCH'),
    {
      onSuccess,
    }
  )

  return (
    <ConfirmationModal
      open={open}
      setOpen={setOpen}
      title="Menghapus Dokumen"
      message="Apakah anda yakin untuk menghapus dokumen ini"
      confirmLabel="Hapus Dokumen"
      processing={isLoading}
      onConfirm={() => {
        mutate({
          name: license.name,
          expired_date: '',
          file_no: '',
          path: null,
        })
      }}
    />
  )
}
