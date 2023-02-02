import {useState} from 'react'
import {useMutation} from 'react-query'

import {Input, SelectInput, TextArea} from '@/components/base'
import {Button} from '@/components/button'

import {fetchAuthPost} from 'helpers/fetch'
import {citySelection} from './NewAddress'
import {useEffect} from 'react'

export default function EditAddress({onSuccess, defaultAddress}) {
  const {mutate, isLoading} = useMutation(
    'update-address',
    (payload) => fetchAuthPost(`outlet_addresses/${defaultAddress.id}`, payload, 'PATCH'),
    {
      onSuccess,
    }
  )
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

  useEffect(() => {
    if (defaultAddress) {
      const selectedProvince = province.find((data) => data.value === defaultAddress.province)
      setLabel(defaultAddress.label)
      setReceiver(defaultAddress.receiver_name)
      setPhone(defaultAddress.mobile_phone)
      setPostalCode(defaultAddress.postal_code)
      setAddress(defaultAddress.full_address)
      setNotes(defaultAddress.notes)
      if (selectedProvince) {
        setSelectedProvince(selectedProvince)
        const cities = citySelection(selectedProvince.id)
        const city = cities.find((data) => data.value == defaultAddress.city)

        if (city) {
          setSelectedCity(city)
        }
      }
    }
  }, [defaultAddress])

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
        defaultValue={label}
        validation={{
          required: {value: true, message: 'Label harus diisi'},
        }}
      />
      <Input
        id="penerima"
        label="Nama Penerima*"
        onChange={setReceiver}
        defaultValue={receiver}
        validation={{
          required: {value: true, message: 'Nama Penerima harus diisi'},
        }}
      />
      <Input
        id="phone"
        label="Nomor Handphone*"
        prefix="+62"
        onChange={setPhone}
        defaultValue={phone}
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
          defaultValue={selectedProvince}
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
          defaultValue={selectedCity}
          onChange={(data) => setSelectedCity(data)}
        />
      </div>
      {/* <div className="relative">
        <SelectInput data={[...province]} placeholder="Pilih Kecamatan" id="kecamatan" label="Kecamatan*" disabled />
      </div>
      <div className="relative">
        <SelectInput data={[...province]} placeholder="Pilih Kelurahan" id="kelurahan" label="Kelurahan*" disabled />
      </div> */}

      <Input
        id="postalcode"
        label="Kode Pos"
        placeholder="Kode Pos Anda"
        onChange={setPostalCode}
        defaultValue={postalCode}
      />

      <TextArea id="address" label="Alamat Lengkap" onChange={setAddress} defaultValue={address} />

      <Input id="extraNote" label="Catatan Tambahan" onChange={setNotes} defaultValue={notes} />

      <Button className="ml-auto" type={isLoading ? Button.PROCESSING : hasEmptyField() ? 'disabled' : 'submit'}>
        Update Alamat
      </Button>
    </form>
  )
}
