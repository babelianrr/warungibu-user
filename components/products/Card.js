import Link from 'next/link'
import { useRouter } from 'next/router'
import { HeartIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import FavoriteIcon from './FavoriteIcon'
import { classNames } from 'helpers/classNames'
import currencyConverter from 'helpers/currencyConverter'
import { fetchAuthPost } from 'helpers/fetch'
import { authenticatedUser, isAuthenticated } from 'helpers/isAuthenticated'
import { generatePrice } from 'helpers/generatePrice'
import formatNumber from 'helpers/formatNumberToK'

const dummyProduct = {
  id: 1,
  image: '/assets/cdr.jpg',
  name: 'CDR (Calsium-D-Redoxon) ahlinya kalsium suplemen makanan',
  price: 10000,
  disc: 20,
  rating: 4.5,
  sold: 3400,
  category: 'beras',
  type: 'retail',
}

export default function Card({ isFavorite = false, product = dummyProduct, refetch = () => { } }) {
  const router = useRouter()
  let promotionPercentage = 0;

  if (product.promotions && product.promotions.length > 0) {
    for (let i = 0; i < product.promotions.length; i++) {
      const currPercentage = parseInt(product.promotions[i].percentage);
      if (currPercentage > promotionPercentage) {
        promotionPercentage = product.promotions[i].percentage;
      }
    }
  }

  const promoPrice = product.price - ((product.price * promotionPercentage) / 100)

  return (
    // <Link href={`/products/${product.id}`}>
    <a onClick={() => router.push(`/products/${product.slug}`)}>
      <div className="flex bg-white sm:bg-transparent flex-col h-full justify-between space-y-3 p-2 hover:bg-white group hover:shadow hover:rounded-md transition ease-in-out duration-250 cursor-pointer ">
        <div className="bg-white relative">
          {product.discount_type ? (
            <div className="absolute -top-1 -left-3 text-red-500">
              <svg className="w-20 h-16 fill-current" viewBox="0 0 82 75.051">
                <defs>
                  <filter id="Path_10993" x="0" y="0" width="82" height="75.051" filterUnits="userSpaceOnUse">
                    <feOffset dy="2" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood floodOpacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_10993)">
                  <path
                    id="Path_10993-2"
                    data-name="Path 10993"
                    d="M-743.4,841.9h58.174A11.8,11.8,0,0,1-673.4,853.672V904.95c0,.006-30.5-12.728-30.514-12.744.005,0-30.634,12.748-30.617,12.744V850.729a8.849,8.849,0,0,0-8.869-8.83Z"
                    transform="translate(749.4 -837.9)"
                  />
                </g>
              </svg>
              <div className="absolute -top-0.5 z-30 text-white flex flex-col ml-1 justify-center items-center pb-2 h-full w-full">
                <span className="text-xs font-light leading-none">Diskon s.d.</span>
                <span className="text-xl font-medium leading-none">{product.discount_percentage}%</span>
              </div>
            </div>
          ) : null}

          {promotionPercentage > 0 ? (
            <div className="absolute -top-1 -left-3 text-red-500">
              <svg className="w-20 h-16 fill-current" viewBox="0 0 82 75.051">
                <defs>
                  <filter id="Path_10993" x="0" y="0" width="82" height="75.051" filterUnits="userSpaceOnUse">
                    <feOffset dy="2" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood floodOpacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_10993)">
                  <path
                    id="Path_10993-2"
                    data-name="Path 10993"
                    d="M-743.4,841.9h58.174A11.8,11.8,0,0,1-673.4,853.672V904.95c0,.006-30.5-12.728-30.514-12.744.005,0-30.634,12.748-30.617,12.744V850.729a8.849,8.849,0,0,0-8.869-8.83Z"
                    transform="translate(749.4 -837.9)"
                  />
                </g>
              </svg>
              <div className="absolute -top-0.5 z-30 text-white flex flex-col ml-1 justify-center items-center pb-2 h-full w-full">
                <span className="text-xs font-light leading-none">Diskon s.d.</span>
                <span className="text-lg font-medium leading-none">{promotionPercentage}%</span>
              </div>
            </div>
          ) : null}

          <div className={classNames('absolute top-1 right-1 cursor-pointer hover:text-red-500 hover:opacity-100')}>
            <FavoriteIcon product={product} refetch={refetch} isFavorite={isFavorite} />
          </div>
          <img src={product.image} className="w-full h-full" alt="Product Image" />
        </div>
        <div className="flex-1">
          <h3 className="leading-snug text-gray-500 text-sm font-normal">{product.name}</h3>
        </div>

        <div className="hidden sm:block">
          <div className="items-center text-sm sm:text-base hidden sm:block">
            <h4 className="text-gray-900 leading-6 flex-1 mb-1">
              {authenticatedUser().customer_id ? currencyConverter(promoPrice) : '-'}
              {/* {authenticatedUser().customer_id ? currencyConverter(generatePrice(product)) : '-'} */}
            </h4>
            {product.discount_type && authenticatedUser().customer_id ? (
              <div className="text-xs font-light flex-1">
                <span className="text-dnr-light-gray mr-1"> -{product.discount_percentage}%</span>
                <span className="line-through text-dnr-light-gray">{currencyConverter(product.price)}</span>
              </div>
            ) : promotionPercentage > 0 ? (
              <div className="text-xs font-light flex-1">
                <span className="text-dnr-light-gray mr-1"> -{promotionPercentage}%</span>
                <span className="line-through text-dnr-light-gray">{currencyConverter(product.price)}</span>
              </div>
            ) : (
              <div className="text-xs font-extralight flex-1 text-transparent">-</div>
            )}
          </div>
          <div className="flex items-center space-x-2 mt-2 hidden sm:block">
            {product.average_rating ? (
              <div className="border-r border-gray-300 flex items-center">
                <div className="flex space-x-0.5 mr-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 -mt-0.5" />
                </div>
                <span className="text-xs font-normal mr-4">{product.average_rating}</span>
              </div>
            ) : null}
            <span className={`text-xs text-gray-500 opacity-100 font-light`}>
              Terjual: {formatNumber(product.sold) || '-'}
            </span>
          </div>
        </div>

        <div className="sm:hidden margin-top-mobile">
          <div className="flex flex-col sm:hidden items-start mb-2 text-sm">
            <h4 className="text-gray-900 leading-6 flex-1">
              {authenticatedUser().customer_id ? currencyConverter(product.price || 100000) : '-'}
            </h4>
            {product.discount_type && authenticatedUser().customer_id ? (
              <div className="text-xs font-light flex-1">
                <span className="text-dnr-light-gray mr-1"> -{product.discount_percentage}%</span>
                <span className="line-through text-dnr-light-gray">{currencyConverter(product.price)}</span>
              </div>
            ) : promotionPercentage > 0 ? (
              <div className="text-xs font-light flex-1">
                <span className="text-dnr-light-gray mr-1"> -{promotionPercentage}%</span>
                <span className="line-through text-dnr-light-gray">{currencyConverter(product.price)}</span>
              </div>
            ) : (
              <div className="text-xs font-extralight flex-1 text-transparent">-</div>
            )}
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:hidden">
            {product.average_rating ? (
              <div className="border-r border-gray-300 flex items-center">
                <div className="flex space-x-0.5 mr-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 -mt-0.5" />
                </div>
                <span className="text-xs font-normal mr-4">{product.average_rating}</span>
              </div>
            ) : null}
            <span className={`text-xs text-gray-500 opacity-100 font-light`}>
              Terjual: {formatNumber(product.sold) || '-'}
            </span>
          </div>
        </div>
        {/* <div className="h-2 border-gray-300 border-b"></div> */}

        {/* <div className="flex items-center">
        <Retail />
        <span className="text-xs font-extralight ml-2 line-through">Rp 79.000</span>
      </div>

      <div>
        <h4 className="text-dnr-dark-orange font-semibold leading-8">Rp 100.000</h4>
      </div> */}

        {/* <div className=" opacity-0 group-hover:opacity-100 transition ease-in ">
        <div className="border border-dnr-dark-orange rounded-md text-dnr-dark-orange px-3 py-2 text-center text-sm font-light tracking-wide hover:bg-dnr-dark-orange hover:text-white cursor-pointer">
          <h5>Masukkan keranjang</h5>
        </div>
      </div> */}
      </div>
    </a>
    // </Link>
  )
}