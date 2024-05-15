import {useState} from 'react'
import {SelectInput, Input, HorizontalDivider} from '@/components/base'
import {CalendarIcon, LinkIcon, PlusIcon, ArrowLeftIcon} from '@heroicons/react/outline'
import {InputLabel} from '@/components/labels'
import {Button} from '@/components/button'
import {OutletLicense} from '@/components/profile'
import OutletLicenseMobile from '../profile/account/OutletLicenseMobile'

export default function FormLicense({goToNext, goToPrev, toFinish}) {
  const licenses = [
    {
      id: 1,
      value: 'SIUP',
    },
    {
      id: 2,
      value: 'TDP',
    },
    {
      id: 3,
      value: 'KTP Pemilik',
    },
    {
      id: 4,
      value: 'KTP AJP',
    },
    {
      id: 5,
      value: 'Izin Sarana',
    },
    {
      id: 6,
      value: 'SIKA/SIPA',
    },
    {
      id: 7,
      value: 'SIKTTK',
    },
    {
      id: 8,
      value: 'Specimen TTD',
    },
    {
      id: 9,
      value: 'FPP/KYC',
    },
  ]

  const [licenceField, setLicenseField] = useState([licenses])

  return (
    <>
      <div className="block sm:hidden">
        <OutletLicenseMobile onClick={goToNext} />
      </div>

      <div className="hidden sm:block">
        <OutletLicense onClick={goToNext} />
      </div>
    </>
  )
}
