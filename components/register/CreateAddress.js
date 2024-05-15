import {NewAddress} from '@/components/address'
import {useMutation} from 'react-query'

import {fetchAuthPost} from 'helpers/fetch'

export default function CreateAddress({goToNext, goToPrev, toFinish}) {
  const {mutate: registerSap} = useMutation('register-sap', () => fetchAuthPost(`users/register_sap`))
  const {mutate} = useMutation('set-main-address', (id) => fetchAuthPost(`outlet_addresses/${id}/set_main`), {
    onSuccess: toFinish,
  })
  return (
    <NewAddress
      onSuccess={(response) => {
        mutate(response.id)
        registerSap()
      }}
    />
  )
}
