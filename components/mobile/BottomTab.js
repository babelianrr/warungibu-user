import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {ChatIcon, RefreshIcon, HomeIcon, UserIcon, LoginIcon} from '@heroicons/react/outline'
import {Input} from '@/components/base'
import NavLink from '@/components/base/NavLink'

import {authenticatedUser, isAuthenticated} from 'helpers/isAuthenticated'

export default function BottomTab() {
  if (typeof window === 'undefined') {
    return null
  }
  return (
    <div className="fixed inset-x-0 bottom-0 bottom-menu-mobile">
      <div
        className={`bg-white text-dnr-light-gray w-full px-4 py-2 pt-3 border-2 shadow-lg border-white grid grid-rows-1 grid-flow-col items-center gap-6 cursor-pointer`}
      >
        <div className="space-y-1.5 flex flex-col justify-center items-center">
          <NavLink href="/">
            <img className="icon-custom-mobile mx-auto" src="/assets/mobile1.svg" />
            <p className="text-sm leading-4 font-light tracking-wide">Beranda</p>
          </NavLink>
        </div>
        {isAuthenticated() ? (
          <>
            <div className="space-y-1.5 flex flex-col justify-center items-center">
              <NavLink href="/notifikasi">
                <img className="icon-custom-mobile mx-auto" src="/assets/mobile7.svg" />
                <p className="text-sm leading-4 font-light tracking-wide">Notifikasi</p>
              </NavLink>
            </div>
            <div className="space-y-1.5 flex flex-col justify-center items-center">
              <NavLink href="/profile/transaksi">
                <img className="icon-custom-mobile mx-auto" src="/assets/mobile4.svg" />
                <p className="text-sm leading-4 font-light tracking-wide">Transaksi</p>
              </NavLink>
            </div>
            {/* <div className="space-y-1.5 flex flex-col justify-center items-center">
              <NavLink href="/profile/chat">
            <img className="icon-custom-mobile mx-auto" src="/assets/mobile5.svg" />
                <p className="text-sm leading-4 font-light tracking-wide">Chat</p>
              </NavLink>
            </div> */}
            <div className="space-y-1.5 flex flex-col justify-center items-center">
              <NavLink href="/profile/favorite">
                <img className="icon-custom-mobile mx-auto" src="/assets/mobile6.svg" />
                <p className="text-sm leading-4 font-light tracking-wide">Favorit</p>
              </NavLink>
            </div>
            <div className="space-y-1.5 flex flex-col justify-center items-center">
              <NavLink href="/profile/mobile">
                <img className="icon-custom-mobile mx-auto" src="/assets/mobile3.svg" />
                <p className="text-sm leading-4 font-light tracking-wide">Akun</p>
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-1.5 flex flex-col justify-center items-center">
              <NavLink href="/login">
                <img className="icon-custom-mobile mx-auto" src="/assets/mobile2.svg" />
                <p className="text-sm leading-4 font-light tracking-wide">Masuk</p>
              </NavLink>
            </div>
            {/* <div className="space-y-1.5 flex flex-col justify-center items-center">
              <NavLink href="/register">
                <img className="icon-custom-mobile mx-auto" src="/assets/mobile3.svg" />
                <p className="text-sm leading-4 font-light tracking-wide">Daftar</p>
              </NavLink>
            </div> */}
          </>
        )}
      </div>
    </div>
  )
}
