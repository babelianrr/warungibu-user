import Image from 'next/image'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {FilterIcon, StarIcon, SearchIcon} from '@heroicons/react/outline'
import MainLayout from '@/components/layouts/MainLayout'
import {Banner} from '@/components/main'
import SelectedProduct from '@/components/products/SelectedProduct'
import {HorizontalDivider, Input} from '@/components/base'
import Card from '@/components/products/Card'
import ActiveLink from '@/components/base/ActiveLink'
import Pagination from '@/components/base/Pagination'
import useServerPagination from 'hooks/useServerPagination'
import {Button} from '@/components/button'
import FilterProductModal from '@/components/mobile/FilterProductModal'

import {fetchOptionalGet, fetchAuthGet} from 'helpers/fetch'
import {useCategories} from 'hooks/useCategories'

const orders = [
  {
    id: 1,
    key: 'PRICE',
    direction: 'DESC',
    name: 'Harga Termahal',
  },
  {
    id: 2,
    key: 'PRICE',
    direction: 'ASC',
    name: 'Harga Termurah',
  },
  {
    id: 3,
    key: 'RATE',
    direction: 'DESC',
    name: 'Rating Tertinggi',
  },
  {
    id: 4,
    key: 'TOP_SALES',
    direction: 'DESC',
    name: 'Pembelian Terbanyak',
  },
]

function fetchAllProduct(page, name, category, orderById, filter) {
  let baseUrl = `products?limit=16&page=${page}`

  const orderBy = orders.find((order) => order.id === Number(orderById))

  if (name) {
    baseUrl += `&name=${name}`
  }

  if (category && category !== 'all' && category !== 'search') {
    baseUrl += `&category=${encodeURIComponent(category.replaceAll('_', ' '))}`
  }

  if (orderBy) {
    baseUrl += `&sort_by=${orderBy.key}&order=${orderBy.direction}`
  }

  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (value) {
        baseUrl += `&${key}=${value}`
      }
    })
  }

  return fetchOptionalGet(baseUrl)
}

function transformProductResponse(data) {
  return {
    ...data,
    products: data.products.map((product) => ({
      ...product,
      image: product?.images[0]?.url ?? '/assets/default.png',
    })),
  }
}

