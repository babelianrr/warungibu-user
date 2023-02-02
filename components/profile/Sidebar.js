import {UserIcon, ChevronRightIcon, HeartIcon, ChatIcon, ShoppingBagIcon, CogIcon} from '@heroicons/react/outline'
import Link from 'next/link'

export default function Sidebar({activeRoute}) {
  const paths = [
    {
      id: 1,
      label: 'Informasi',
      Icon: UserIcon,
      route: '/',
    },
    {
      id: 2,
      label: 'Transaksi',
      Icon: ShoppingBagIcon,
      route: '/transaksi',
    },
    {
      id: 3,
      label: 'Favorit Saya',
      Icon: HeartIcon,
      route: '/favorite',
    },
    // {
    //   id: 4,
    //   label: 'Chat',
    //   Icon: ChatIcon,
    //   route: '/chat',
    // },
    // {
    //   id: 5,
    //   label: 'Pengaturan',
    //   Icon: CogIcon,
    //   route: '/chat',
    // },
  ]

  return (
    <div className="hidden sm:block w-1/5">
      <ul className="list-none space-y-1.5">
        {paths.map((path) => (
          <li
            key={path.id}
            className={`flex justify-between items-center group ${
              path.route === activeRoute ? 'bg-white font-light shadow-custom2' : 'font-light'
            } hover:bg-white rounded-md cursor-pointer p-3`}
          >
            <Link href={`/profile${path.route}`} passHref>
              <a className="flex w-full justify-between">
                <div className="flex space-x-2 items-center">
                  <path.Icon className={`w-5 h-5 svg-width-custom -mt-0.5`} />
                  <span
                    className={`text-sm ${
                      path.route === activeRoute ? 'text-gray-900' : 'text-gray-700'
                    }  tracking-wide`}
                  >
                    {path.label}
                  </span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-300" />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
