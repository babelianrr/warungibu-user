import {useState} from 'react'
import {useMutation} from 'react-query'

import {Input, SelectInput, TextArea} from '@/components/base'
import {Button} from '@/components/button'

import {fetchAuthPost} from 'helpers/fetch'

export const citySelection = (provinceId) => {
  const table = {
    1: [
      {id: 1, value: 'Jakarta Timur'},
      {id: 2, value: 'Jakarta Selatan'},
      {id: 3, value: 'Jakarta Barat'},
      {id: 4, value: 'Jakarta Pusat'},
      {id: 5, value: 'Jakarta Utara'},
      {id: 6, value: 'Kepulauan Seribu'},
    ],
    2: [
      {id: 1, value: 'Bekasi'},
      {id: 2, value: 'Bogor'},
    ],
    3: [
      {id: 1, value: 'Tangerang'},
      {id: 2, value: 'Tangerang Selatan'},
    ],
  }

  return table[provinceId] || []
}

export default function NewAddress({onSuccess}) {
  const {mutate, isLoading} = useMutation('add-address', (payload) => fetchAuthPost('outlet_addresses', payload), {
    onSuccess,
  })
  const [label, setLabel] = useState('')
  const [receiver, setReceiver] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedProvince, setSelectedProvince] = useState({})
  const [selectedCity, setSelectedCity] = useState({})
  const [postalCode, setPostalCode] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  function hasEmptyField() {
    return !label || !receiver || !phone || !selectedProvince || !selectedCity || !postalCode || !address
  }

  const province = [
    {id: 1, value: 'DKI Jakarta'},
    {id: 2, value: 'Jawa Barat'},
    {id: 3, value: 'Banten'},
  ]

  function handleAddAddress(e) {
    e.preventDefault()

    mutate({
      full_address: address,
      city: selectedCity.value,
      province: selectedProvince.value,
      label,
      receiver_name: receiver,
      mobile_phone: phone,
      postal_code: Number(postalCode),
      notes,
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleAddAddress}>
      <Input
        id="label-rumah"
        label="Label Alamat*"
        onChange={setLabel}
        validation={{
          required: {value: true, message: 'Label harus diisi'},
        }}
      />
      <Input
        id="penerima"
        label="Nama Penerima*"
        onChange={setReceiver}
        validation={{
          required: {value: true, message: 'Nama Penerima harus diisi'},
        }}
      />
      <Input
        id="phone"
        label="Nomor Handphone*"
        prefix="+62"
        onChange={setPhone}
        validation={{
          required: {value: true, message: 'Nomor Handphone harus diisi'},
          phoneValidation: {value: true, message: 'Format No.Handphone tidak valid'},
        }}
      />
      <div className="relative">
        <SelectInput
          data={[...province]}
          placeholder="Pilih Provinsi"
          id="province"
          label="Provinsi*"
          onChange={(data) => setSelectedProvince(data)}
        />
      </div>
      <div className="relative">
        <SelectInput
          data={citySelection(selectedProvince.id)}
          placeholder="Pilih Kota"
          id="city"
          label="Kota*"
          disabled={!selectedProvince.id}
          onChange={(data) => setSelectedCity(data)}
        />
      </div>
      {/* <div className="relative">
        <SelectInput data={[...province]} placeholder="Pilih Kecamatan" id="kecamatan" label="Kecamatan*" disabled />
      </div>
      <div className="relative">
        <SelectInput data={[...province]} placeholder="Pilih Kelurahan" id="kelurahan" label="Kelurahan*" disabled />
      </div> */}

      <Input id="postalcode" label="Kode Pos" placeholder="Kode Pos Anda" onChange={setPostalCode} />

      <TextArea id="address" label="Alamat Lengkap" onChange={setAddress} />

      <Input id="extraNote" label="Catatan Tambahan" onChange={setNotes} />

      <Button className="ml-auto" type={isLoading ? Button.PROCESSING : hasEmptyField() ? 'disabled' : 'submit'}>
        Tambah Alamat
      </Button>
    </form>
  )
}
