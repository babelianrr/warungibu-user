import {ExclamationCircleIcon, InformationCircleIcon} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useMutation } from 'react-query'
import {useRef} from 'react'
import Router, { useRouter } from 'next/router'
import useCountdown from 'hooks/useCountdown'

import { Input, Modal } from '@/components/base'
import { Button } from '@/components/button'

import { fetchAuthPost, fetchAuthGet } from 'helpers/fetch'
import { authenticatedUser } from 'helpers/isAuthenticated'
import { classNames } from 'helpers/classNames'

export default function VerifikasiPpob({ 
  open,
  setOpen,
  title,
  message,
  onConfirm,
  confirmLabel = 'Setuju',
  type = 'danger',
  processing, 
  toForm, 
  goToNext 
}) {
  const router = useRouter()
  const [error, setError] = useState(null)
  const cancelButtonRef = useRef(null)

  const colorScheme = {
    danger: {
      classes: 'bg-red-600 hover:bg-red-700',
      Icon: <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />,
      background: 'bg-red-100',
    },
    information: {
      classes: 'bg-wi-blue hover:bg-wi-blue',
      Icon: <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />,
      background: 'bg-blue-100',
    },
  }

  const {classes, Icon, background} = colorScheme[type]


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

  function reset() {
    setInput1('')
    setInput2('')
    setInput3('')
    setInput4('')
    setInput5('')
    setInput6('')
  }

  return (
    <Modal
      open={open}
      setOpen={(value) => {
        setOpen(value)
        reset()
      }}
      Button={() => (
        <>
          <button
            type="button"
            disabled={input1 && input2 && input3 && input4 && input5 && input6 ? false : true}
            className={classNames(
              'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm',
              processing || ((input1 && input2 && input3 && input4 && input5 && input6) == false) ? 'bg-gray-300 text-white cursor-not-allowed' : classes
            )}
            id="submit-button"
            onClick={() => {
              onConfirm(`${input1}${input2}${input3}${input4}${input5}${input6}`)
              setOpen(false)
              reset()
            }}
          >
            {processing ? 'Memproses Data' : confirmLabel}
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => {
              setOpen(false)
              reset()
            }}
            ref={cancelButtonRef}
          >
            Batalkan
          </button>
        </>
      )}
    >
      <div className="space-y-4">
        <p className="text-gray-500 text-sm leading-6">
          <span>Untuk melanjutkan transaksi, masukan pin anda pada kolom dibawah ini</span>
          {/* <span className="text-dnr-turqoise-dark">{authenticatedUser().email}</span>, untuk silahkan masukan kode
          Ppob tersebut pada kolom dibawah ini. */}
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
      </div>
    </Modal>
  )
}
