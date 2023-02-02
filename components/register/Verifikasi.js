import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useMutation } from 'react-query'
import Router, { useRouter } from 'next/router'
import useCountdown from 'hooks/useCountdown'

import { Input } from '@/components/base'
import { Button } from '@/components/button'

import { fetchAuthPost, fetchAuthGet } from 'helpers/fetch'
import { authenticatedUser } from 'helpers/isAuthenticated'

function Timer({ onResendEmail }) {
  const { minutes, seconds, padStart, restart } = useCountdown(2, 'minutes')

  return (
    <>
      {minutes !== 0 || seconds !== 0 ? (
        <p className="text-gray-500 text-sm leading-6">
          Kirim ulang kode verifikasi,{' '}
          <span className="text-dnr-dark-turqoise">
            {padStart(minutes)}:{padStart(seconds)}
          </span>
        </p>
      ) : (
        <p
          className="text-blue-500 text-sm leading-6 underline cursor-pointer"
          onClick={() => {
            restart()
            onResendEmail()
          }}
        >
          Kirim ulang kode verifikasi,{' '}
        </p>
      )}
    </>
  )
}

export default function Verifikasi({ toForm, goToNext }) {
  const router = useRouter()
  const [error, setError] = useState(null)
  const { mutate: resendEmail } = useMutation('resend_email', (payload) =>
    fetchAuthPost('users/resend_email_verification', payload)
  )

  const { isLoading, mutate } = useMutation(
    'verification-token',
    (token) => fetchAuthPost('users/verified_email_token', { token }),
    {
      onSuccess(response) {
        localStorage.removeItem('need_verification')
        // goToNext()
        const user = JSON.parse(localStorage.user)
        user.is_email_verified = true
        localStorage.user = JSON.stringify(user, null, 2)
        localStorage.log_pass = true
        router.push('/')
        // localStorage.user = JSON.stringify(user, null, 2)
      },
      onError(error) {
        setError(error)
      },
    }
  )

  useEffect(() => {
    const confirmationMessage = 'Apakah anda yakin untuk meninggalkan halaman ini?'

    const beforeUnloadHandler = (e) => {
      ; (e || window.event).returnValue = confirmationMessage
      localStorage.removeItem('need_verification')
      return confirmationMessage // Gecko + Webkit, Safari, Chrome etc.
    }
    const beforeRouteHandler = (url) => {
      if (Router.pathname !== url && !confirm(confirmationMessage)) {
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`
      } else {
        localStorage.removeItem('need_verification')
      }
    }

    if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6) {
      window.addEventListener('beforeunload', beforeUnloadHandler)
      Router.events.on('routeChangeStart', beforeRouteHandler)
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
      Router.events.off('routeChangeStart', beforeRouteHandler)
    }
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
      Router.events.off('routeChangeStart', beforeRouteHandler)
    }
  }, [])

  // useEffect(() => {
  //   Router.events.on('routeChangeStart', (url, options) => {

  //     if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6) {
  //       const confirm = window.confirm('Apakah anda yakin untuk meninggalkan halaman ini?')

  //       if (confirm) {
  //         router.push(url)
  //       } else {
  //         return false
  //       }
  //     }
  //   })
  // }, [])

  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [input3, setInput3] = useState('')
  const [input4, setInput4] = useState('')
  const [input5, setInput5] = useState('')
  const [input6, setInput6] = useState('')

  function changeText(id, setState) {
    return function (text) {
      if (id) {
        document.getElementById(id).focus()
      }
      setState(text)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-500 text-sm leading-6">
        <span>Kami telah mengirimkan anda kode unik ke email anda </span>
        <span className="text-dnr-turqoise-dark">{authenticatedUser().email}</span>, untuk silahkan masukan kode
        verifikasi tersebut pada kolom dibawah ini.
      </p>
      {error ? <p className="text-red-500 text-sm leading-6">Kode verifikasi salah</p> : null}
      <div className="grid grid-rows-1 grid-cols-6 gap-4">
        <Input
          withLabel={false}
          id="no-1"
          onChange={changeText('no-2', setInput1)}
          background="bg-dnr-beige"
          border="border-dnr-beige"
          className="px-2 py-2 text-center shadow"
          maxLength={1}
          value={input1}
        />
        <Input
          withLabel={false}
          id="no-2"
          onChange={changeText('no-3', setInput2)}
          background="bg-dnr-beige"
          border="border-dnr-beige"
          className="px-2 py-2 shadow text-center"
          maxLength={1}
          value={input2}
        />
        <Input
          withLabel={false}
          id="no-3"
          onChange={changeText('no-4', setInput3)}
          background="bg-dnr-beige"
          border="border-dnr-beige"
          className="px-2 py-2 shadow text-center"
          maxLength={1}
          value={input3}
        />
        <Input
          withLabel={false}
          id="no-4"
          onChange={changeText('no-5', setInput4)}
          background="bg-dnr-beige"
          border="border-dnr-beige"
          className="px-2 py-2 shadow text-center"
          maxLength={1}
          value={input4}
        />
        <Input
          withLabel={false}
          id="no-5"
          onChange={changeText('no-6', setInput5)}
          background="bg-dnr-beige"
          border="border-dnr-beige"
          className="px-2 py-2 shadow text-center"
          maxLength={1}
          value={input5}
        />
        <Input
          withLabel={false}
          onChange={changeText('submit-button', setInput6)}
          id="no-6"
          background="bg-dnr-beige"
          border="border-dnr-beige"
          className="px-2 py-2 shadow text-center"
          maxLength={1}
          value={input6}
        />
      </div>

      <div className="flex justify-between items-center">
        <Timer onResendEmail={() => resendEmail({ email: authenticatedUser().email })} />
        <Button
          className="ml-auto"
          color="orange"
          type={isLoading ? Button.PROCESSING : ''}
          padding="py-2 px-8"
          id="submit-button"
          onClick={() => mutate(`${input1}${input2}${input3}${input4}${input5}${input6}`)}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
