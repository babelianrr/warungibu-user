import {useState, useEffect} from 'react'
import {CalendarIcon, LinkIcon} from '@heroicons/react/outline'
import {useMutation} from 'react-query'

import {Modal, Input, SelectInput, HorizontalDivider} from '../../base'
import {Button} from '../../button'
import {InputLabel} from '@/components/labels'

import {fetchAuthPostFormData, fetchAuthPost} from 'helpers/fetch'

export default function EditOutletLicenseModal({open, setOpen, license, onSuccess}) {
  const [file, setFile] = useState(null)
  const [licenseNumber, setLicenseNumber] = useState(license?.file_no)
  const [licenseExpiredDate, setLicesenExpiredDate] = useState(license?.expired_date)
  const [error, setError] = useState(null)

  const [isDisabled, setIsDisabled] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (file && licenseNumber && licenseExpiredDate && !isError) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [file, licenseNumber, licenseExpiredDate])

  const {mutate: updateLicense, isLoading: updateLoading} = useMutation(
    'update-outlet-address',
    (payload) => fetchAuthPost(`outlet_docs/${license.id}`, payload, 'PATCH'),
    {
      onSettled() {
        setError(null)
        setFile(null)
      },
      onSuccess() {
        const formData = new FormData()
        formData.append('file', file)
        if (file) {
          uploadPhoto(formData)
        } else {
          onSuccess()
        }
      },
      onError(res) {
        setError('Silahkan mengisi customer ID anda terlebih dahulu')
      },
    }
  )

  const {mutate: uploadPhoto, isLoading: uploadLoading} = useMutation(
    'add-license-photo',
    (payload) => fetchAuthPostFormData(`outlet_docs/${license.id}/upload`, payload, 'PATCH'),
    {
      onSuccess() {
        setFile(null)
        onSuccess()
      },
    }
  )

  function handleFile(e) {
    setFile(e.target.files[0])
  }

  function handleCreateLicense(e) {
    e.preventDefault()

    updateLicense({
      name: license.name,
      expired_date: licenseExpiredDate || license.expired_date, // Pake date ga kedetect default valuenya
      file_no: licenseNumber,
    })
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Dokumen {license?.name}
        </Modal.Title>
        <HorizontalDivider />
        <div className="mt-4 text-left">
          <form onSubmit={handleCreateLicense}>
            <div className="overflow-x-scroll space-y-8 w-full">
              <div className="w-full space-y-4">
                <Input
                  id={'nomor'}
                  label={'Nomor'}
                  onChange={setLicenseNumber}
                  defaultValue={license?.file_no}
                  validation={{
                    required: {value: true, message: 'Nomor harus diisi'},
                  }}
                  isError={setIsError}
                />
                <div className="space-y-2">
                  <InputLabel id={'tanggal-berlaku'} label={'Tanggal Berlaku'} />
                  <Input
                    id="account-number"
                    placeholder="Tanggal Berlaku"
                    type="date"
                    withLabel={false}
                    width="w-full"
                    onChange={setLicesenExpiredDate}
                    defaultValue={license?.expired_date}
                    prefix={<CalendarIcon className="w-4 h-4" />}
                    validation={{
                      required: {value: true, message: 'Tanggal Berlaku harus diisi'},
                    }}
                    isError={setIsError}
                  />
                </div>
                <div className="space-y-2">
                  <InputLabel id={'attachment'} label={'Lampiran Dokumen'} />
                  <label htmlFor="upload-photo" className={`flex space-x-2 text-gray-400 text-sm items-center flex-1`}>
                    <input type="file" id="upload-photo" className="hidden" onChange={handleFile} />
                    <div className="border rounded-full border-gray-300 p-2">
                      <LinkIcon className="w-4 h-4" />
                    </div>
                    <span>{file ? file.name : 'Unggah Lampiran'}</span>
                  </label>
                </div>
              </div>
            </div>

            <Button
              className="ml-auto px-8"
              type={uploadLoading || updateLoading ? Button.PROCESSING : isDisabled ? 'disabled' : 'submit'}
            >
              Simpan
            </Button>
            {error ? <p className="text-red-500 text-sm mb-2">{error}</p> : null}
          </form>
        </div>
      </div>
    </Modal>
  )
}
