import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import { useMutation, useQuery } from 'react-query'
import { CartCountContext } from 'contexts/CartCountContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductImage from '@/components/mobile/ProductImage'

import { Tab } from '@headlessui/react'
import { Button } from '@/components/button'
import Category from '@/components/labels/Category'
import { HorizontalDivider, Counter, Card, Breadcrumb } from '@/components/base'
import {
  FlashSaleAlert,
  Description,
  Review,
  AddToCartModal,
  WarehouseOption,
  DeliveryOption,
  StockOption,
  NeedLoginModal,
  ErrorModal,
} from '@/components/detailProduct'
import SelectedProduct from '@/components/products/SelectedProduct'
import MainLayout from '@/components/layouts/MainLayout'
import AddToCart from '@/components/detailProduct/AddToCart'
import FavoriteIcon from '@/components/products/FavoriteIcon'

import currencyConverter from 'helpers/currencyConverter'
import { fetchOptionalGet, fetchAuthPost, fetchAuthGet, fetchGet } from 'helpers/fetch'
import { isAuthenticated, authenticatedUser } from 'helpers/isAuthenticated'
import { generatePrice, generatePricePromotion } from 'helpers/generatePrice'
import useServerPagination from 'hooks/useServerPagination'
import { MAX_CART_QUANTITY } from 'helpers/config'

