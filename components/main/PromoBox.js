import {ShoppingCartIcon} from '@heroicons/react/outline'

export default function PromoBox({image}) {
  return (
    <div className="flex-shrink-0 bg-white border-dnr-green rounded-md shadow flex flex-col space-y-4 items-center p-4 cursor-pointer group">
      <img
        src="/assets/cdr.png"
        alt="image shopee"
        className="h-64 transform group-hover:scale-110 duration-300 ease-in-out"
      />

      <div className="border-b-2 w-full border-dnr-green"></div>

      <div className="flex justify-between w-full items-center">
        {/* <div className="text-dnr-blue flex space-x-2 items-center">
          <ShoppingCartIcon className="w-6 h-6" />
          <p className="font-semibold text-sm">Kategori Beras</p>
        </div> */}
        <p className="text-base leading-4 text-dnr-dark-turqoise font-semibold tracking-wide">Diskon Sampai Dengan</p>

        <div className="flex text-dnr-dark-green space-x-2 items-center">
          <p>
            <span className="font-semibold text-4xl">20</span>
            <sup className="text-xl">%</sup>
          </p>
        </div>
      </div>
    </div>
  )
}
