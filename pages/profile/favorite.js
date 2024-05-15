import {useState} from 'react'
import {ArrowLeftIcon} from '@heroicons/react/outline'
import MainLayout from '@/components/layouts/MainLayout'

import {Breadcrumb, Pagination} from '@/components/base'
import NavLink from '@/components/base/NavLink'
import Header from '@/components/main/utils/Header'
import Card from '@/components/products/Card'
import SelectedProduct from '@/components/products/SelectedProduct'

import useServerPagination from 'hooks/useServerPagination'
import {fetchAuthGet} from 'helpers/fetch'

function transformProductResponse(data) {
  return {
    ...data,
    products: data.products.map((product) => ({
      ...product,
      image: product?.images[0]?.url ?? '/assets/default.png',
    })),
  }
}

function fetchFavoriteProduct(page) {
  const baseUrl = `products/favorites?limit=16&page=${page}`

  return fetchAuthGet(baseUrl)
}

export default function Favorite() {
  const [page, setPage] = useState(1)

  const {isLoading, data, paginationFn, refetch} = useServerPagination(
    {
      key: ['favorite-product'],
      fn: () => fetchFavoriteProduct(page),
      option: {
        keepPreviousData: 1,
        select: transformProductResponse,
      },
      perPage: 16,
    },
    (page) => setPage(page)
  )

  return (
    <MainLayout backTo="/profile/mobile">
      <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <section className="section mb-4 hidden sm:block">
          <Breadcrumb path={[{name: 'Beranda', path: '/'}, 'Favorite']} />
        </section>
        <section className="flex justify-between">
          <div className="flex sm:space-x-4 items-center">
            <NavLink href="/profile">
              <ArrowLeftIcon className="w-5 h-5 cursor-pointer text-gray-500 hidden sm:block " />
            </NavLink>

            <Header text="Produk Favorite" />
          </div>
          {/* Todo Pake Style yang udah dibuat sama mas Wika */}
        </section>

        <section className="space-y-6 mb-6">
          {isLoading ? (
            <p className="py-4 text-gray-700 text-center text-lg">Proses Pengambilan Data</p>
          ) : data.products.length === 0 ? (
            <p className="py-4 text-gray-700 text-center text-lg">Belum ada produk yang difavoritkan</p>
          ) : (
            <section className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-5">
              {data.products.map((product) => (
                <Card product={product} key={product.id} isFavorite refetch={refetch} />
              ))}
            </section>
          )}
        </section>
        {!isLoading && data?.products.length !== 0 ? (
          <section className="mb-10">
            <Pagination paginationFn={paginationFn} />
          </section>
        ) : null}
      </main>
    </MainLayout>
  )
}