export default function Detail({ defaultStock }) {
  const router = useRouter()
  const { slug } = router.query
  const { value, setValue } = useContext(CartCountContext)
  const [stockInfo, setStockInfo] = useState({ stock: 0 })
  const [product, setProduct] = useState(null)
  const {
    isLoading,
    error: testError,
  } = useQuery(['products', slug], () => fetchOptionalGet(`products/${slug}`), { 
    onSuccess(response) {
      setProduct(response)
      setStockInfo(response.branches[0])
    },
    enabled: Boolean(slug) 
  })


  const { data: flashSales } = useQuery(['flash-sale-detail', slug], () => fetchGet('flash-sales'), {
    enabled: Boolean(product?.is_flash_sale),
  })
  const [open, setOpen] = useState(false)
  // const [stockInfo, setStockInfo] = useState(product?.branches ? product.branches.find((location) => location.location === 'Cakung') : { stock: 0 })
  const [images, setImages] = useState([])
  const [selectedStock, setSelectedStock] = useState(1)
  const [activeImages, setActiveImages] = useState(images.find((image) => image.active))
  const [needLogin, setNeedLogin] = useState(false)
  const [hasError, setIsError] = useState(false)
  const [errorMessage, setError] = useState('')
  const [promotionPercentage, setPromotionPercentage] = useState(0)

  const {
    isLoading: isLoadingCart,
    mutate: addToCart,
    error,
  } = useMutation((cart) => fetchAuthPost(`carts`, cart), {
    onSuccess(response) {
      setOpen(true)
      setValue({ count: value.count + selectedStock })
    },
    onError(err) {
      setIsError(true)
      setError(err.message)
    },
  })

  useEffect(() => {
    if (product) {
      if (product.images.length !== 0) {
        const mapImages = product.images.map((image, index) => ({
          id: image.id,
          image: image.url ?? '/assets/default.png',
          active: index === 0,
        }))

        setImages(mapImages)
        setActiveImages({
          id: product?.images[0]?.id,
          image: product?.images[0]?.url ?? '/assets/default.png',
          active: true,
        })
      } else {
        setImages([
          {
            id: 1,
            image: product?.images[0]?.url ?? '/assets/default.png',
            active: true,
          },
          {
            id: 2,
            image: product?.images[0]?.url ?? '/assets/default.png',
            active: false,
          },
          {
            id: 3,
            image: product?.images[0]?.url ?? '/assets/default.png',
            active: false,
          },
        ])
        setActiveImages({
          id: 1,
          image: product?.images[0]?.url ?? '/assets/default.png',
          active: true,
        })
      }

      if (product.promotions.length > 0) {
        let highest = 0;
        for (let i = 0; i < product.promotions.length; i++) {
          const currPercentage = parseInt(product.promotions[i].percentage);
          if (currPercentage > highest) {
            highest = product.promotions[i].percentage;
          }
        }
        setPromotionPercentage(highest)
      }
    }
  }, [product])

  useEffect(() => {
    setSelectedStock(1)
  }, [slug])

  function handleAddToCart() {
    if (!isAuthenticated()) {
      setNeedLogin(true)
      return
    }
    addToCart({
      product_id: product.id,
      location: stockInfo?.location, // TBC apa tulisan Cakung atau nanti harus pake branch code nya
      quantity: selectedStock,
    })
  }

  return (
    <MainLayout
      BottomComponent={() => (
        <>
          {!isLoading && product ? (
            <AddToCart product={product} isLoading={isLoadingCart} handleAddToCart={handleAddToCart} />
          ) : (
            <Skeleton counter={1} />
          )}
        </>
      )}
      backTo={'/'}
    >
      {!isLoading && product ? <AddToCartModal open={open} setOpen={setOpen} product={product} /> : null}
      <NeedLoginModal open={needLogin} setOpen={setNeedLogin} />
      <ErrorModal open={hasError} setOpen={setIsError} message={errorMessage} />
      <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="hidden sm:block section mb-4">
          <Breadcrumb
            path={[
              { name: 'Beranda', path: '/' },
              product?.categories.length !== 0
                ? {
                  name: product?.categories[0].name,
                  path: `/categories/${product?.categories[0].name.replace(' ', '_')}`,
                }
                : null,
              product?.name,
            ]}
          />
        </div>
        <section className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:space-x-4 items-start mb-8">
          <div className="flex flex-col space-y-3 w-full sm:w-1/4">
            <div>
              <div className="block sm:hidden">
                {isLoading || !product ? (
                  <Skeleton className="py-4 px-8 h-18 object-cover object-center" />
                ) : (
                  <ProductImage images={images} />
                )}
              </div>
              <div className="hidden sm:block">
                <Card className="bg-white rounded-md shadow p-0 relative">
                  {isLoading || !product ? (
                    <Skeleton className="w-full sm:h-80 object-cover" />
                  ) : (
                    <>
                      {product.discount_type ? (
                        <div className="absolute -top-1 -left-3 text-red-500">
                          <svg className="w-20 h-16 fill-current" viewBox="0 0 82 75.051">
                            <defs>
                              <filter
                                id="Path_10993"
                                x="0"
                                y="0"
                                width="82"
                                height="75.051"
                                filterUnits="userSpaceOnUse"
                              >
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
                          <div className="absolute top-0 z-30 text-white flex flex-col ml-1 justify-center items-center pb-2 h-full w-full">
                            <span className="text-xs font-medium leading-none">Diskon</span>
                            <span className="text-xl font-semibold leading-6">{product.discount_percentage}%</span>
                          </div>
                        </div>
                      ) : null}
                      {product.discount_type ? (
                        <div className="absolute -top-1 -left-3 text-red-500">
                          <svg className="w-20 h-16 fill-current" viewBox="0 0 82 75.051">
                            <defs>
                              <filter
                                id="Path_10993"
                                x="0"
                                y="0"
                                width="82"
                                height="75.051"
                                filterUnits="userSpaceOnUse"
                              >
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
                          <div className="absolute top-0 z-30 text-white flex flex-col ml-1 justify-center items-center pb-2 h-full w-full">
                            <span className="text-xs font-medium leading-none">Diskon</span>
                            <span className="text-xl font-semibold leading-6">{product.discount_percentage}%</span>
                          </div>
                        </div>
                      ) : promotionPercentage > 0 ? (
                        <div className="absolute -top-1 -left-3 text-red-500">
                          <svg className="w-20 h-16 fill-current" viewBox="0 0 82 75.051">
                            <defs>
                              <filter
                                id="Path_10993"
                                x="0"
                                y="0"
                                width="82"
                                height="75.051"
                                filterUnits="userSpaceOnUse"
                              >
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
                          <div className="absolute top-0 z-30 text-white flex flex-col ml-1 justify-center items-center pb-2 h-full w-full">
                            <span className="text-xs font-medium leading-none">Diskon s.d.</span>
                            <span className="text-lg font-semibold leading-6">{promotionPercentage}%</span>
                          </div>
                        </div>
                      ) : null}
                      <img src={activeImages?.image} alt="Product Image" className="w-full sm:h-80 object-cover" />
                    </>
                  )}
                </Card>
              </div>
            </div>
            <div className="hidden sm:grid grid-cols-3 gap-3">
              {isLoading || !product ? (
                <>
                  <Card className="mx-auto cursor-pointer">
                    <Skeleton className="py-4 px-8 h-18 object-cover object-center" />
                  </Card>
                  <Card className="mx-auto cursor-pointer">
                    <Skeleton className="py-4 px-8 h-18 object-cover object-center" />
                  </Card>
                  <Card className="mx-auto cursor-pointer">
                    <Skeleton className="py-4 px-8 h-18 object-cover object-center" />
                  </Card>
                </>
              ) : (
                <>
                  {images.map((image) => (
                    <Card className="mx-auto cursor-pointer" key={image?.id} onClick={() => setActiveImages(image)}>
                      <img src={image?.image} alt="Product Image" className="h-18 object-cover object-center" />
                    </Card>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="w-full sm:w-2/4">
            {isLoading || !product ? (
              <Card>
                <Skeleton count={4} />
              </Card>
            ) : (
              <div className="space-y-2">
                <Card className="py-4 px-6">
                  <div className="flex justify-between items-start w-full mb-2 detail-page-card">
                    <h1 className="text-2xl leading-8 tracking-normal font-normal">{product.name}</h1>
                    <FavoriteIcon product={product} isFavorite={product.is_favorite} />
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="border-r border-gray-500 flex items-center mr-4">
                      {product.average_rating ? (
                        <>
                          <span className="text-sm font-semibold mr-2">{product.average_rating}</span>
                          <div className="flex space-x-0.5 mr-8">
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                          </div>
                        </>
                      ) : null}
                    </div>
                    {product.average_rating ? (
                      <span className="text-sm font-semibold ">
                        {product.total_rating} <span className="font-light text-gray-700 ml-1">Penilaian</span>
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-semibold leading-8 mb-1 text-2xl">
                      {authenticatedUser().customer_id ? currencyConverter(generatePrice(product)) : '-'}
                    </h4>
                    {product.discount_type && authenticatedUser().customer_id ? (
                      <div className="text-sm font-extralight">
                        <span className="text-dnr-light-gray mr-1"> -{product.discount_percentage}%</span>
                        <span className="line-through text-dnr-light-gray">{currencyConverter(product.price)}</span>
                      </div>
                    ) : null}
                  </div>
                </Card>

                {!isLoading && product && product.promotions.length > 0 ? (
                  <Tab.Group as="section" className="mb-24">
                    <Tab.List className="flex space-x-1">
                      <Tab
                        as="div"
                        className={({ selected }) =>
                          `${selected ? 'bg-wi-blue text-white font-light' : 'bg-white text-gray-900 font-light'
                          } p-2.5 px-3.5 w-1/2 sm:w-1/6 cursor-pointer rounded-t-md text-base leading-none`
                        }
                      >
                        <p>Discount</p>
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="bg-white rounded-b-md shadow p-3.5">
                      <Tab.Panel>
                        <ul>
                          {product.promotions.map((promotion, index) => (
                            <li key={promotion.id}> Min. {promotion.qty_min} {product.unit} Hemat {promotion.percentage}%</li>
                          ))}
                        </ul>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                )
                  : null}

                <Card className="py-3 px-6">
                  <h3 className="text-dnr-primary text-sm tracking-wide leading-8 font-medium mb-1">Detail</h3>
                  <HorizontalDivider className="border-dashed" color="bg-gray-500" />

                  <div className="inline-flex flex-col mb-4">
                    {/* <div className="inline-grid grid-cols-2 gap-1">
                  <span className="text-sm font-extralight leading-8">Berat</span>
                  <span className="text-sm leading-8 font-light">: 2.000 Gram</span>
                </div> */}
                    <div className="inline-grid grid-cols-2 gap-1">
                      <span className="text-sm font-extralight leading-8">SKU</span>
                      <span className="text-sm leading-8 font-light">: {product.sku_number}</span>
                    </div>
                    {product.categories.length !== 0 ? (
                      <div className="inline-grid grid-cols-2 gap-1">
                        <span className="text-sm font-extralight leading-8">Kategori</span>
                        <span className="text-sm leading-8 font-light">: {product.categories[0].name}</span>
                      </div>
                    ) : null}
                  </div>
                  {/* <div className="flex space-x-3 mb-4">
                    {product.categories.length !== 0
                      ? product.categories.map((category) => (
                          <Category key={category.id} url={category.icon_url} label={category.name} />
                        ))
                      : null}
                  </div> */}

                  <HorizontalDivider className="border-dashed" color="bg-gray-500" />
                  {isLoading || !product ? (
                    <Skeleton className="text-gray-700 leading-8" count={5} />
                  ) : (
                    <>
                      {!product.description ? (
                        <h5 className="text-gray-700 font-light leading-8 text-sm">Tidak ada Deskripsi</h5>
                      ) : (
                        <Description description={product.description} />
                      )}
                    </>
                  )}
                  <HorizontalDivider className="border-dashed mt-1 mb-3" color="bg-gray-500" />
                  <div className="flex justify-between">
                    <div className="flex space-x-4 relative">
                      <WarehouseOption location="Gudang" />
                    </div>

                    <div className="flex space-x-2 items-center relative">
                      {/* <DeliveryOption /> */}
                      {/* <p className="text-sm text-dnr-blue font-base">
                    Rp. 20.000 <span className="font-light text-gray-500">(Estimasi 2-3 Hari) </span>
                  </p>
                  <div className="flex items-center space-x-1">
                    <p className="text-sm font-base text-dnr-dark-orange">Pilihan Kurir Lain</p>
                    <ChevronDownIcon className="w-5 h-5 text-dnr-green" />
                  </div> */}
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
          {!isLoading && product && authenticatedUser().customer_id ? (
            <div className="w-full sm:w-1/4">
              {flashSales && flashSales.length !== 0 ? (
                <div className="mb-2.5">
                  <FlashSaleAlert flashSale={flashSales[0]} />
                </div>
              ) : null}

              {product.branches.length !== 0 ? (
                <div className="space-y-2.5">
                  <Card className="w-full">
                    <h3 className="text-sm leading-tight mb-6">Jumlah Harga dan Pesanan</h3>
                    <div className="relative mb-4">
                      {/* <StockOption onChange={setStockInfo} location={product.branches} /> */}
                    </div>
                    <div className="flex space-x-6 items-center mb-6">
                      {stockInfo?.stock !== 0 ? (
                        <>
                          <Counter
                            defaultCounter={selectedStock}
                            min={1}
                            max={Math.min(stockInfo.stock, MAX_CART_QUANTITY)}
                            onChange={setSelectedStock}
                          />
                          <p className="text-sm font-extralight space-x-2">
                            <span>Stok</span>
                            <span className="font-medium tracking-wide">
                              {stockInfo.stock} {product.unit}
                            </span>
                          </p>
                        </>
                      ) : null
                      }
                    </div>
                  </Card>
                  <Card className="w-full">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-sm text-gray-900 font-light">Subtotal</p>
                      <p className="text-xl font-medium text-gray-900">
                        {currencyConverter((product.price - Math.ceil((generatePricePromotion(product, selectedStock) / 100) * product.price)) * selectedStock)}
                      </p>
                    </div>
                    {generatePricePromotion(product, selectedStock) > 0 ?
                      (
                        <div className="flex justify-between items-center mb-6">
                          <p className="text-sm text-gray-900 font-light">Discount</p>
                          <p className="text-xl font-medium text-gray-900">{generatePricePromotion(product, selectedStock)}%</p>
                          <p className="text-xl line-through text-dnr-light-gray">{currencyConverter(product.price * selectedStock)}</p>
                        </div>
                      ) : null
                    }
                    {
                      stockInfo?.stock !== 0 ? (
                        <Button
                          className="hidden sm:flex w-full font-light"
                          type={isLoadingCart ? 'processing' : 'border'}
                          onClick={handleAddToCart}
                          color="primary"
                        >
                          <div className="flex items-center leading-none">
                            <img
                              class="icon-custom mr-2"
                              style={{ height: '17px', padding: '0px 1px', marginBottom: '4px' }}
                              src="/assets/cart-blue.svg"
                              alt="cart"
                            />
                            Masukkan Keranjang
                          </div>
                        </Button>
                      ) : (
                        <Button
                          className="hidden sm:flex w-full font-light"
                          type={'disabled'}
                          onClick={handleAddToCart}
                          color="primary"
                        >
                          <div className="flex items-center leading-none">
                            Stok Habis
                          </div>
                        </Button>
                      )
                    }
                  </Card>
                </div>
              ) : (
                <Card className="w-full">
                  <h3 className="text-base text-center leading-8 mb-4">Mohon Maaf Barang tidak tersedia</h3>
                  <Button className="hidden sm:flex font-light w-full bg-gray-300" type="disabled">
                    <div className="flex items-center">
                      <img
                        class="icon-custom mr-2"
                        style={{ height: '17px', padding: '0px 1px', marginBottom: '3px' }}
                        src="/assets/cart-blue.svg"
                        alt="cart"
                      />
                      Masukkan Keranjang
                    </div>
                  </Button>
                </Card>
              )}
            </div>
          ) : null}
        </section>

        <Tab.Group as="section" className="mb-24">
          <Tab.List className="flex space-x-1">
            <Tab
              as="div"
              className={({ selected }) =>
                `${selected ? 'bg-wi-blue text-white font-light' : 'bg-white text-gray-900 font-light'
                } p-2.5 px-3.5 w-1/2 sm:w-1/6 cursor-pointer rounded-t-md text-base leading-none`
              }
            >
              <p>Penilaian</p>
            </Tab>
          </Tab.List>
          <Tab.Panels className="bg-white rounded-b-md shadow w-full sm:w-3/4 p-3.5">
            <Tab.Panel>
              {isLoading || !product ? (
                <Skeleton className="text-gray-700 leading-8" count={5} />
              ) : (
                <>
                  {!product.description ? (
                    <h5 className="text-gray-700 leading-8 font-light">Belum ada Penilaian</h5>
                  ) : (
                    <Review slug={product?.id} count={product?.total_rating} />
                  )}
                </>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <section>
          <SelectedProduct />
        </section>
      </main>
    </MainLayout>
  )
}
