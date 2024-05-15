import {useRouter} from 'next/router'
import {Button} from '@/components/button'
import {Layout} from '@/components/register'
import {Card} from '@/components/base'
import IsVerifiedRoute from '@/components/HOC/IsVerifiedRoute'

function Register() {
  const router = useRouter()

  return (
    <Layout>
      <section className="p-4 w-full sm:max-w-xl self-center flex-1 flex z-10 text-blue-500">
        <div className="w-full">
          <h4 className="mb-3 text-dnr-turqoise text-lg  tracking-wide">Jenis Pengguna</h4>
          <Card>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
              <Button
                className="flex-1"
                color="orange"
                type="border"
                // type="disabled"
                onClick={() => router.push('/register/new-customer')}
              >
                Pengguna Baru
              </Button>
              <Button
                className="flex-1"
                color="orange"
                type="border"
                onClick={() => router.push('/register/existing-customer')}
              >
                Pengguna lama
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  )
}

export default IsVerifiedRoute(Register)
