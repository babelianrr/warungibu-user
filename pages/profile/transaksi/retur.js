import {useState} from 'react'
import {useRouter} from 'next/router'
import {LinkIcon} from '@heroicons/react/outline'
import MainLayout from '@/components/layouts/MainLayout'
import {Breadcrumb, Card, TextArea, Input, Counter, HorizontalDivider} from '@/components/base'
import {Button, GrayBorderButton} from '@/components/button'
import {
  OrderTrackingModal,
  ReturStatus,
  ReturStats,
  ProductInfo,
  SmallInformation,
  ExtraSmallInformation,
} from '@/components/profile'
import {InputLabel} from '@/components/labels'

function generateInfoBasedOnStatus(state) {
  const type = {
    [ReturStatus.waiting]: {
      Footer() {
        return (
          <div className="w-full">
            <Button className="w-full">Ajukan Retur</Button>
          </div>
        )
      },
    },
    [ReturStatus.confirmed]: {
      Footer() {
        return (
          <div className="w-full">
            <p className="text-sm text-gray-900 leading-6 mb-2 my-3">
              Pengajuan retur barang anda sudah kami proses dan sekarang tim kami sedang dalam tahap peninjauan untuk
              proses retur barang, dalam waktu 1x24 tim kami akan memberi konfirmasi.
            </p>
            <div className="py-4 px-2 rounded shadow w-full bg-gray-100 text-center">
              Status Pangajuan Retur Barang: <span className="font-semibold">Menunggu Konfirmasi</span>
            </div>
          </div>
        )
      },
    },
    [ReturStatus.rejected]: {
      Footer() {
        return (
          <div className="w-full">
            <ReturStats status="Ditolak" type="gray" />
            <HorizontalDivider className="mb-4" />

            <p className="text-sm text-gray-700 leading-6 mb-2">
              Pengajuan anda ditolak karena alasan dan lampiran foto/video anda tidak cukup bukti, karena kami telah
              melakukan quality control sebelum melakukan pengiriman.
            </p>

            <p className="text-sm text-gray-700 leading-6 mb-2">
              Bila anda ingin menanyakan hal lain, anda bisa menghubungi kami pada halaman
              <span className="text-dnr-dark-orange">“HUBUNGI KAMI”</span>
            </p>
          </div>
        )
      },
    },
    [ReturStatus.approved]: {
      Footer() {
        return (
          <div className="w-full">
            <ReturStats status="Disetujui" />
            <HorizontalDivider className="mb-4" />

            <SmallInformation>
              Pengajuan anda telah disetujui, mohon maaf atas ketidak nyaman ini, tim kami akan melakukan pickup barang
              yang ingin diretur sesuai alamat yang tertera pada detail transaksi.
            </SmallInformation>

            <h4 className="text-base text-gray-900 mb-2">Detail Barang Pesanan</h4>
            <HorizontalDivider className="mb-4" />

            <div className="space-y-4 divide-y divide-dnr-dark-orange divide-opacity-40 my-4">
              <ProductInfo />
            </div>

            <HorizontalDivider className="mb-4" />

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 tracking-wide text-sm">Jumlah barang yang akan diretur</span>
              <div className="flex space-x-6 items-center">
                <Counter />
              </div>
            </div>
            <HorizontalDivider className="mb-4" />
            <Button className="w-full mb-2">
              <div className="flex items-center space-x-4">
                <span>Ajukan Permintaan Pickup Barang</span>
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <div className="bg-white py-0.5 px-1.5 shadow rounded-md text-sm text-dnr-dark-orange">23</div>
                    <div className="mx-2 text-sm">:</div>
                    <div className="bg-white py-0.5 px-1.5 shadow rounded-md text-sm text-dnr-dark-orange">56</div>
                  </div>
                </div>
              </div>
            </Button>
            <ExtraSmallInformation>
              Segera ajukan permintaan pickup barang dalam kurun waktu 1x24 jam, agar tim kami segera memproses
              pengambilan barang yang akan di retur.
            </ExtraSmallInformation>
          </div>
        )
      },
    },
    [ReturStatus.canceled]: {
      Footer() {
        return (
          <div className="w-full">
            <ReturStats status="Disetujui" />
            <HorizontalDivider className="mb-4" />

            <SmallInformation>
              Pengajuan anda telah disetujui, mohon maaf atas ketidak nyaman ini, tim kami akan melakukan pickup barang
              yang ingin diretur sesuai alamat yang tertera pada detail transaksi.
            </SmallInformation>

            <h4 className="text-base text-gray-900 mb-2">Detail Barang Pesanan</h4>
            <HorizontalDivider className="mb-4" />

            <ProductInfo />

            <HorizontalDivider className="mb-4" />

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 tracking-wide text-sm">Jumlah barang yang akan diretur</span>
              <div className="text-dnr-dark-orange">4 pcs</div>
            </div>
            <HorizontalDivider className="mb-4" />
            <div className="py-4 px-2 rounded shadow w-full bg-gray-100 text-center mb-2 text-gray-500">Dibatalkan</div>
            <ExtraSmallInformation>
              Pengajuan anda telah dibatalkan, karena anda melebihi waktu untuk melakukan permintaan pickup barang yang
              telah kami tentukan yaitu 1x24 jam.
            </ExtraSmallInformation>
          </div>
        )
      },
    },
    [ReturStatus.waitingPickup]: {
      Footer() {
        return (
          <div className="w-full">
            <ReturStats status="Disetujui" />
            <HorizontalDivider className="mb-4" />

            <SmallInformation>
              Pengajuan anda telah disetujui, mohon maaf atas ketidak nyaman ini, tim kami akan melakukan pickup barang
              yang ingin diretur sesuai alamat yang tertera pada detail transaksi.
            </SmallInformation>

            <h4 className="text-base text-gray-900 mb-2">Detail Barang Pesanan</h4>
            <HorizontalDivider className="mb-4" />

            <ProductInfo />

            <HorizontalDivider className="mb-4" />

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 tracking-wide text-sm">Jumlah barang yang akan diretur</span>
              <div className="text-dnr-dark-orange">4 pcs</div>
            </div>
            <HorizontalDivider className="mb-4" />
            <div className="py-4 px-2 rounded shadow w-full bg-gray-100 text-center mb-2 text-gray-500">
              Menunggu Barang Di Pickup
            </div>
          </div>
        )
      },
    },
    [ReturStatus.pickedUp]: {
      Footer() {
        return (
          <div className="w-full">
            <ReturStats status="Disetujui" />
            <HorizontalDivider className="mb-4" />

            <SmallInformation>
              Pengajuan anda telah disetujui, mohon maaf atas ketidak nyaman ini, tim kami akan melakukan pickup barang
              yang ingin diretur sesuai alamat yang tertera pada detail transaksi.
            </SmallInformation>

            <h4 className="text-base text-gray-900 mb-2">Detail Barang Pesanan</h4>
            <HorizontalDivider className="mb-4" />

            <ProductInfo />

            <HorizontalDivider className="mb-4" />

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 tracking-wide text-sm">Jumlah barang yang akan diretur</span>
              <div className="text-dnr-dark-orange">4 pcs</div>
            </div>
            <HorizontalDivider className="mb-4" />
            <div className="py-4 px-2 rounded shadow w-full bg-gray-100 text-center mb-2 text-gray-500">
              Telah Dipickup
            </div>
            <ExtraSmallInformation className="block">
              Barang anda telah kami pickup, tunggu dalam waktu 2x24 jam kami mengikirimkan kembali barang kepada anda.
            </ExtraSmallInformation>

            <br />

            <ExtraSmallInformation>
              Bila anda ingin menanyakan hal lain, anda bisa menghubungi kami pada halaman
              <span className="text-dnr-dark-orange">“HUBUNGI KAMI”</span>
            </ExtraSmallInformation>
          </div>
        )
      },
    },
    [ReturStatus.returned]: {
      Footer() {
        const [openTracking, setOpenTracking] = useState(false)

        return (
          <div className="w-full">
            <OrderTrackingModal open={openTracking} setOpen={setOpenTracking} />
            <ReturStats status="Disetujui" />
            <HorizontalDivider className="mb-4" />

            <SmallInformation>
              Pengajuan anda telah disetujui, mohon maaf atas ketidak nyaman ini, tim kami akan melakukan pickup barang
              yang ingin diretur sesuai alamat yang tertera pada detail transaksi.
            </SmallInformation>

            <h4 className="text-base text-gray-900 mb-2">Detail Barang Pesanan</h4>
            <HorizontalDivider className="mb-4" />

            <ProductInfo />

            <HorizontalDivider className="mb-4" />

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 tracking-wide text-sm">Jumlah barang yang akan diretur</span>
              <div className="text-dnr-dark-orange">4 pcs</div>
            </div>
            <HorizontalDivider className="mb-4" />

            <div className="flex space-x-4 items-start">
              <div className="py-4 px-2 rounded shadow w-full flex-1 bg-gray-100 text-center mb-2 text-gray-500">
                Barang Sudah Dikirim Kembali
              </div>
              <GrayBorderButton className="w-1/3 py-4 px-2" display="block" onClick={() => setOpenTracking(true)}>
                Lacak
              </GrayBorderButton>
            </div>
            <ExtraSmallInformation>
              Barang anda telah kami pickup, tunggu dalam waktu 2x24 jam kami mengikirimkan kembali barang kepada anda.
            </ExtraSmallInformation>
            <br />
            <ExtraSmallInformation>
              Bila anda ingin menanyakan hal lain, anda bisa menghubungi kami pada halaman
              <span className="text-dnr-dark-orange">“HUBUNGI KAMI”</span>
            </ExtraSmallInformation>
          </div>
        )
      },
    },
    [ReturStatus.finished]: {
      Footer() {
        return (
          <div className="w-full">
            <ReturStats status="Disetujui" />
            <HorizontalDivider className="mb-4" />

            <SmallInformation>
              Pengajuan anda telah disetujui, mohon maaf atas ketidak nyaman ini, tim kami akan melakukan pickup barang
              yang ingin diretur sesuai alamat yang tertera pada detail transaksi.
            </SmallInformation>

            <h4 className="text-base text-gray-900 mb-2">Detail Barang Pesanan</h4>
            <HorizontalDivider className="mb-4" />

            <ProductInfo />

            <HorizontalDivider className="mb-4" />

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 tracking-wide text-sm">Jumlah barang yang akan diretur</span>
              <div className="text-dnr-dark-orange">4 pcs</div>
            </div>
            <HorizontalDivider className="mb-4" />
            <div className="py-4 px-2 rounded shadow w-full bg-gray-100 text-center mb-2 text-gray-500">Selesai</div>
          </div>
        )
      },
    },
  }

  return type[state]
}

