import {ArrowCircleRightIcon} from '@heroicons/react/outline'
import NavLink from '@/components/base/NavLink'

export default function SeeAll({color, href = '/categories/all'}) {
  return (
    <NavLink href={href}>
      <div className={`flex items-center ${color} space-x-2 cursor-pointer mt-1`}>
        <h4 className="text-sm tracking-wide leading-8 hover:opacity-80">Lihat Semua</h4>
        <div className="border border-dnr-primary rounded-full shadow w-8 h-8 flex items-center justify-center hover:text-white hover:bg-wi-blue">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </NavLink>
  )
}
