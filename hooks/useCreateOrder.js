import {useMutation} from 'react-query'
import {fetchAuthPost} from 'helpers/fetch'

export default function useCreateOrder(onSuccess, onError = () => {}) {
  const result = useMutation('create/order', (payload) => fetchAuthPost('orders', payload), {
    onSuccess,
    onError,
  })

  return result
}
