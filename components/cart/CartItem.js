import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import { HorizontalDivider, Counter } from '@/components/base'
import currencyConverter from 'helpers/currencyConverter'
import { classNames } from 'helpers/classNames'
import { generatePrice, generatePricePromotion } from 'helpers/generatePrice'
import { MAX_CART_QUANTITY } from 'helpers/config'

export default function CartItem({ item, handleChangeQty, handleChangeCheckbox, setOpen, setIdDelete, stockAvailable }) {
  const handleDeleteCart = (cartId) => {
    setIdDelete(cartId)
    setOpen(true)
  }

  const showingPrice = item.product.price - Math.ceil((generatePricePromotion(item.product, item.quantity) / 100) * item.product.price);

  return (
    <>
      <div
        className={classNames(
          'hidden sm:flex mb-6 justify-between p-3 py-2 bg-gray-50 rounded-md',
          item.needLicense ? 'text-gray-500' : 'text-gray-900'
        )}
      >
        <div className="flex space-x-6 items-center">
          {/* <input
            id="check"
            name="key"
            value="value"
            type="checkbox"
            disabled={item.needLicense}
            checked={item.selected}
            onChange={() => handleChangeCheckbox(item)}
            className={classNames(
              `h-4 w-4 border-gray-300 rounded focus:ring-dnr-orange`,
              item.needLicense ? 'text-gray-300' : 'text-dnr-dark-turqoise'
            )}
          /> */}
          <div className="bg-white rounded-lg">
            <img
              src={item.product.images.length !== 0 ? item.product.images[0].url : '/assets/default.png'}
              alt="Product Image"
              className="h-20 p-1"
            />
          </div>
          <div className={classNames('flex flex-col text-sm')}>
            <p className="font-normal tracking-wide">{item.product.name}</p>
            <p className="text-sm font-light text-dnr-dark-orange">{currencyConverter(showingPrice)}</p>
          </div>
        </div>

        {item.needLicense ? (
          <p className="text-red-500 text-sm self-center">Memerlukan Izin Farma</p>
        ) : (
          <div className="flex space-x-6 items-center justify-between text-sm">
            {/* <p>
              Stock Jakarta: <span className="font-normal">{800 - item.qty}pcs</span>
            </p> */}

            {
              stockAvailable > 0 ?
                <Counter
                  defaultCounter={item.quantity}
                  min={1}
                  max={MAX_CART_QUANTITY}
                  // max={item.product.stock}
                  onChange={(newQty) => handleChangeQty(item.id, newQty)}
                />
                :
                <span className='text-red-600 mr-1'>Stok Habis</span>
            }

            <div className="flex space-x-3 items-center cursor-pointer group" onClick={() => handleDeleteCart(item.id)}>
              <p className="text-sm font-extralight group-hover:text-red-700">Hapus</p>
              <TrashIcon className="w-6 h-6 svg-width-custom -mt-0.5 text-gray-600 group-hover:text-red-700" />
            </div>
          </div>
        )}
      </div>

      <div
        className={classNames(
          'flex sm:hidden mb-6 justify-between',
          item.needLicense ? 'text-gray-500' : 'text-gray-900'
        )}
      >
        <div className="flex flex-col space-x-6 items-center">
          <div className="flex justify-between items-center space-x-4 mb-4">
            <input
              id="check"
              name="key"
              value="value"
              type="checkbox"
              disabled={item.needLicense}
              checked={item.selected}
              onChange={() => handleChangeCheckbox(item)}
              className={classNames(
                `h-4 w-4 border-gray-300 rounded focus:ring-dnr-orange`,
                item.needLicense ? 'text-gray-300' : 'text-dnr-dark-turqoise'
              )}
            />
            <div className="bg-white rounded-lg border-2">
              <img
                src={item.product.images.length !== 0 ? item.product.images[0].url : '/assets/default.png'}
                alt="Product Image"
                className="h-20 p-1"
              />
            </div>
            <div className={classNames('flex flex-col text-sm')}>
              <p className="font-normal tracking-wide">{item.product.name}</p>
              <p className="text-sm font-light text-dnr-dark-orange">{currencyConverter(showingPrice)}</p>
            </div>
          </div>
          <div className="self-start">
            {item.needLicense ? (
              <p className="text-red-500 text-sm self-start">Memerlukan Izin Farma</p>
            ) : (
              <div className="flex space-x-4 items-center justify-between text-sm">
                <Counter
                  defaultCounter={item.quantity}
                  min={1}
                  max={MAX_CART_QUANTITY}
                  onChange={(newQty) => handleChangeQty(item.id, newQty)}
                />
                {/* <p>
                  Stock Jakarta: <span className="font-normal">{800 - item.qty}pcs</span>
                </p> */}
                <div
                  className="flex space-x-2 items-center cursor-pointer group"
                  onClick={() => handleDeleteCart(item.id)}
                >
                  <p className="text-sm font-extralight group-hover:text-red-700">Hapus</p>
                  <TrashIcon className="w-5 h-5 svg-width-custom -mt-0.5 text-gray-600 group-hover:text-red-700" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <HorizontalDivider className="mb-4 border-dashed" color="bg-gray-500" />
    </>
  )
}
