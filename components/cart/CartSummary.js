import { useRouter } from 'next/router'
import Button from '../button/Button'
import currencyConverter from 'helpers/currencyConverter'
import { generatePrice, generatePricePromotion } from 'helpers/generatePrice'

export default function CartSummary({ cartList, stockAvailable }) {
  const router = useRouter()
  // const selectedItem = cartList.filter((item) => item.selected && !item.needLicense)
  const selectedItem = cartList.filter((item) => item.selected)
  // const selectedItem = cartList

  const calcTotalPrice = () => {
    const total = selectedItem.reduce((pre, curr) => {
      return pre + (curr.product.price - (Math.ceil((generatePricePromotion(curr.product, curr.quantity) / 100) * curr.product.price))) * curr.quantity
    }, 0)
    return total
  }

  return (
    <div className="space-y-2 w-1/4">
      <div className="bg-white rounded-md shadow px-4 py-3 w-full hidden sm:block">
        <h3 className="text-lg leading-7 font-medium">Ringkasan Belanja</h3>
      </div>

      <div className="bg-white rounded-md shadow p-4 w-full hidden sm:block">
        <div className="font-extralight text-sm flex flex-col space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <p className="w-2/4 text-xs">{`Total Harga (${selectedItem.length} Barang)`}</p>
            <p className="text-gray-900 text-base font-medium">{currencyConverter(calcTotalPrice())}</p>
          </div>
        </div>
        <Button
          className="w-full text-sm"
          color="primary"
          type={selectedItem.length === 0 ? 'disabled' : stockAvailable === false ? 'disabled' : ''}
          // type={selectedItem.length === 0 || calcTotalPrice() < 200000 ? 'disabled' : stockAvailable === false ? 'disabled' : ''}
          // type={selectedItem.length === 0 || calcTotalPrice() < 200000 ? 'disabled' : ''}
          onClick={() => router.push('/checkout')}
        >
          {stockAvailable ? `Beli (${selectedItem.length} Barang)` : 'Produk Tidak Valid'}
          {/* {`Beli (${selectedItem.length} Barang)`} */}
        </Button>
      </div>
    </div>
  )
}