export default function Retur() {
  const router = useRouter()
  const state = router.query.state || ReturStatus.waiting

  const {Footer} = generateInfoBasedOnStatus(state)

  return (
    <MainLayout>
      <main className="max-w-screen-xl mx-auto py-4 text-gray-900">
        <section className="mb-4">
          <Breadcrumb path={['Akun', 'Transaksi', 'Detail Transaksi']} />
        </section>

        <section className="w-5/12 mx-auto">
          <div className="mb-2">
            <h1 className="text-xl text-gray-900">Retur Barang</h1>
          </div>
          <Card className="w-full mb-4 text-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 tracking-wide text-sm font-semibold">Form Pengajuan Retur Barang</span>
              <div className="text-dnr-blue items-center">
                <span>No Transaksi: 123.455.678</span>
              </div>
            </div>
            <HorizontalDivider className="mb-4" />
            <div className="flex justify-between items-center mb-2">
              <TextArea
                id="reason"
                label="Tulis Alasan Anda?"
                defaultValue={state === ReturStatus.waiting ? '' : 'lorem ipsum dolor sit amet'}
                disabled={state !== ReturStatus.waiting}
              />
            </div>
            <HorizontalDivider className="mb-4" />
            <div className="mb-2">
              {state === ReturStatus.waiting ? (
                <Input
                  id="file"
                  label="Unggah foto atau video barang"
                  placeholder="Unggah foto dan video"
                  type="file"
                />
              ) : (
                <InputLabel id="file" label="Unggah foto atau video barang" />
              )}

              <div className="flex space-x-4 mt-4">
                <div className="flex items-center space-x-2 text-dnr-dark-turqoise">
                  <div className="w-6 h-6 rounded-full border border-dnr-dark-turqoise flex items-center justify-center">
                    <LinkIcon className="w-4 h-4 " />
                  </div>
                  <p>Images01.jpeg</p>
                </div>
                <div className="flex items-center space-x-2 text-dnr-dark-turqoise">
                  <div className="w-6 h-6 rounded-full border border-dnr-dark-turqoise flex items-center justify-center">
                    <LinkIcon className="w-4 h-4 " />
                  </div>
                  <p>Images01.jpeg</p>
                </div>
              </div>
            </div>
            <HorizontalDivider className="mb-4" />

            <Footer />
          </Card>
        </section>
      </main>
    </MainLayout>
  )
}
