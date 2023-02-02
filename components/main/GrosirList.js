import SeeAll from '@/components/main/utils/SeeAll'
import Header from '@/components/main/utils/Header'
import ProductList from '@/components/main/ProductList'

export default function GrosirList() {
  return (
    <section className="mt-3">
      {/* <div className="border-b border-dnr-dark-orange mb-5"></div> */}
      <div className="flex justify-between">
        <Header text="Produk Grosir Terlaris" />
        <SeeAll color="text-dnr-dark-orange" />
      </div>
      <ProductList />
    </section>
  )
}
