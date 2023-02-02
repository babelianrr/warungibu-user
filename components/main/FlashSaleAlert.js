import {ArrowCircleRightIcon, Circle, ChevronRightIcon} from '@heroicons/react/outline'
import SeeAll from '@/components/main/utils/SeeAll'
import useCountdown from 'hooks/useCountdown'

export default function FlashSaleALert({flashSale}) {
  const {days, hours, minutes, seconds, padStart} = useCountdown(1, 'until', new Date(flashSale.end_date))
  return (
    <div className="mt-6">
      <div className="bg-white rounded-md shadow font-sans font-semibold py-4 px-5 flex items-center space-x-2 text-gray-900">
        <h3 className="text-xl sm:text-xl leading-none self-center">{flashSale.notes}</h3>
        <div className="flex flex-1 justify-between space-x-2 sm:space-x-6">
          <div className="flex items-center">
            <h3 className="mr-4 ml-6 leading-8 font-light text-xs hidden sm:block text-gray-500">Berakhir dalam</h3>
            <div className="flex space-x-6">
              <div className="flex items-center text-sm font-light">
                <div className="bg-wi-blue text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
                  <div>
                  {padStart(days)}
                  <p className="text-xs leading-none">dd</p>
                  </div>
                </div>
                <div className="mx-2 text-base">:</div>
                <div className="bg-wi-blue text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
                  <div>
                  {padStart(hours)}
                  <p className="text-xs leading-none">hh</p>
                  </div>
                </div>
                <div className="mx-2 text-base">:</div>
                <div className="bg-wi-blue text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
                  <div>
                  {padStart(minutes)}
                  <p className="text-xs leading-none">mm</p>
                  </div>
                </div>
                <div className="mx-2 text-base">:</div>
                <div className="bg-wi-blue text-white w-11 h-11 flex items-center justify-center text-center shadow rounded-md text-base leading-none">
                  <div>
                  {padStart(seconds)}
                  <p className="text-xs leading-none">ss</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="block sm:hidden self-center">
            <ChevronRightIcon className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex items-center">
            <SeeAll color="text-dnr-primary font-normal" href="/flash-sale" />
          </div>
        </div>
      </div>
    </div>
  )
}
