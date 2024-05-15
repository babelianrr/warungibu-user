import SeeAll from '@/components/main/utils/SeeAll'
import Header from '@/components/main/utils/Header'
import ProductList from '@/components/main/ProductList'

export default function RetailList({topProducts}) {
  return (
    <section className="mt-5">
      <div className="flex justify-between items-center sm:items-start">
        <Header text="Produk Rekomendasi Kami" />
        <SeeAll color="text-dnr-primary" />
      </div>
      <ProductList topProducts={topProducts} />
    </section>
  )
}
