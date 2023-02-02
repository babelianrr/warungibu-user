import { useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { SearchIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  ShoppingCartIcon,
  UserIcon,
  ChevronDownIcon,
  HeartIcon,
  ViewGridIcon,
  ArrowLeftIcon,
  LogoutIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'

import { CartCountContext } from 'contexts/CartCountContext'
// import dnrLogo from './../../public/assets/dnr_logo.svg'
import dnrLogo from './../../public/assets/bicart-ic.png'
import dnrLogoWhite from './../../public/assets/dnr_logo_white.svg'
// import miniDnrLogoWhite from './../../public/assets/mini_dnr_logo_white.svg'
import miniDnrLogoWhite from './../../public/assets/bicart-logo.png'
import DnrCart from './../../public/assets/dnr-cart.png'

import Dropdown from '../base/Dropdown'
import HeaderBorderButton from '../button/HeaderBorderButton'
import NavLink from '@/components/base/NavLink'
import { HorizontalDivider } from '../base'
import Notification from './Notification'

import { authenticatedUser, isAuthenticated } from 'helpers/isAuthenticated'
import { classNames } from 'helpers/classNames'
import generateDummy from 'helpers/generateCategories'
import { fetchAuthGet } from 'helpers/fetch'

import { useCategories } from 'hooks/useCategories'

export function Button() {
  return (
    <Dropdown.Button className="bg-dnr-secondary-gray text-gray-400 font-normal py-2.5 px-4 focus:outline-none rounded-md leading-6 flex items-center space-x-3 text-xs">
      {/*<ViewGridIcon className="w-6 h-6" />*/}
      <img className="icon-custom" src="/assets/category.svg" />
      <span className="text-gray-700">Kategori</span>
      <ChevronDownIcon className="w-4 h-4 text-current text-dnr-dark-blue" />
    </Dropdown.Button>
  )
}

export function Items() {
  const { data: categories, isLoading: isLoadingCategory } = useCategories()

  return (
    <div className="py-1">
      {isLoadingCategory ? (
        <p className="py-4 text-gray-700 font-light text-center text-sm">Proses Pengambilan Data</p>
      ) : (
        <>
          {categories.map((category) => (
            <Dropdown.Item key={category.id}>
              {({ active }) => (
                <div className="px-2">
                  <Link href={category.url}>
                    <a
                      className={classNames(
                        active ? 'bg-dnr-secondary-gray text-gray-500' : 'text-gray-500',
                        'block text-sm py-1.5 px-3 rounded-lg font-light'
                      )}
                    >
                      {category.name}
                    </a>
                  </Link>
                </div>
              )}
            </Dropdown.Item>
          ))}
        </>
      )}
    </div>
  )
}

export function ProfileButton() {
  return (
    <Dropdown.Button className="border border-gray-300 py-2 px-3 rounded-md flex space-x-1 items-center text-gray-500 cursor-pointer hover:bg-dnr-turqoise hover:text-white transition-colors ease-in-out">
      {/*<UserCircleIcon className="h-5 w-5" aria-hidden="true" />*/}
      <img src="/assets/user.svg" className="icon-custom mr-0.5" alt="user" />
      <span className="font-normal">{authenticatedUser().name.split(' ')[0].substring(0, 12)}</span>
    </Dropdown.Button>
  )
}

export function ProfileNav() {
  const router = useRouter()
  const { setValue } = useContext(CartCountContext)

  function logoutUser() {
    localStorage.removeItem('google_token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('need_step_3')
    localStorage.removeItem('need_step_4')
    localStorage.removeItem('log_pass')
    setValue({ count: 0 })
    router.push('/login')
  }

  const nav = [
    { id: 1, url: '/profile', name: 'Akun Saya' },
    { id: 2, url: '/profile/transaksi', name: 'Transaksi' },
    { id: 3, url: '/profile/favorite', name: 'Favorit' },
    // {id: 4, url: '/profile/chat', name: 'Chat'},
  ]

  return (
    <div className="py-1">
      {nav.map((item) => (
        <Dropdown.Item key={item.id}>
          {({ active }) => (
            <div className="py-2 px-4 text-sm text-gray-500 hover:bg-dnr-secondary-gray hover:text-gray-700 cursor-pointer font-light">
              <Link href={item.url}>
                <a>{item.name}</a>
              </Link>
            </div>
          )}
        </Dropdown.Item>
      ))}
      <Dropdown.Item>
        {({ active }) => (
          <div
            className="py-2 px-4 text-sm text-gray-500 flex space-x-2 items-center group cursor-pointer hover:bg-dnr-secondary-gray hover:text-gray-700 font-light"
            onClick={logoutUser}
          >
            <LogoutIcon className="w-4 h-4" />
            <span>Keluar</span>
          </div>
        )}
      </Dropdown.Item>
    </div>
  )
}

function fetchCart() {
  return fetchAuthGet('carts').then((data) => data.map((item) => ({ ...item, selected: true })))
}

export default function Header({ backTo }) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const { value, setValue } = useContext(CartCountContext)
  const { data, isLoading } = useQuery('carts-count', () => fetchCart(), {
    onSuccess(response) {
      const count = response.reduce((total, item) => total + item.quantity, 0)
      setValue({ count })
    },
    retry: false,
    enabled: isAuthenticated(),
  })

  function searchItem(e) {
    e.preventDefault()
    router.push(`/categories/search?name=${searchValue}`)
    setSearchValue('')
  }

  return (
    <>
      <nav className="hidden sm:block bg-white px-4">
        <div className="flex items-center space-x-4 max-w-screen-xl mx-auto justify-between">
          <Link href="/">
            <a>
              <Image src={dnrLogo} alt="DNR Logo" className="cursor-pointer" width={65} height={65} />
            </a>
          </Link>

          <Dropdown
            className="relative"
            Button={Button}
            Items={Items}
            itemClassName="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white focus:outline-none z-20"
          />

          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <form action="/categories/search" onSubmit={searchItem}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full pr-10 sm:text-sm placeholder-gray-400 rounded-md py-2.5 px-4 bg-transparent border-gray-300 font-light outline-none focus:outline-none focus:bg-white focus:text-gray-600 focus:border-gray-600 force-focus"
                  placeholder="Cari Produk"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <img
                    className="icon-custom"
                    src="/assets/search.svg"
                    alt="search"
                    style={{ height: '16px', padding: '0px 2px' }}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="flex space-x-3 text-tiny">
            {isAuthenticated() ? <Notification /> : null}

            <HeaderBorderButton className="relative" onClick={() => router.push('/carts')}>
              {value.count !== 0 ? (
                <div className="bg-wi-blue w-5 h-5 flex items-center justify-center rounded-full -top-1.5 -right-1.5 absolute text-xs text-white">
                  <span>{value.count}</span>
                </div>
              ) : null}
              <img className="icon-custom" src="/assets/cart.svg" alt="cart" />
            </HeaderBorderButton>

            {isAuthenticated() ? (
              <Dropdown
                className="relative"
                Button={ProfileButton}
                Items={ProfileNav}
                itemClassName="origin-top-right absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-white focus:outline-none z-20"
              />
            ) : (
              <>
                <HeaderBorderButton onClick={() => router.push('/login')}>
                  <span className="font-normal">Masuk</span>
                </HeaderBorderButton>

                {/* <HeaderBorderButton onClick={() => router.push('/register')}>
                  <span className="font-normal">Daftar</span>
                </HeaderBorderButton> */}
              </>
            )}
          </div>
        </div>
      </nav>
      {/* bg-wi-blue */}
      <nav className="block sm:hidden w-screen px-3 py-1.5 pb-1" style={{backgroundColor: '#D9D9D9'}}>
        <div className="flex space-x-2 items-center">
          <Link href="/">
            <a className="mt-1">
              <Image src={miniDnrLogoWhite} alt="DNR Logo" className="cursor-pointer" width={36} height={36} />
            </a>
          </Link>
          <div className={` ${isAuthenticated() ? 'w-3/4' : 'w-full'} flex items-center space-x-4`}>
            {/*backTo ? (
              <NavLink href={backTo}>
                <ArrowLeftIcon className="w-4 h-4 text-white" />
              </NavLink>
            ) : null*/}

            <div className="relative rounded-md shadow-sm w-full">
              <form action="/categories/search" onSubmit={searchItem}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="border-transparent leading-none focus:border-grey-300 w-full block pr-10 sm:text-sm text-sm font-light bg-gray-100 rounded-md py-1.5 px-3 focus:bg-white"
                  placeholder="Cari Produk"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <img
                    className="icon-custom"
                    src="/assets/search.svg"
                    alt="search"
                    style={{ height: '15px', padding: '0px 2px' }}
                  />
                </div>
              </form>
            </div>
          </div>
          {isAuthenticated() ? (
            <div className="flex space-x-3 mobile-icon">
              {/*<NavLink href="/notifikasi">
                <Notification />
                </NavLink>
              */}
              <NavLink href="/carts">
                <div className="relative">
                  {value.count !== 0 ? (
                    <div className="bg-dnr-dark-orange w-5 h-5 flex items-center justify-center rounded-full -top-1.5 -right-1.5 absolute text-xs text-white mobile-count-cart">
                      <span>{value.count}</span>
                    </div>
                  ) : null}
                </div>
                {/*<ShoppingCartIcon className="w-8 h-8 text-white" />*/}
                <Image src={DnrCart} className='mt-2' alt="cart" width={26} height={28} />
                {/* <img className="icon-custom" src="/assets/cart.svg" alt="cart" /> */}
              </NavLink>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  )
}
