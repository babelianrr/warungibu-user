import {useQuery} from 'react-query'
import {Card} from '@/components/base'
import MainLayout from '@/components/layouts/MainLayout'
import {UserDetail} from '@/components/profile'
import {ChevronRightIcon} from '@heroicons/react/outline'
import {fetchAuthGet} from 'helpers/fetch'
import {authenticatedUser} from 'helpers/isAuthenticated'

export default function Profile() {
  const {id: userId} = authenticatedUser()
  const {data, refetch} = useQuery(['users', userId], () => fetchAuthGet(`users/${userId}`), {
    retry: false,
  })

  return (
    <MainLayout backTo="/profile/mobile">
      <main className="mx-auto py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl">
        <h4 className=" text-lg text-dnr-light-turqoise tracking-wide mb-4">Informasi Data Diri</h4>

        <Card rounded="rounded-t-xl">
          <UserDetail user={data} refetch={refetch} />
        </Card>
      </main>
    </MainLayout>
  )
}
