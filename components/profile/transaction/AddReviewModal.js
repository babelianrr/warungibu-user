import {useState} from 'react'
import {useMutation} from 'react-query'
import {Modal, TextArea, HorizontalDivider} from '@/components/base'
import {StarIcon} from '@heroicons/react/solid'
import {Button} from '../../button'
import {fetchAuthPost} from 'helpers/fetch'

export default function AddReviewModal({open, setOpen, onSuccess, carts, orderId}) {
  const [star, setStar] = useState(0)
  const [notes, setNotes] = useState('')

  const {mutate, isLoading} = useMutation('add-review', (payload) => fetchAuthPost('product_reviews', payload), {
    onSuccess,
  })

  function sendReview() {
    carts.forEach((cart) => {
      mutate({
        product_id: cart.product.id,
        order_id: orderId,
        notes,
        rating: star,
      })
    })
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      Button={() => (
        <Button onClick={sendReview} type={isLoading ? Button.PROCESSING : !notes || !star ? 'disabled' : 'submit'}>
          Kirim
        </Button>
      )}
    >
      <div className="text-center sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Review Produk
        </Modal.Title>
        <HorizontalDivider className="mb-4" />
        <div className="mt-2 text-gray-700 tracking-wide text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="">Beri Rating</span>
            <div className="flex space-x-2">
              {Array.from({length: 5}).map((_, index) => (
                <StarIcon
                  key={index}
                  onClick={() => setStar(index + 1)}
                  className={`w-6 h-6 cursor-pointer ${index < star ? 'text-yellow-500' : 'text-gray-500'}`}
                />
              ))}
            </div>
          </div>
          <HorizontalDivider className="mb-4" />
          <div className="flex text-left">
            <TextArea id="review" label="Tulis Ulasan" onChange={setNotes} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
