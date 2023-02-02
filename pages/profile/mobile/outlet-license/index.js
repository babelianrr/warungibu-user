import {Card} from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import {ChevronRightIcon} from '@heroicons/react/outline'
import OutletLicenseMobile from '@/components/profile/account/OutletLicenseMobile'
import OutletLicenseValidation from '@/components/profile/account/OutletLicenseValidation'

export default function Profile() {
  return (
    <MainLayout backTo="/profile/mobile">
      <main className="mx-auto py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl">
        <h4 className=" text-lg text-dnr-light-turqoise tracking-wide mb-4">Perijinan Outlet</h4>

        <Card rounded="rounded-t-xl">
          <OutletLicenseMobile />
        </Card>
      </main>
    </MainLayout>
  )
}
