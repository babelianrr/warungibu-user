import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
import {CalendarIcon, UserIcon, PencilIcon} from '@heroicons/react/outline'
import {Button} from '../../button'
import {Modal, Input, SelectInput, HorizontalDivider, TextArea} from '../../base'
import {authenticatedUser} from 'helpers/isAuthenticated'
import {fetchAuthPostFormData} from 'helpers/fetch'

export default function UpDateUserModal({open, setOpen, onSuccess}) {
  const router = useRouter()
  const user = authenticatedUser()

  const [photo_url, setPhotoUrl] = useState(user.photo_url)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone_number, setPhoneNumber] = useState(user.phone_number ? user.phone_number.slice(3) : '')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isError, setIsError] = useState(false)
  const [photoError, setPhotoError] = useState('')

  useEffect(() => {
    if (name && email && phone_number && !isError) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [name, email, phone_number])

  // const [ktp, setKtp] = useState(user.ktp)
  // const [gender, setGender] = useState('')
  // const [birthdate, setBirthdate] = useState(user.birthdate)
  // const [user_address, setUserAddress] = useState(user.user_address)
  // const genderOption = [
  //   {id: 1, value: 'Pria'},
  //   {id: 2, value: 'Wanita'},
  // ]

  // function onChangeKtp(value) {
  //   value = value
  //     .slice(0, 22)
  //     .split('')
  //     .filter((char) => char !== '-')
  //     .join('')
  //   const template = '__-__-__-__-__-__-____'.split('')
  //   let result = ''
  //   let count = 0

  //   for (let i = 0; i < value.length; i++) {
  //     if (template[count] !== '-') {
  //       result += value[i]
  //       count++
  //     } else {
  //       result += '-'
  //       count++
  //       i--
  //     }
  //   }
  //   setKtp(result)
  //   return result
  // }

  const {isLoading, mutate, error} = useMutation((form) => fetchAuthPostFormData(`users/id`, form, 'PATCH'), {
    onSuccess(response) {
      localStorage.user = JSON.stringify(response, null, 2)
      setOpen(false)
      // router.push('/profile')
      onSuccess()
    },
    onError(err) {
    },
  })

  const {mutate: uploadPhoto, isLoading: uploadLoading} = useMutation(
    'add-user-photo',
    (payload) => fetchAuthPostFormData(`users/profile_picture/upload`, payload, 'PATCH'),
    {
      onSuccess(response) {
        localStorage.user = JSON.stringify(response, null, 2)
        setPhotoUrl(response.photo_url)
      },
    }
  )

  function getImageWidthAndHeight(file) {
    return new Promise((resolve) => {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        const image = new Image()
        image.onload = function () {
          resolve({
            width: this.width,
            height: this.height,
          })
        }
        image.src = e.target.result
      }

      fileReader.readAsDataURL(file)
    })
  }

  async function handleFile(e) {
    setPhotoError('')
    const file = e.target.files[0]
    const fileSize = file.size / 1024 / 1024 // in MiB
    if (fileSize >= 1) {
      setPhotoError('Batas Maksimal size file adalah 1MB')
      return
    }

    const {width, height} = await getImageWidthAndHeight(file)

    if (width > 1000 || height > 1000) {
      setPhotoError('Resolusi maksimal photo adalah 1000px x 1000px')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    uploadPhoto(formData)
  }

  function handleNameChange(value) {
    if (value.length <= 50) {
      setName(value)
    }
    // return value
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    if (name && email && phone_number && !isError) {
      let form = new FormData()
      form.append('name', name)
      form.append('email', email)
      form.append('phone_number', `+62${phone_number}`)
      // form.append('ktp', ktp)
      // form.append('birthdate', birthdate)
      // form.append('gender', gender)
      // form.append('user_address', user_address)
      mutate(form)
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Ubah Data Diri
        </Modal.Title>
        <HorizontalDivider />
        <div className="mt-4">
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 relative flex items-center justify-center bg-dnr-blue-light rounded-full">
                {photo_url ? (
                  <img
                    className="w-16 h-16 rounded-full object-cover items-center"
                    src={process.env.NEXT_PUBLIC_URL + photo_url}
                  />
                ) : (
                  <UserIcon className="w-8 h-8 text-gray-500" />
                )}

                <div className="absolute top-1/3 -right-2">
                  <div className="bg-dnr-turqoise rounded-full w-5 h-5 flex items-center justify-center">
                    <label htmlFor="upload-photo" className="cursor-pointer">
                      <input
                        type="file"
                        id="upload-photo"
                        className="hidden"
                        accept="image/png, image/jpeg"
                        onChange={handleFile}
                      />
                      <PencilIcon className="w-3 h-3 text-white" />
                    </label>
                  </div>
                </div>
              </div>
              <p className="text-xs leading-4  text-gray-500">Unggah Foto Diri Anda</p>
            </div>
            {photoError ? <p className="text-xs leading-4  text-red-500">{photoError}</p> : null}
            <Input
              id="name"
              label="Nama*"
              type="text"
              defaultValue={name}
              value={name}
              onChange={handleNameChange}
              validation={{
                required: {value: true, message: 'Nama harus diisi'},
                maxLengthValidation: {value: true, max: 50, message: 'Max 12 Karakter'},
              }}
              isError={setIsError}
            />
            <Input
              id="email"
              label="Email*"
              type="email"
              defaultValue={email}
              onChange={setEmail}
              disabled
              validation={{
                required: {value: true, message: 'Email harus diisi'},
                emailValidation: {value: true, message: 'Format harus email'},
              }}
              isError={setIsError}
            />
            <Input
              id="phone-number"
              label="Nomor Handphone*"
              prefix="+62"
              defaultValue={phone_number}
              onChange={setPhoneNumber}
              validation={{
                required: {value: true, message: 'No.Handphone harus diisi'},
                phoneValidation: {value: true, message: 'Format No.Handphone tidak valid'},
              }}
              isError={setIsError}
            />
            {/* <Input
              id="ktp-no"
              label="Nomor KTP*"
              placeholder="__-__-__-__-__-__-____"
              defaultValue={ktp}
              onChange={onChangeKtp}
              autoComplete="off"
            /> */}

            {/* <Input
              id="date-of-birth"
              label="Tanggal Lahir*"
              type="date"
              prefix={<CalendarIcon className="w-4 h-4" />}
              defaultValue={birthdate}
              onChange={setBirthdate}
            /> */}
            {/* <div className="relative">
              <SelectInput
                defaultValue={genderOption.find((item) => item.value === gender)}
                data={genderOption}
                placeholder="Jenis Kelamin"
                id="gender"
                label="Jenis Kelamin*"
                onChange={(item) => setGender(item.value)}
              />
            </div> */}
            {/* <TextArea id="address" label="Alamat Lengkap" defaultValue={user_address} onChange={setUserAddress} /> */}

            <Button className="ml-auto px-8" type={isLoading ? 'processing' : isDisabled ? 'disabled' : 'submit'}>
              Simpan
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
