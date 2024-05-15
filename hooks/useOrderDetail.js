import {useQuery} from 'react-query'
import {fetchAuthGet} from 'helpers/fetch'

export default function useOrderDetail(orderId, state = '--') {
  return useQuery(['order-detail', orderId, state], () => {
    if (!orderId) {
      // Prevent fetch API call when orderId still undefined
      return Promise.resolve('')
    }
    return fetchAuthGet(`orders/${orderId}`)
  })
}
