import {useQuery} from 'react-query'
import {fetchAuthGet, fetchAuthPost} from 'helpers/fetch'

export default function useChargeCardPayment(orderId, token, discountAmount, promoCode, tokenValidationCheck, cardCvn) {
  return useQuery(['charge card', token], () => {
    if (!tokenValidationCheck ) {
      // Prevent fetch API call when token still undefined
      return Promise.resolve('')
    }

    // token.amount = token.amount - discountAmount;

    const req = {
      tokenID: token.id,
      authID: token.authentication_id,
      cardCvn: cardCvn,
      externalID: orderId,
      promoCode: promoCode,
      discount_amount: discountAmount
    }


    return fetchAuthPost(`orders/${orderId}/charge`, req)
  })
}
