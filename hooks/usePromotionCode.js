import {useQuery} from 'react-query'
import {fetchAuthGet} from 'helpers/fetch'

export default function usePromotionCode(token, orderId) {
  return useQuery(['check-promotion-code', token], () => {
    if (!token) {
      // Prevent fetch API call when token still undefined
      return Promise.resolve('')
    }
    if(token.card_info.bank === undefined){
      return Promise.resolve('')
    }
    return fetchAuthGet(`promotions/code?bank=${token.card_info.bank}&order_id=${orderId}`)
  })
}
