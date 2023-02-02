import {useState} from 'react'
import {useRouter} from 'next/router'
import {ReturStatus} from '@/components/profile'
import {Card, HorizontalDivider} from '../../base'
import {GrayBorderButton, Button} from '../../button'
import {OrderTrackingModal} from '@/components/profile'

function generateText(status) {
  switch (status) {
    case ReturStatus.waiting:
      return (
        <div className="text-dnr-dark-orange text-sm font-semibold leading-5 tracking-wide bg-dnr-blue-light px-4 py-2 rounded-md flex items-center">
          Menunggu Persetujuan
        </div>
      )
    case ReturStatus.rejected:
      return (
        <div className="text-gray-500 text-sm font-semibold leading-5 tracking-wide bg-dnr-blue-light px-4 py-2 rounded-md flex items-center">
          Ditolak
        </div>
      )
    case ReturStatus.canceled:
      return (
        <div className="text-gray-500 text-sm font-semibold leading-5 tracking-wide bg-dnr-blue-light px-4 py-2 rounded-md flex items-center">
          Dibatalkan
        </div>
      )
    case ReturStatus.confirmed:
    case ReturStatus.approved:
    case ReturStatus.waitingPickup:
    case ReturStatus.pickedUp:
    case ReturStatus.rejected:
      return (
        <div className="text-dnr-dark-turqoise text-sm font-semibold leading-5 tracking-wide bg-dnr-blue-light px-4 py-2 rounded-md flex items-center">
          Disetujui
        </div>
      )
    case ReturStatus.finished:
    case ReturStatus.returned:
      return (
        <div className="text-dnr-dark-turqoise text-sm font-semibold leading-5 tracking-wide bg-dnr-blue-light px-4 py-2 rounded-md flex items-center">
          {status}
        </div>
      )
    default:
      return (
        <div className="text-dnr-dark-orange text-sm font-semibold leading-5 tracking-wide bg-dnr-blue-light px-4 py-2 rounded-md flex items-center">
          {status}
        </div>
      )
  }
}

export default function ReturCard({status}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <Card className="text-gray-700">
      <OrderTrackingModal open={open} setOpen={setOpen} />
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-8">
          <div className="flex space-x-4 items-center">
            <p className="text-gray-500 text-xs leading-5 tracking-wide">Tanggal Pesanan</p>
            <p className="text-gray-900 text-xs leading-6 font-medium">01 Januari 2021</p>
          </div>
          <div className="flex space-x-4 items-center">
            <p className="text-gray-500 text-xs leading-5 tracking-wide">No Pesanan</p>
            <p className="text-gray-900 text-xs leading-6 font-medium">123456789.000.123</p>
          </div>
        </div>
        {generateText(status)}
      </div>
      <HorizontalDivider className="mb-4" />

      <div className="flex items-start pt-2 justify-between mb-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 items-center">
            <div className="border border-gray-300 p-1 rounded-md">
              <img
                className="w-10"
                src="https://www.watsons.co.id/medias/CDR-EFF-NEW-10S-TUB-22038.jpg?context=bWFzdGVyfGZyb250L3pvb218OTgzODZ8aW1hZ2UvanBlZ3xmcm9udC96b29tLzg5NjgzNDQ5MjgyODYuanBnfDgzZDJmZWUzN2EwY2FhNzFhMmY5MTEwZGM2NjRiYWUxOGI2MDM4YjVjNjI0YjNhN2U2ZTBhMWRmNTNiZjVhNDA"
                alt="CDR"
              />
            </div>
            <div>
              <h5 className="text-base text-gray-900">CDR (Calsium D Redoxon)</h5>
              <span className="text-xs text-gray-700">Rp 300.000 x 1 pcs</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-xs leading-5 text-right mb-1">Total Pembayaran</p>
          <p className="text-dnr-dark-orange text-lg text-right leading-5 tracking-wide">Rp 300.000</p>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <div className="flex space-x-4">
          <GrayBorderButton
            className="text-sm text-gray-500"
            padding="py-2.5 px-2.5"
            onClick={() => router.push(`/profile/transaksi/retur?state=${status}`)}
          >
            Lihat Detail Transaksi
          </GrayBorderButton>
          {status === ReturStatus.pickedUp ? (
            <Button color="turqoise" type="border" className="text-sm" onClick={() => setOpen(true)}>
              Lacak Pengiriman
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
