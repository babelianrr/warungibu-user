import {useState} from 'react'
import {useQuery} from 'react-query'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {FilterIcon, StarIcon, SearchIcon} from '@heroicons/react/outline'
import MainLayout from '@/components/layouts/MainLayout'
import SelectedProduct from '@/components/products/SelectedProduct'
import {HorizontalDivider, Input} from '@/components/base'
import Card from '@/components/products/Card'
import ActiveLink from '@/components/base/ActiveLink'
import FilterProductFlashSaleModal from '@/components/mobile/FilterProductFlashSaleModal'
import {fetchOptionalGet, fetchAuthGet} from 'helpers/fetch'
import {useCategories} from 'hooks/useCategories'

function transformProductResponse(data) {
  const flashSale = data[0]
  if (!flashSale) {
    return null
  }
  return {
    ...flashSale,
    products: flashSale.products.map((product) => ({
      ...product,
      image: product?.images[0]?.url ?? '/assets/default.png',
    })),
  }
}

export default function FlashSaleList() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [activeCategoryId, setCategoryId] = useState(null)

  const {isLoading, data} = useQuery(['flash-sale'], () => fetchOptionalGet('flash-sales'), {
    select: transformProductResponse,
  })

  function matchCategory(activeCategoryId) {
    return function (product) {
      if (!activeCategoryId) {
        return true // passed all
      }

      return product.categories.find((category) => category.id === activeCategoryId)
    }
  }

  const {data: categories, isLoading: isLoadingCategory} = useCategories()

  return (
    <MainLayout>
      <FilterProductFlashSaleModal
        open={open}
        setOpen={setOpen}
        categories={categories}
        activeCategoryId={activeCategoryId}
        isLoading={isLoadingCategory}
        selectCategory={setCategoryId}
      />

      <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="border-b border-gray-200"></div>
        <section className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between sm:items-center my-8">
          <div className="flex items-center space-x-6">
            <p className="text-3xl font-light text-gray-500">{data?.notes}</p>
          </div>

          <div className="flex items-center sm:space-x-6 text-sm">
            {/* <div className="hidden sm:flex justify-center items-center sm:space-x-2">
              <FilterIcon className="w-6 h-6 text-gray-600" />
              <p>Urutkan:</p>
            </div> */}
            <div
              className="bg-white flex-1 rounded-md p-4 mr-4 flex sm:hidden justify-between"
              onClick={() => setOpen(true)}
            >
              <p className="font-semibold ">Filter By</p>
              <FilterIcon className="w-6 h-6 text-gray-600" />
            </div>
            {/* <div className="relative flex-1 sm:w-full">
              <select className=" bg-dnr-gray border-2 rounded-lg appearance-none inline-block py-3 pl-3 sm:pr-36 leading-tight w-full focus:border-dnr-turqoise">
                <option>Paling Sesuai</option>
                <option>Paling Murah</option>
                <option>Paling Populer</option>
                <option>Paling Terdekat</option>
              </select>
            </div> */}
          </div>
        </section>
        <section className="flex justify-between items-start mb-4 sm:space-x-4">
          <div className="bg-white rounded-md shadow hidden sm:flex flex-col py-6 px-6">
            <div className="flex space-x-6 justify-between items-center mb-4 text-sm">
              <p className="font-medium">Kategori</p>
              <p className="text-gray-500 hover:text-dnr-turqoise cursor-pointer" onClick={() => setCategoryId(null)}>
                Reset
              </p>
            </div>
            <nav>
              {isLoadingCategory ? (
                <p className="py-4 text-gray-700 text-center text-base">Proses Pengambilan Data</p>
              ) : (
                <ul>
                  {categories.map((category) => (
                    <NavCategory
                      key={category.id}
                      href={category.url}
                      categoryId={category.id}
                      activeCategoryId={activeCategoryId}
                      onClick={() => {
                        setCategoryId(category.id)
                        setOpen(false)
                      }}
                    >
                      {category.name}
                    </NavCategory>
                  ))}
                </ul>
              )}
            </nav>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 grid-rows-1 gap-4">
            {isLoading ? (
              <h1>Proses Pengambilan Data</h1>
            ) : (
              <>
                {data.products.filter(matchCategory(activeCategoryId)).map((product, index) => (
                  <Card key={product.id} product={product} isFavorite={product.is_favorite} />
                ))}
              </>
            )}
          </div>
        </section>
        <section>
          <SelectedProduct />
        </section>
      </main>
    </MainLayout>
  )
}

export function NavCategory({children, categoryId, activeCategoryId, onClick = () => {}}) {
  return (
    <li
      className={`text-sm font-light bg-white ${
        categoryId === activeCategoryId ? 'bg-dnr-gray font-normal' : ''
      } hover:bg-dnr-gray rounded-md py-2.5 px-3.5 pr-20 mb-1 flex items-center justify-start text-black cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </li>
  )
}
