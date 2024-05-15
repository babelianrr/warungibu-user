import Head from 'next/head'
import {useQuery} from 'react-query'
import Image from 'next/image'
import {
  CategoryList,
  PromoList,
  FlashSaleAlert,
  RetailList,
  GrosirList,
  Brand,
  Info,
  Banner,
  FlashSaleList,
  ProductList,
} from '@/components/main'
import MainLayout from '@/components/layouts/MainLayout'
import {fetchAuthGet, fetchGet, fetchOptionalGet} from 'helpers/fetch'
import BicartPoint from '@/components/main/BicartPoint'
import LogoToken from 'public/assets/token-listrik.png'
import AccessComp from '@/components/HOC/ProtectedComponent'
import { authenticatedUser } from 'helpers/isAuthenticated'
import { HorizontalDivider } from '@/components/base'

function transformProductResponse(data) {
  const flashSale = data[0]
  if (!flashSale) {
    return null
  }
  return {
    ...flashSale,
    products: flashSale.products.slice(0, 6).map((product) => ({
      ...product,
      image: product?.images[0]?.url ?? '/assets/default.png',
    })),
  }
}

export default function Home({categories, banners, activeFlashSale}) {
  const {data: flashSale} = useQuery(['flash-sale'], () => fetchOptionalGet('flash-sales'), {
    select: transformProductResponse,
  })

  const {id: userId} = authenticatedUser()
  const {data, refetch} = useQuery(['users', userId], () => fetchAuthGet(`users/${userId}`), {
      retry: false,
  })

  const harian = [
    {
      id: 1,
      name: 'Token Listrik',
      created_at: "2021-12-14T08:20:46.550Z",
      icon_url: LogoToken.src,
      url: "/token-listrik"
    }
  ]

  return (
    <MainLayout>
      <Head>
        <title>Warung Ibu</title>
        <meta name="description" content="Create by DNR Corporation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Banner banners={banners} />
        <section className="px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <AccessComp>
            <BicartPoint loanLimit={data?.loan_limit} />
          </AccessComp>
          <CategoryList categories={categories} type={'produk'} />
          <CategoryList categories={harian} type={'kebutuhan'} />
          {/* <PromoList /> */}
          {flashSale ? (
            <>
              <FlashSaleAlert flashSale={flashSale} />
              <FlashSaleList flashSale={flashSale} />
            </>
          ) : null}
          <h3 className="mr-4 ml-4 leading-8 font-medium text-sm sm:block text-gray-700">Daftar Produk</h3>
          <HorizontalDivider />
          <ProductList className={'mt-8'} />
          {/* <RetailList topProducts={topProducts} /> */}
          {/* <GrosirList /> */}
          {/* <Brand /> */}
          {/* <Info /> */}
        </section>
      </main>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const data = await fetchGet('categories')

  // const topProducts = await fetchGet('products/top-product?limit=6')

  const activeFlashSale = await fetchGet('flash-sales')

  const banners = await fetchGet('banners')

  return {
    props: {
      categories: data.map((category) => ({
        ...category,
        url: `/categories/${category.name.replace(/ /g, '_')}`,
      })),
      // topProducts: topProducts.map((product) => ({
      //   ...product,
      //   image: product?.images[0]?.url ?? '/assets/default.png',
      // })),
      banners,
      activeFlashSale,
      // topProducts
    },
    revalidate: 10,
  }
}
