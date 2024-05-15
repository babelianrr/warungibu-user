import {useState} from 'react'
import {useMutation} from 'react-query'
import {useRouter} from 'next/router'

import {Input} from '@/components/base'
import {Button} from '@/components/button'

import {fetchAuthPost} from 'helpers/fetch'

export default function CustomerId({goToNext, onSuccess}) {
  const [error, setError] = useState('')
  const router = useRouter()

  const {isLoading, mutate} = useMutation(
    'get-customerid',
    (customerId) => fetchAuthPost('users/get_customer_detail', {customer_id: customerId.padStart(10, '0')}),
    {
      onSuccess(response) {
        const user = JSON.parse(localStorage.user)
        user.customer_id = customerId.padStart(10, '0')
        user.role_status = response.role_status
        localStorage.user = JSON.stringify(user, null, 2)

        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/')
        }
      },
      onError(error) {
        setError(error.message)
      },
    }
  )
  const [customerId, setCustomerId] = useState('')

  return (
    <div className="space-y-4">
      <p className="text-gray-500 text-sm leading-6">
        Masukan Customer ID anda, untuk mendapatkan kode unik verifikasi data anda yang akan kami kirim via email anda.
      </p>
      {error ? <p className="text-red-500 text-sm leading-6">{error}</p> : null}
      <Input
        withLabel={false}
        id="customer-id"
        placeholder="Masukkan Kode Customer Id anda"
        className="p-3"
        value={customerId}
        onChange={setCustomerId}
      />

      <Button
        className="ml-auto"
        type={isLoading ? Button.PROCESSING : ''}
        color="orange"
        padding="py-2 px-8"
        onClick={() => mutate(customerId)}
      >
        Submit
      </Button>
    </div>
  )
}
