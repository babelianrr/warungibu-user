import MainLayout from '@/components/layouts/MainLayout'
import {Breadcrumb, Card} from '@/components/base'
import {NotificationCard} from '@/components/layouts/Notification'
import {useQuery} from 'react-query'
import {fetchAuthGet} from 'helpers/fetch'

export default function Notifikasi() {
  const {data, isLoading} = useQuery('notification-list', () => fetchAuthGet(`notifications`))

  return (
    <MainLayout>
      <main className="py-4 px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-gray-900">
        <section className="mb-4 hidden sm:block">
          <Breadcrumb path={[{name: 'Akun', path: '/profile'}, 'Notifikasi']} />
        </section>
        <section className={`w-full sm:w-5/12 mx-auto`}>
          <div className="mb-2">
            <h1 className="text-xl  text-gray-900">Halaman Notifikasi</h1>
          </div>
          <Card className="w-full mb-4 text-sm">
            {isLoading ? (
              <p className="py-4 text-base">Sedang memproses data</p>
            ) : data.length === 0 ? (
              <p className="py-4 text-base">Belum ada Notifikasi</p>
            ) : (
              <>
                {data.map((notification) => (
                  <NotificationCard key={notification.id} color="border-dnr-dark-orange" notification={notification} />
                ))}
              </>
            )}
          </Card>
        </section>
      </main>
    </MainLayout>
  )
}
