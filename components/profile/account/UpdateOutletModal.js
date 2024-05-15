import {useState, useEffect} from 'react'
import {useMutation} from 'react-query'
import {Modal, Input, SelectInput, HorizontalDivider} from '../../base'
import {Button} from '../../button'
import {authenticatedUser} from 'helpers/isAuthenticated'
import {fetchAuthPost} from 'helpers/fetch'

export default function UpdateOutletModal({open, setOpen, refetch, data, outletTypes}) {
  const outlet = authenticatedUser().outlets

  const [name, setName] = useState(data?.name ?? '')
  const [type, setType] = useState(data?.type ?? '')
  const [npwp, setNpwp] = useState(data?.npwp ?? '')
  const [telephone, setTelephone] = useState(data?.telephone ? data.telephone.slice(3) : '')
  const [mobile_phone, setMobilePhone] = useState(data?.mobile_phone ? data.mobile_phone.slice(3) : '')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (data) {
      setName(data.name)
      setType(data.type)
      setNpwp(data.npwp)
    }
  }, [data])

  useEffect(() => {
    if (name && type && npwp && !isError) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [name, type, npwp])

  const typeOption = [
    {id: 0, value: 'EXISTING_CUSTOMER'},
    ...outletTypes,
    // {id: 1, value: 'Pharmacy ( Apotik )'},
    // {id: 2, value: 'Drug Store'},
  ]

  function onChangeNpwp(value) {
    value = value
      .slice(0, 22)
      .split('')
      .filter((char) => char !== '-')
      .join('')
    const template = '__-___-___-_-_-___-___'.split('')
    let result = ''
    let count = 0

    for (let i = 0; i < value.length; i++) {
      if (template[count] !== '-') {
        result += value[i]
        count++
      } else {
        result += '-'
        count++
        i--
      }
    }
    setNpwp(result)
    return result
  }

  const {isLoading, mutate, error} = useMutation((body) => fetchAuthPost(`outlets/${data.id}`, body, 'PATCH'), {
    onSuccess(response) {
      const user = authenticatedUser()
      user.outlets = response
      localStorage.user = JSON.stringify(user, null, 2)

      refetch()
      setOpen(false)
      // router.push('/profile')
    },
    onError(err) {
    },
  })

  function handleChangeOutlet(e) {
    e.preventDefault()
    if (name && type && npwp && !isError) {
      mutate({
        name,
        type,
        npwp,
        mobile_phone: mobile_phone ? `+62${mobile_phone}` : '',
        telephone: telephone ? `021${telephone}` : '',
      })
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Ubah Informasi Outlet
        </Modal.Title>
        <HorizontalDivider />
        {data ? (
          <div className="mt-4">
            <form className="space-y-4" onSubmit={handleChangeOutlet}>
              <div className="relative">
                <SelectInput
                  data={typeOption}
                  placeholder="Jenis Outlet"
                  id="outlet"
                  label="Jenis Outlet*"
                  defaultValue={typeOption.find((item) => item.value === type)}
                  onChange={(item) => setType(item.value)}
                />
              </div>
              <Input
                id="name"
                label="Nama Outlet*"
                onChange={setName}
                defaultValue={name}
                validation={{
                  required: {value: true, message: 'Nama Outlet harus diisi'},
                }}
                isError={setIsError}
              />
              <Input
                id="npwp"
                label="No. NPWP*"
                placeholder="__-___-___-_-_-___-___"
                onChange={onChangeNpwp}
                defaultValue={npwp}
              />

              <Input
                id="phone-number"
                label="Nomor Telp Outlet"
                prefix="021"
                onChange={setTelephone}
                defaultValue={telephone}
              />
              <Input
                id="handphone-number"
                label="Nomor Handphone Outlet"
                prefix="+62"
                onChange={setMobilePhone}
                defaultValue={mobile_phone}
                validation={{
                  phoneValidation: {value: true, message: 'Format No.Handphone tidak valid'},
                }}
                isError={setIsError}
              />

              <Button className="ml-auto px-8" type={isLoading ? 'processing' : isDisabled ? 'disabled' : 'submit'}>
                Simpan
              </Button>
            </form>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}
