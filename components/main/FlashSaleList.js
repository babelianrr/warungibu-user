import Card from '@/components/products/Card'
import {useQuery} from 'react-query'
import {fetchOptionalGet} from 'helpers/fetch'
import generateDummy from 'helpers/generateCategories'

export default function FlashSaleList({flashSale}) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-6 sm:grid-rows-1 gap-2 mt-5 mb-16">
      {flashSale?.products
        ?.map((product) => ({
          ...product,
          image: product?.images[0]?.url ?? '/assets/default.png',
        }))
        .map((product) => (
          <Card key={product.id} product={product} isFavorite={product.is_favorite} />
        ))}
    </section>
  )
}
