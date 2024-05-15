import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {StarIcon} from '@heroicons/react/solid'
import {ChevronRightIcon, ClockIcon} from '@heroicons/react/outline'
import addDays from 'date-fns/addDays'

import {Button, GrayBorderButton} from '@/components/button'
import {ConfirmationModal, Card, HorizontalDivider} from '@/components/base'
import {
  OrderStatus,
  OrderTrackingModal,
  AddReviewModal,
  BackendOrderStatus,
  ConfirmDeliveryModal,
} from '@/components/profile'
import NavLink from '@/components/base/NavLink'

import useCountdown from 'hooks/useCountdown'
import {classNames} from 'helpers/classNames'
import formatDate from 'helpers/formatDate'
import currencyConverter from 'helpers/currencyConverter'
import {generatePrice} from 'helpers/generatePrice'

export default function ThreeDs({url, setMessage}) {
    const iFrame = useRef()
    useEffect(() => {
    },[]);

  return (
    <iframe height="500" src={url} className="w-full" ref={iFrame}></iframe>
  )
}
