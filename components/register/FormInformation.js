import { useEffect, useState } from 'react'
import { isError, useMutation } from 'react-query'
import { RadioGroup } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/outline'
import ReCAPTCHA from 'react-google-recaptcha'

import { Button } from '@/components/button'
import { InputLabel } from '@/components/labels'
import { SelectInput, Input } from '@/components/base'

import { fetchPost } from 'helpers/fetch'
import { classNames } from 'helpers/classNames'

const gender = ['laki-laki', 'perempuan']

export default function FormInformation({ goToNext, goTo }) {
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordSame, setIsPasswordSame] = useState(true)
  const [isPhoneNumber, setIsPhoneNumber] = useState(true)
  const [isEmailExist, setIsEmailExist] = useState(null)
  const [isHuman, setIsHuman] = useState(false)

  useEffect(() => {
    if (localStorage.name) {
      setName(localStorage.name)
    }
    if (localStorage.email) {
      setEmail(localStorage.email)
    }
  }, [])

  useEffect(() => {
    setIsEmailExist(null)
  }, [email])

  useEffect(() => {
    if (phone_number > 0 && (phone_number.length > 14 || phone_number.length < 10)) {
      setIsPhoneNumber(false)
    } else {
      setIsPhoneNumber(true)
    }
  }, [phone_number])

  const { isLoading, mutate, error } = useMutation((user) => fetchPost(`users/register`, user), {
    onSuccess(response) {
      localStorage.token = response.token
      localStorage.user = JSON.stringify(response.user, null, 2)

      if (response.user.login_provider === 'GOOGLE') {
        localStorage.removeItem('google_token')
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        goTo(2)
      } else {
        goToNext()
      }
    },
    onError(err) {
      if (err.errorCode === 'CAN_NOT_REGISTER') {
        setIsEmailExist(err.message)
      }
    },
  })

  async function handleRegisterUser(e) {
    e.preventDefault()

    if (password === confirmPassword) {
      setIsPasswordSame(true)
      mutate({
        name,
        email,
        phone_number: `+62${phone_number}`,
        password,
        gender: 'Male',
        birthdate: '2000-02-02',
        google_token: localStorage.google_token,
      })
    } else {
      setIsPasswordSame(false)
    }
  }

  function handleNameChange(value) {
    if (value.length <= 50) {
      setName(value)
    }
    return value
  }

  async function onChangeCaptcha(token) {
    const res = await fetch('/api/verifyCaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
    const data = await res.json()
    if (data.verify) {
      setIsHuman(true)
    }
  }

  return (
    <form onSubmit={handleRegisterUser} autoComplete="off">
      <div className="space-y-4 mb-4">
        <Input
          id="name"
          label="Nama"
          autoComplete="off"
          value={name}
          onChange={handleNameChange}
          required={true}
          validation={{
            required: { value: true, message: 'Nama harus diisi' },
            maxLengthValidation: { value: true, max: 50, message: 'Max 50 Karakter' },
          }}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={setEmail}
          required={true}
          error={isEmailExist}
          disabled={typeof window !== 'undefined' ? localStorage.google_token : false}
          validation={{
            required: { value: true, message: 'Email harus diisi' },
            emailValidation: { value: true, message: 'Format harus email' },
          }}
        />
        <Input
          id="phone-number"
          label="Nomor Handphoneff*"
          autoComplete="off"
          prefix="+62"
          value={phone_number}
          onChange={(value) => {
            if (value[0] !== '0') {
              setPhoneNumber(value)
            }
          }}
          required={true}
          maxLength={13}
          error={!isPhoneNumber && 'Nomor telephone terdiri dari 10-14 angka'}
          validation={{
            required: { value: true, message: 'Phone harus diisi' },
            phoneValidation: { value: true, message: 'Format No.Handphone tidak valid' },
          }}
        />

        <Input
          id="password"
          label="Kata Sandi"
          type="password"
          autoComplete="off"
          value={password}
          onChange={setPassword}
          required={true}
          error={!isPasswordSame}
          validation={{
            required: { value: true, message: 'Password harus diisi' },
            minLengthValidation: { value: true, min: 8, message: 'Min 8 Karakter' },
          }}
        />
        <Input
          id="confirm-password"
          label="Konfirmasi Kata Sandi"
          type="password"
          autoComplete="off"
          value={confirmPassword}
          onChange={setConfirmPassword}
          required={true}
          error={!isPasswordSame && 'password do not match'}
          validation={{
            required: { value: true, message: 'Confirm Password harus diisi' },
            minLengthValidation: { value: true, min: 8, message: 'Min 8 Karakter' },
          }}
        />
        {/* <Input
          id="date-of-birth"
          label="Tanggal Lahir*"
          type="date"
          prefix={<CalendarIcon className="w-4 h-4" />}
          value={birthdate}
          onChange={setBirthdate}
        /> */}

        {/* <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label>
            <InputLabel label="Jenis Kelamin" />
          </RadioGroup.Label>
          <div className="relative flex space-x-8 mt-2">
            {gender.map((gender) => (
              <RadioGroup.Option key={gender} value={gender} className={classNames('flex space-x-4 cursor-pointer')}>
                {({active, checked}) => (
                  <>
                    <div className="flex items-center text-sm">
                      <span
                        className={classNames(
                          checked ? 'bg-dnr-turqoise border-transparent' : 'bg-white border-dnr-turqoise',
                          active ? 'ring ring-offset-1 ring-dnr-tur' : '',
                          'h-4 w-4 rounded-full border flex items-center justify-center'
                        )}
                        aria-hidden="true"
                      >
                        <span className="rounded-full bg-white w-1.5 h-1.5" />
                      </span>
                      <RadioGroup.Label
                        as="span"
                        className={classNames(checked ? 'text-indigo-900' : 'text-gray-900', 'ml-3 font-medium')}
                      >
                        {gender}
                      </RadioGroup.Label>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup> */}
        <div className="flex justify-start">
          <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onChangeCaptcha} />
        </div>
        <div className="flex justify-between items-center">
          <Button className="ml-auto" type={!isHuman ? 'disabled' : isLoading ? 'processing' : 'submit'}>
            Simpan
          </Button>
        </div>
      </div>
    </form>
  )
}
