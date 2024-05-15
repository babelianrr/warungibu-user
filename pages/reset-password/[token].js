import {useMutation} from 'react-query'
import {useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import ForgotPassword from 'public/assets/forgot_password.svg'
import {Card, Input} from '@/components/base'
import {Button} from '@/components/button'
import {Header} from '@/components/register'
import {fetchPost} from 'helpers/fetch'

export default function ResetPassword() {
  const router = useRouter()
  const [new_password, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')

  const {mutate, isLoading} = useMutation(
    'send-reset-password-email',
    () =>
      fetchPost(`users/forgot-password/${router.query.token}`, {new_password, confirmation_password: confirmPassword}),
    {
      onSuccess() {
        router.push('/login')
      },
      onError(res) {
        setError(res.message)
      },
    }
  )

  function onSubmit(e) {
    e.preventDefault()

    mutate()
  }

  return (
    <main className="bg-white">
      <svg className="fixed top-0 right-0" viewBox="0 0 1440 510.197">
        <defs>
          <linearGradient id="a" x1="0.5" y1="0.842" x2="0.219" y2="-0.279" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#96e5ff" />
            <stop offset="1" stopColor="#2394ba" />
          </linearGradient>
        </defs>
        <path
          d="M128.89,1445.369a434.65,434.65,0,0,0,62.874,43.817c169.823,97.226,420.05,83.275,604.126-23.625,154.088-89.485,217.87-218.658,398.25-256.5a558.984,558.984,0,0,1,74.249-10.125c134.424-8.616,241.243,35.85,300.5,66.83V1044.371h-1440Z"
          transform="translate(-128.89 -1044.371)"
          opacity="0.08"
          fill="url(#a)"
        />
      </svg>
      <svg viewBox="0 0 610.599 358" className="fixed bottom-0 right-0 h-1/2">
        <defs>
          <linearGradient id="a" x1="0.201" y1="1.235" x2="1.117" y2="0.225" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#96e5ff" />
            <stop offset="1" stopColor="#2394ba" />
          </linearGradient>
        </defs>
        <path
          d="M1566.391,1495.192c-153.732-3.139-237.77,41.523-286.4,84.236-52.125,45.781-62.509,88.387-128.039,151.624-69.106,66.689-143.538,102.278-196.032,121.984h610.6Z"
          transform="translate(-955.918 -1495.036)"
          opacity="0.08"
          fill="url(#a)"
        />
      </svg>

      <section className="flex flex-col h-screen">
        <Header />

        <section className="max-w-4xl w-full self-center flex-1 flex items-center mb-10 z-10">
          <section className="p-4 sm:p-0 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="hidden sm:block">
              <Image src={ForgotPassword} alt="DNR Logo" width={400} height={400} />

              <h4 className="text-dnr-turqoise text-sm">Level up your business</h4>
            </div>
            <div>
              <h4 className="text-dnr-turqoise text-lg  mb-2">Buat Password baru</h4>
              <p className="text-xs text-left text-gray-500 mb-4">Silahkan masukkan password baru untuk akun anda.</p>

              <Card className="w-full">
                <form className="space-y-4" onSubmit={onSubmit}>
                  <Input
                    id="new-password"
                    label="Kata Sandi Baru"
                    type="password"
                    onChange={setNewPassword}
                    error={new_password !== confirmPassword}
                    validation={{
                      minLengthValidation: {value: true, min: 8, message: 'Min 8 Karakter'},
                    }}
                    isError={setIsError}
                  />
                  <Input
                    id="confirm-new-password"
                    label="Konfirmasi Kata Sandi Baru"
                    type="password"
                    onChange={setConfirmPassword}
                    error={new_password !== confirmPassword}
                    isError={setIsError}
                  />
                  {error ? <p className="text-sm text-red-500">{error}</p> : null}
                  <Button
                    className=" w-full"
                    type={new_password !== confirmPassword ? 'disabled' : isLoading ? Button.PROCESSING : 'submit'}
                  >
                    Rubah Password
                  </Button>
                </form>
              </Card>
            </div>
          </section>
        </section>
      </section>
    </main>
  )
}
