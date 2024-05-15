import {useContext} from 'react'
import {ChevronRightIcon} from '@heroicons/react/outline'
import {Card} from '../base'
import {CheckoutContext} from 'contexts/CheckoutContext'
import {CartCountContext} from 'contexts/CartCountContext'
import {useRouter} from "next/router";

export default function PaymentMethod({goTo}) {
  const router = useRouter()
  const {value, setValue} = useContext(CheckoutContext)

  const handleClickAndAnotherFee = (isAdminFee, isDiscount, paymentMethod, paymentChannel, paymentInfo) => {
    setValue({
      ...value,
      isAdminFee: isAdminFee,
      isDiscount: isDiscount,
      paymentMethod,
      paymentChannel,
      paymentInfo,
    })
    goTo('PaymentInfo')
  }

  const virtualAccounts = [
    // {
    //   id: 1,
    //   name: 'BCA Virtual Account',
    //   imageUrl: '/assets/bca-logo.svg',
    //   merchantCode: 'BCA',
    // },
    {
      id: 2,
      name: 'BNI Virtual Account',
      imageUrl: '/assets/bni.svg',
      merchantCode: 'BNI',
    },
    {
      id: 3,
      name: 'BRI Virtual Account',
      imageUrl: '/assets/bri-logo.svg',
      merchantCode: 'BRI',
    },
    {
      id: 4,
      name: 'Mandiri Virtual Account',
      imageUrl: '/assets/mandiri-logo.svg',
      merchantCode: 'MANDIRI',
    },
    {
      id: 5,
      name: 'Permata',
      imageUrl: '/assets/permata-logo.svg',
      merchantCode: 'PERMATA',
    },
  ]
  const banks = [
    {
      id: 1,
      name: 'Transfer Bank BCA',
      imageUrl:
        'https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png',
    },
  ]
  const cards = [
    {
      id: 1,
      name: 'VISA / MasterCard',
      imageUrl: '/assets/logo-mastercard-visa.svg',
      merchantCode: 'CARD',
    },
  ]

  return (
    <div className="mt-2 text-left">
      {/* <section className="mb-6">
        <h4 className="text-base text-gray-800   leading-4 mb-4">Transfer Bank (Verifikasi Manual)</h4>

        <div className="space-y-4">
          {banks.map((bank) => (
            <Card
              key={bank.id}
              className="px-2 flex items-center cursor-pointer"
              onClick={() => handleClickAndAnotherFee(false, true, 'BANK_TRANSFER', 'BCA', bank)}
            >
              <img src={bank.imageUrl} alt="payment" className="w-14 h-12 bg-cover object-center" />
              <h6 className="flex-1 text-gray-900 ml-6 leading-4  pt-1">{bank.name}</h6>
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            </Card>
          ))}
        </div>
      </section> */}
      <section className="mb-6">
        <h4 className="text-base text-gray-800  leading-4 mb-4">Transfer Virtual Account</h4>

        <div className="space-y-4">
          {virtualAccounts.map((virtualAccount) => (
            <Card
              key={virtualAccount.id}
              className="px-2 flex items-center cursor-pointer"
              onClick={() =>
                handleClickAndAnotherFee(true, true, 'XENDIT_VA', virtualAccount.merchantCode, virtualAccount)
              }
            >
              <img
                src={virtualAccount.imageUrl}
                alt="payment"
                className="w-16 h-12 bg-cover object-center object-contain"
              />
              <h6 className="flex-1 text-gray-900 ml-6 leading-4  pt-1">{virtualAccount.name}</h6>
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h4 className="text-base text-gray-800  leading-4 mb-4">Card Payment</h4>

        <div className="space-y-4">
          {cards.map((card) => (
              <Card
                  key={card.id}
                  className="px-2 flex items-center cursor-pointer"
                  onClick={() =>
                      router.push(`/profile/transaksi/card-payment?order_id=${value.orderId}`)
                  }
              >
                <img
                    src={card.imageUrl}
                    alt="payment"
                    className="w-16 h-12 bg-cover object-center object-contain"
                />
                <h6 className="flex-1 text-gray-900 ml-6 leading-4  pt-1">{card.name}</h6>
                <ChevronRightIcon className="w-4 h-4 text-gray-500" />
              </Card>
          ))}
        </div>
      </section>

      {/* <section className="mb-6">
        <h4 className="text-base text-gray-800   leading-4 mb-4">Pembayaran Instant</h4>
        <div className="space-y-4">
          <Card className="px-2 flex items-center cursor-pointer" onClick={() => handleClickAndAnotherFee(false)}>
            <img
              src="https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png"
              alt="payment"
              className="w-14 h-12 bg-cover object-center"
            />
            <h6 className="flex-1 text-gray-900 ml-6 leading-4  pt-1">Indomart</h6>
            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
          </Card>
          <Card className="px-2 flex items-center cursor-pointer" onClick={() => handleClickAndAnotherFee(false)}>
            <img
              src="https://www.freepnglogos.com/uploads/logo-bca-png/bank-central-asia-logo-bank-central-asia-bca-format-cdr-png-gudril-1.png"
              alt="payment"
              className="w-14 h-12 bg-cover object-center"
            />
            <h6 className="flex-1 text-gray-900 ml-6 leading-4  pt-1">Alfamart</h6>
            <ChevronRightIcon className="w-4 h-4 text-gray-500" />
          </Card>
        </div>
      </section> */}
    </div>
  )
}
