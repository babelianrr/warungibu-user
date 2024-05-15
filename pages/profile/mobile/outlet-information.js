import {Card} from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import {OutletDetail} from '@/components/profile'
import {ChevronRightIcon} from '@heroicons/react/outline'

export default function Profile() {
  return (
    <MainLayout backTo="/profile/mobile">
      <main className="mx-auto py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl">
        <h4 className=" text-lg text-dnr-light-turqoise tracking-wide mb-4">Informasi Perusahaan</h4>

        <Card rounded="rounded-t-xl">
          <OutletDetail />
        </Card>
      </main>
    </MainLayout>
  )
}