export default function Category() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [rating, setRating] = useState(null)
  const [filtered, setFiltered] = useState(false)

  function changeMinPrice(value) {
    setFiltered(false)
    setMinPrice(value)
  }

  function changeMaxPrice(value) {
    setFiltered(false)
    setMaxPrice(value)
  }

  function changeRating(e) {
    if (e.target.checked) {
      setFiltered(false)
      setRating(4)
    } else {
      setRating('')
    }
  }

  function reset() {
    setFiltered(false)
    setMinPrice('')
    setMaxPrice('')
    setRating(null)
    setOrderBy('')
  }

  function hasFilter(filtered) {
    if (minPrice || maxPrice || rating) {
      return filtered
    }
    return true
  }

  const {isLoading, data, paginationFn} = useServerPagination(
    {
      key: [
        'products',
        page,
        {
          name: router.query.name,
          product: router.query.product,
          orderBy: orderBy,
          filter: {
            min_price: minPrice,
            max_price: maxPrice,
            rating,
          },
        },
      ],
      fn: () =>
        fetchAllProduct(page, router.query.name, router.query.product, orderBy, {
          min_price: minPrice,
          max_price: maxPrice,
          rating,
        }),
      option: {
        keepPreviousData: 1,
        select: transformProductResponse,
        enabled: hasFilter(filtered),
      },
      perPage: 16,
    },
    (page) => setPage(page)
  )

  const {data: categories, isLoading: isLoadingCategory} = useCategories()

  function CategoryTitle(query) {
    const title = query.product?.split('_').join(' ').toUpperCase() || 'PRODUCT'
    return `KATEGORI ${title}`
  }

  
  return (
    <MainLayout>
      {/* {router.query.product !== 'search' && <Banner />} */}
      <FilterProductModal
        open={open}
        setOpen={setOpen}
        categories={categories}
        minPrice={minPrice}
        maxPrice={maxPrice}
        rating={rating}
        isLoading={isLoadingCategory}
        changeMaxPrice={changeMaxPrice}
        changeMinPrice={changeMinPrice}
        changeRating={changeRating}
        reset={reset}
        setFiltered={() => {
          setFiltered(true)
        }}
      />

      <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="border-b border-gray-200"></div>
        <section className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between sm:items-center my-8">
          {/* Hasil Pencarian OR category */}
          {router.query.product === 'search' ? (
            <div className="flex items-center space-x-6">
              <div className="bg-white border-b border-gray-200 py-2 px-2 rounded-md shadow">
                <SearchIcon width="40" height="40" className="text-dnr-turqoise" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg sm:text-3xl text-dnr-turqoise">Hasil Pencarian</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">{data?.totalProduct}</span> Hasil pencarian{' '}
                  <span className="font-medium">"{router.query.name}"</span>
                </p>
              </div>
            </div>
          ) : router.query.product !== 'all' ? (
            <div className="flex items-center space-x-6">
              {!isLoadingCategory ? <CategoryImage categories={categories} path={router.asPath} /> : null}
              <p className="text-lg sm:text-2xl font-light leading-none">{CategoryTitle(router.query)}</p>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <p className="text-3xl text-dnr-turqoise">Semua Produk</p>
            </div>
          )}

          <div className="flex items-center sm:space-x-6 text-sm">
            <div
              className="bg-white flex-1 rounded-md p-4 mr-4 flex sm:hidden justify-between"
              onClick={() => setOpen(true)}
            >
              <p className="font-semibold ">Filter By</p>
              <FilterIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div className="relative flex-1 sm:w-full">
              <select
                className="border border-gray-300 text-base font-light rounded-md appearance-none inline-block py-3 pl-4 leading-none w-full"
                value={orderBy}
                onChange={(e) => {
                  setOrderBy(e.target.value)
                }}
              >
                <option value={''}>Paling Sesuai</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
        <section className="flex justify-between items-start mb-4 sm:space-x-4">
          <div className="bg-white rounded-md shadow hidden sm:flex flex-col py-6 px-6">
            <div className="flex space-x-6 justify-between items-center mb-4 text-sm">
              <p className="font-medium">Kategori</p>
              <p
                className="text-gray-500 hover:text-dnr-turqoise cursor-pointer"
                onClick={() => {
                  router.push(`/categories/all`)
                  reset()
                }}
              >
                Reset
              </p>
            </div>
            <nav>
              {isLoadingCategory ? (
                <p className="py-4 text-gray-700 text-center text-lg">Proses Pengambilan Data</p>
              ) : (
                <ul>
                  {categories.map((category) => (
                    <NavCategory key={category.id} href={category.url} onClick={() => setOpen(false)}>
                      {category.name}
                    </NavCategory>
                  ))}
                </ul>
              )}
            </nav>

            <HorizontalDivider className="mb-4" />
            <div className="mb-4 space-y-4">
              <h2 className="text-sm font-medium mb-4">Harga</h2>
              <Input
                className="font-light"
                id="minPrice"
                placeholder="Harga Minimum"
                prefix="Rp"
                autoComplete="off"
                onChange={changeMinPrice}
                defaultValue={minPrice}
              />
              <Input
                className="font-light"
                id="maxPrice"
                placeholder="Harga Maximum"
                prefix="Rp"
                autoComplete="off"
                onChange={changeMaxPrice}
                defaultValue={maxPrice}
              />
            </div>
            <HorizontalDivider className="mb-4" />
            <div className="mb-4">
              <h2 className="text-sm font-medium mb-4">Rating</h2>
              <div className="flex space-x-4 items-center">
                <input
                  id="check"
                  name="key"
                  value="value"
                  type="checkbox"
                  checked={!!rating}
                  onChange={changeRating}
                  className="h-4 w-4 border-gray-300 rounded text-dnr-dark-orange focus:ring-dnr-orange"
                />
                <label className="flex space-x-2 items-center text-sm">
                  <StarIcon className="h-4 w-4 text-dnr-dark-orange" />
                  <p className="text-sm font-light mt-0.5">4 Keatas</p>
                </label>
              </div>
            </div>
            <HorizontalDivider className="mb-4" />
            <Button className="font-light leading-none text-sm" onClick={() => setFiltered(true)}>Filter Produk</Button>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 grid-rows-1 gap-4">
            {isLoading ? (
              <h1>Proses Pengambilan Data</h1>
            ) : (
              <>
                {data.products.map((product, index) => (
                  <Card key={product.id} product={product} isFavorite={product.is_favorite} />
                ))}
              </>
            )}
          </div>
        </section>
        <Pagination paginationFn={paginationFn} />
        <section>
          <SelectedProduct />
        </section>
      </main>
    </MainLayout>
  )
}

export function NavCategory({children, href, onClick = () => {}}) {
  return (
    <li>
      <ActiveLink activeClassName="active bg-dnr-gray font-normal" href={href}>
        <a
          className="text-sm bg-white font-light hover:bg-dnr-gray rounded-md py-2.5 px-3.5 pr-20 mb-1 flex items-center justify-start text-black"
          onClick={onClick}
        >
          {children}
        </a>
      </ActiveLink>
    </li>
  )
}

function CategoryImage({categories, path}) {
  const category = categories.find((category) => path.includes(category.url)) || categories[0]
  return (
    <div className="bg-white py-3 px-4 rounded-md shadow">
      <img src={category.icon_url} alt={category.name} width={32} height={32} />
    </div>
  )
}
