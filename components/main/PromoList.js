import {ShoppingCartIcon} from '@heroicons/react/outline'
import PromoBox from './PromoBox'
import Header from '@/components/main/utils/Header'

export default function PromoList() {
  return (
    <div className="mt-4">
      <Header text="Promo minggu ini" />

      <div className="mt-4">
        {/* Need to ask: !! apa bisa lebih dari 3 promo atau engga */}
        <div className="flex space-x-4 sm:grid sm:grid-cols-3 overflow-x-auto grid-rows-1 sm:gap-12">
          <PromoBox image="/assets/cdr.jpg" />
          <PromoBox image="/assets/osteocare.jpg" />
          <PromoBox image="/assets/redoxon.jpg" />
        </div>
      </div>
    </div>
  )
}
