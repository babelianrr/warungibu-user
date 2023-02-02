import {ArrowCircleRightIcon, Circle} from '@heroicons/react/outline'
import SeeAll from '@/components/main/utils/SeeAll'
import useCountdown from 'hooks/useCountdown'

export default function FlashSaleALert({flashSale}) {
  const {days, hours, minutes, seconds, padStart} = useCountdown(1, 'until', new Date(flashSale.end_date))

  return (
    <div>
      <div className="bg-white text-gray-900 rounded-md shadow py-5 px-4 items-baseline justify-between text-sm">
        <h3 className="text-sm mb-3 text-xs leading-tight self-center">{flashSale.notes}</h3>
        <div className="flex space-x-6 justify-center">
          <div className="flex items-center text-sm font-light">
            <div className="bg-wi-blue text-white w-10 h-10 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
              <div>
                <div>{padStart(days)}</div>
                <div className="text-xs leading-none">dd</div>
              </div>
            </div>
            <div className="mx-1.5 text-base">:</div>
            <div className="bg-wi-blue text-white w-10 h-10 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
              <div>
                {padStart(hours)}
                <p className="text-xs leading-none">hh</p>
              </div>
            </div>
            <div className="mx-1.5 text-base">:</div>
            <div className="bg-wi-blue text-white w-10 h-10 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
              <div>
                {padStart(minutes)}
                <p className="text-xs leading-none">mm</p>
              </div>
            </div>
            <div className="mx-1.5 text-base">:</div>
            <div className="bg-wi-blue text-white w-10 h-10 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
              <div>
                {padStart(seconds)}
                <p className="text-xs leading-none">ss</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
