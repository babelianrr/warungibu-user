import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import NavLink from '@/components/base/NavLink'
import {BellIcon, ChevronDoubleRightIcon} from '@heroicons/react/outline'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {format} from 'date-fns'
import {useRouter} from 'next/router'

import {generateStatusInformation} from '@/components/profile/transaction/OrderCard'

import {fetchAuthGet, fetchAuthPost} from 'helpers/fetch'
import {classNames} from 'helpers/classNames'

export function NotificationCard({color = 'border-gray-300', opacity = 'opacity-30', notification}) {
  function generateHref(notification) {
    if (notification.order) {
      return `/profile/transaksi/detail?state=${generateStatusInformation(notification.order)}&order_id=${
        notification.order.id
      }`
    }

    return ''
  }
  return (
    <NavLink href={generateHref(notification)}>
      <div className="px-1">
        <div className="text-gray-500 flex items-center text-xs space-x-2 mb-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Informasi</span>
          {/* <span>01/01/2021 - 15:35</span> */}
          <span>
            {notification.created_at ? format(new Date(notification.created_at), 'dd/MM/yyyy - kk:mm') : null}
          </span>
        </div>
        <div className="text-gray-900 text-sm leading-5">
          <p className="mb-1">{notification.message}</p>
          {notification.order ? (
            <p className="text-gray-700 text-xs font-light">No. Transaksi {notification.order.transaction_number}</p>
          ) : null}
        </div>
        <hr className={`my-3 ${color} ${opacity}`} />
      </div>
    </NavLink>
  )
}

export default function Notification() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const {data = [], isLoading} = useQuery('notification-header', () => fetchAuthGet(`notifications?limit=${5}`))
  const {mutate} = useMutation('seen-notification', (id) => fetchAuthPost(`notifications/${id}`, {}, 'PATCH'), {
    onSuccess() {
      const notification = queryClient.getQueryData('notification-header')
      const newNotification = notification.map((data) => ({...data, seen: true}))
      queryClient.setQueryData('notification-header', () => newNotification)
    },
  })
  const unseenNotification = data.filter((notification) => !notification.seen)

  function seenNotification() {
    unseenNotification.forEach((notification) => {
      mutate(notification.id)
    })
  }

  function seenNotificationMobile() {
    unseenNotification.forEach((notification) => {
      mutate(notification.id)
    })

    router.push('/notifikasi')
  }

  return (
    <>
      <Popover className="relative hidden sm:block" onClick={seenNotification}>
        <Popover.Button
          className={classNames(
            unseenNotification.length === 0
              ? 'border border-gray-300  text-gray-500 cursor-pointer'
              : 'bg-wi-blue text-white',
            `py-2 px-3 rounded-md flex items-center hover:bg-dnr-turqoise hover:text-white transition-colors ease-in-out relative`
          )}
        >
          {unseenNotification.length !== 0 ? (
            <div className="bg-dnr-dark-orange w-4 h-4 flex items-center justify-center rounded-full -top-1.5 -right-1 absolute text-xs text-white"></div>
          ) : null}
          <img
            className={`icon-custom notif-icon ${unseenNotification.length !== 0 ? 'filter-icon' : ''}`}
            src="/assets/notif.svg"
            alt="notif"
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel>
            {({close}) => (
              <div className="bg-white absolute mb-2 w-72 p-4 rounded-lg shadow z-50">
                <h4 className="font-medium text-base mb-1">Notifikasi</h4>
                <hr className="mb-4" />

                {isLoading ? (
                  <p className="py-4 text-base">Sedang memproses data</p>
                ) : data.length === 0 ? (
                  <p className="py-4 text-base">Belum ada Notifikasi</p>
                ) : (
                  <div>
                    {data.map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))}
                  </div>
                )}
                <NavLink href="/notifikasi">
                  <div className="flex justify-center items-center text-dnr-turqoise space-x-2 hover:underline cursor-pointer">
                    <span>Lihat Selengkapnya</span>
                    <ChevronDoubleRightIcon className="w-4 h-4" />
                  </div>
                </NavLink>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className="block sm:hidden" onClick={seenNotificationMobile}>
        <div className="relative">
          {unseenNotification.length !== 0 ? (
            <div className="bg-dnr-dark-orange w-4 h-4 flex items-center justify-center rounded-full -top-1.5 -right-1 absolute text-xs text-white"></div>
          ) : null}
          <img
            className="icon-custom notif-icon"
            src="/assets/notif.svg"
            alt="notif"
          />
        </div>
      </div>
    </>
  )
}
