import {GrayBorderButton} from '@/components/button'
import discountCalc from 'helpers/discountCalc'
import currencyConverter from 'helpers/currencyConverter'
import {generatePricePromotion} from "../../helpers/generatePrice";

export default function Item({cart}) {
  return (
    <li>
      <div className="flex space-x-6 items-center my-4">
        <div className="bg-white rounded-md shadow">
          <img
            src={cart.product.images.length !== 0 ? cart.product.images[0].url : '/assets/default.png'}
            alt="Product Image"
            className="h-20"
          />
        </div>
        <div className="flex flex-col text-sm flex-1">
          <p className="">{cart.product.name}</p>
          <p className="text-sm text-gray-500">
            {currencyConverter(discountCalc(cart.product.price, cart.discount_percentage))} x {cart.quantity}{' '}
            Qty
          </p>
        </div>
        <p className="text-base text-gray-900">{currencyConverter(cart.final_unit_price)}</p>
      </div>

      {/* <GrayBorderButton
        as="div"
        hoverState={false}
        padding="py-1 px-2 sm:px-4 sm:py-3"
        // alignment="sm:items-center"
        className="flex flex-col sm:flex-row justify-between sm:items-center w-full text-gray-500 text-sm"
      >
        <p className="flex-1 leading-8 text-left">
          Dikirim dari <span className="text-gray-700 font-semibold">{cart.location}</span>
        </p>
        , Total biaya ongkir:<div className="relative flex space-x-2 text-dnr-dark-turqoise">
          <span>Rp 20.000</span> <span className="text-gray-500">(Estimasi 2-3 hari)</span>
        </div>
      </GrayBorderButton> */}
    </li>
  )
}
