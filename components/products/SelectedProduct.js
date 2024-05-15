import SeeAll from '@/components/main/utils/SeeAll'
import Header from '@/components/main/utils/Header'
import ProductList from '@/components/main/ProductList'

export default function RetailList() {
  return (
    <section className="mt-3">
      <div className="flex justify-between">
        <Header text="Produk Rekomendasi Kami" />
        <SeeAll color="text-dnr-primary" />
      </div>
      <ProductList />
    </section>
  )
}
