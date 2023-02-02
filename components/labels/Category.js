import {ShoppingCartIcon} from '@heroicons/react/outline'
import Image from 'next/image'
import capitalCase from 'helpers/capitalCase'

export default function Category({url, label}) {
  return (
    <div className="border border-dnr-dark-turqoise text-dnr-dark-turqoise py-1.5 px-3 rounded-md font-light text-sm flex items-center space-x-2 cursor-pointer ">
      <img src={url} alt={'Over the counter'} className="w-5 h-5" />
      <span>{capitalCase(label)}</span>
    </div>
  )
}
