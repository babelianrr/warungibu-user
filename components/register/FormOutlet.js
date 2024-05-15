import { useState } from 'react'
import { SelectInput, Input } from '@/components/base'
import { useMutation, useQuery } from 'react-query'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { Button } from '@/components/button'
import { fetchAuthPost, fetchGet } from 'helpers/fetch'

export default function FormOutlet({ goToNext, goToPrev, outletTypes, setError }) {
  const { mutate, isLoading } = useMutation('create-new-outlet', (payload) => fetchAuthPost('outlets', payload), {
    onSuccess: goToNext,
    onError: setError
  })

  const [name, setName] = useState('')
  const [npwp, setNpwp] = useState('')
  const [sameNpwp, setSameNpwp] = useState(false)
  const [selectedOutlet, setSelectedOutlet] = useState('')

  const phone = [
    { id: 1, value: '021' },
    { id: 2, value: '022' },
    { id: 3, value: '031' },
  ]

  function setError() {
    setSameNpwp(true)
  }

  function onChangeNpwp(value) {
    value = value
      .slice(0, 19)
      .split('')
      .filter((char) => char !== '.')
      .join('')

    let template = '__.___.___._.__.___'.split('')
    let result = ''
    let count = 0

    for (let i = 0; i < value.length; i++) {
      if (template[count] !== '.') {
        result += value[i]
        count++
      } else {
        result += '.'
        count++
        i--
      }
    }
    setNpwp(value)
    return result
  }

  return (
    <div className="space-y-4 mb-4">
      <div className="relative">
        <SelectInput
          onChange={setSelectedOutlet}
          data={outletTypes}
          placeholder="Pilih Jenis Outlet"
          id="outlet"
          label="Jenis Outlet*"
        />
      </div>

      <Input
        id="name"
        label="Nama Outlet"
        onChange={setName}
        required={true}
        validation={{
          required: { value: true, message: 'Nama Outlet harus diisi' },
        }}
      />

      <Input
        id="npwp"
        label="No NPWP"
        placeholder="__.___.___._.__.___"
        onChange={onChangeNpwp}
        autoComplete="off"
        required={true}
        validation={{
          required: { value: true, message: 'Nomor NPWP harus diisi' },
        }}
      />
      {sameNpwp ? <span className='text-sm text-red-600'>Nomor NPWP sudah terdaftar</span> : null}

      {/* <Input
        id="phone-number"
        label="Nomor Telephone*"
        PrefixComponent={() => {
          return (
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              <div className="relative">
                <SelectInput
                  data={phone}
                  placeholder="021"
                  id="outlet"
                  label="Jenis Outlet*"
                  noLabel
                  rounded="rounded-l-md"
                  background="bg-gray-50"
                  border=""
                />
              </div>
            </span>
          )
        }}
      /> */}

      {/* <Input id="handphone" label="Nomor Handphone*" prefix="+62" /> */}
      <div className="flex justify-between items-center">
        {/* <div className="text-sm text-gray-500 flex items-center space-x-2 cursor-pointer" onClick={goToPrev}>
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Kembali</span>
        </div> */}
        <Button
          className=" ml-auto"
          type={isLoading ? Button.PROCESSING : !name || !npwp || !selectedOutlet ? 'disabled' : 'submit'}
          onClick={() => {
            mutate({
              name,
              npwp,
              type: selectedOutlet.value,
              mobile_phone: '',
              telephone: '',
            })
          }}
        >
          Simpan
        </Button>
      </div>
    </div>
  )
}
