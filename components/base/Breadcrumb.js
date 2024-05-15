import {ChevronRightIcon} from '@heroicons/react/outline'
import {useRouter} from 'next/router'

export default function Breadcrumb({path}) {
  const router = useRouter()

  const filteredPath = path.filter(Boolean)

  function handleClick(path) {
    return function (e) {
      if (path.path) {
        router.push(path.path)
      }
    }
  }

  function lastItem(index) {
    return index === filteredPath.length - 1
  }

  return (
    <div className="flex space-x-1 text-gray-400 text-xs items-center font-light">
      {filteredPath.map((path, index) => (
        <span
          key={index}
          onClick={handleClick(path)}
          className={`cursor-pointer hover:underline ${lastItem(index) ? 'font-normal text-black' : null}`}
        >
          {typeof path === 'string' ? path : path.name}
          {!lastItem(index) ? <ChevronRightIcon className="w-3.5 h-3.5 -mt-0.5 ml-0.5 inline" /> : null}
        </span>
      ))}
    </div>
  )
}
