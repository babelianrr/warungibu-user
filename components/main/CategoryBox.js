import Image from 'next/image'

export default function CategoryBox({url, name, label, icon}) {
  return (
    <div className="bg-white border w-full border-dnr-dark-orange py-4 px-8 flex space-x-4 items-center rounded-md shadow group-hover:border-dnr-dark-turqoise transition-colors duration-100 ease-out">
      <img src={url} alt={name} className="w-8 h-8" />
      <div className="flex space-x-4 h-full items-center">
        <div className=" h-full border border-dnr-dark-orange opacity-75"></div>
        <p className="leading-4 text-base text-center">{label}</p>
      </div>
    </div>
  )
  // Old Design
  // return (
  //   <>
  //     <div className="bg-white border border-dnr-dark-orange py-4 px-8 rounded-md shadow group-hover:border-dnr-dark-turqoise transition-colors duration-100 ease-out">
  //       <img src={url} alt={name} className="w-8 h-8" />
  //     </div>
  //     <p className="leading-4 text-sm font-light text-center">{label}</p>
  //   </>
  // )
}
