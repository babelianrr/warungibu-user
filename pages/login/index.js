import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import LoginIllustration from '/public/assets/login_illustration.svg'
import { HorizontalDivider, Card, Input } from '@/components/base'
import { Button } from '@/components/button'
import { Header } from '@/components/register'
import { GoogleLogin } from 'react-google-login'
import { fetchPost } from 'helpers/fetch'
import IsVerifiedRoute from '@/components/HOC/IsVerifiedRoute'
import dnrLogo from 'public/assets/dnr_logo.svg'
import Logo from 'public/assets/bicart-lg.png'

function Login() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true)

  const { isLoading, mutate, error } = useMutation((user) => fetchPost(`users/login`, user), {
    onSuccess(response) {
      localStorage.token = response.token
      localStorage.user = JSON.stringify(response.user, null, 2)

      // const user = JSON.parse(localStorage.user)
      // user.is_email_verified = true
      // localStorage.user = JSON.stringify(user, null, 2)
      // localStorage.log_pass = true

      // if (!response.user.is_email_verified) {
      if (response.user.role_status === 'BASIC_USER') {
        localStorage.need_verification = true
        router.push('/register/incomplete-customer')
      } 
      // else if (response.step_3 === false) {
      //   localStorage.need_step_3 = true
      //   router.push('/register/incomplete-customer')
      // } else if (response.step_4 === false) {
      //   localStorage.need_step_4 = true
      //   router.push('/register/incomplete-customer')
      // } 
      else {
        const user = JSON.parse(localStorage.user)
        user.is_email_verified = true
        localStorage.user = JSON.stringify(user, null, 2)
        localStorage.log_pass = true
        router.push('/')
      }

      // if (!response.user.is_email_verified) {
      //   localStorage.need_verification = true
      //   router.push('/register/existing-customer')
      // } else {
      //   router.push('/')
      // }

    },
    onError(err) {
      setIsDisabled(true)
      if (err.errorCode === 'CAN_NOT_LOGIN') {
        setErrorMessage('Phone/Password salah')
      } else if (err.error_code === 'API_VALIDATION_ERROR') {
        setErrorMessage('Data harus diisi')
      } else {
        setErrorMessage('Silahkan coba lagi nanti')
      }
    },
  })

  const { mutate: gMutate, error: gError } = useMutation((payload) => fetchPost(`users/login_google`, payload), {
    onSuccess(response) {
      if (response.token) {
        localStorage.token = response.token
        localStorage.user = JSON.stringify(response.user, null, 2)
        router.push('/')
      } else {
        router.push('/register')
      }
    },
  })

  function onSuccess(response) {
    localStorage.email = response.profileObj.email
    localStorage.name = response.profileObj.name
    localStorage.google_token = response.tokenId
    gMutate({ google_token: response.tokenId })
  }

  function handleLoginUser(e) {
    e.preventDefault()
    if (phone && password) {
      mutate({ phone_number:`+62${phone}`, password })
    }
  }

  useEffect(() => {
    if (phone !== '' && password !== '') {
      setIsDisabled(false)
    }
  }, [phone, password])

  return (
    <>
      <main className="bg-radial-primary">
        {/* <svg className="fixed top-0 right-0" viewBox="0 0 1440 510.197">
          <defs>
            <linearGradient id="a" x1="0.5" y1="0.842" x2="0.219" y2="-0.279" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#F09538" />
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
        </svg> */}

        <section className="flex flex-col h-screen">
          {/*<Header />*/}
          <section className="max-w-md w-full self-center flex-1 flex items-center z-10">
            <section className="p-4 sm:p-0 w-full -mt-8">
              <div className="mb-4">
                <Link href="/">
                  <a>
                    <Image src={Logo} alt="Wi Logo" width={65} height={65} />
                  </a>
                </Link>
              </div>
              <div className="bg-white rounded-md shadow-custom pb-2">
                <div className="px-4 pt-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg -mt-0.5 font-medium">Masuk</h4>
                    {/* <div>
                      <Link href="/register">
                        <a>
                          <span className="text-dnr-turqoise text-sm font-light cursor-pointer">Daftar</span>
                        </a>
                      </Link>
                    </div> */}
                  </div>
                  <HorizontalDivider className="border-dashed" color="bg-gray-400 mt-3 mb-2" />
                </div>
                <Card className="w-full shadow-none">
                  <form className="space-y-4" onSubmit={handleLoginUser}>
                    <Input
                      id="phone"
                      label="Phone"
                      type="text"
                      prefix="+62"
                      mediumLabel
                      value={phone}
                      onChange={setPhone}
                      error={error && errorMessage}
                      validation={{
                        required: { value: true, message: 'Phone harus diisi' },
                      }}
                    />
                    <Input
                      id="password"
                      label="Password"
                      type="password"
                      mediumLabel
                      value={password}
                      onChange={setPassword}
                      error={error && errorMessage}
                      validation={{
                        required: { value: true, message: 'Password harus diisi' },
                      }}
                    />
                    <Link href="/reset-password">
                      <a>
                        <p className="text-sm font-light text-right text-dnr-primary my-2">Lupa Password?</p>
                      </a>
                    </Link>
                    <Button className="w-full font-normal text-sm" type={isLoading ? 'processing' : isDisabled ? 'disabled' : 'submit'}>
                      Masuk
                    </Button>
                    {/* <p className="text-xs text-center text-dnr-turqoise">Atau</p>
                    <GoogleLogin
                      onSuccess={onSuccess}
                      clientId={'855428243828-4m20b7fo74qgis8ek4nm5k4r2l0dqkkp.apps.googleusercontent.com'}
                      buttonText="Masuk Dengan Google"
                      className="w-full justify-center mb-7 shadow-none btn-google-custom"
                      cookiePolicy={'single_host_origin'}
                    /> */}

                    {/* <Button className="bg-dnr-dark-orange w-full mb-4">Login Google</Button> */}
                    {/* <p className="text-sm text-center text-gray-400 font-light">
                      Belum punya akun?{' '}
                      <Link href="/register">
                        <a>
                          <span className="text-dnr-turqoise underline cursor-pointer">Daftar Disini</span>
                        </a>
                      </Link>
                    </p> */}
                  </form>
                </Card>
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  )
}

export default IsVerifiedRoute(Login)
