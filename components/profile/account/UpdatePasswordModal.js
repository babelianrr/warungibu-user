import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useMutation} from 'react-query'
import {Modal, Input, HorizontalDivider} from '../../base'
import {Button} from '../../button'
import {fetchAuthPost} from 'helpers/fetch'

export default function UpdatePasswordModal({open, setOpen}) {
  const router = useRouter()
  const [old_password, setOldPassword] = useState('')
  const [new_password, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordSame, setIsPasswordSame] = useState(true)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isError, setIsError] = useState(false)

  const {isLoading, mutate, error} = useMutation((body) => fetchAuthPost(`users/password/id`, body, 'PATCH'), {
    onSuccess(response) {
      setOpen(false)
      router.push('/profile')
    },
    onError(err) {
    },
  })

  useEffect(() => {
    if (old_password && new_password && confirmPassword && !isError) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [old_password, new_password, confirmPassword])

  function handleChangePassword(e) {
    e.preventDefault()
    if (old_password && new_password && confirmPassword && !isError) {
      if (new_password === confirmPassword) {
        setIsPasswordSame(true)
        mutate({new_password, old_password})
      } else {
        setIsPasswordSame(false)
      }
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="sm:mt-0 sm:w-full">
        <Modal.Title as="h3" className="text-xl leading-6 tracking-none text-gray-900 text-center mb-4 font-medium">
          Ubah Kata Sandi
        </Modal.Title>
        <HorizontalDivider />
        <div className="mt-4">
          <form className="space-y-4" onSubmit={handleChangePassword}>
            <Input
              id="old-password"
              label="Kata Sandi Lama"
              type="password"
              onChange={setOldPassword}
              error={error?.message}
              isError={setIsError}
            />
            <Input
              id="new-password"
              label="Kata Sandi Baru"
              type="password"
              onChange={setNewPassword}
              error={!isPasswordSame}
              validation={{
                minLengthValidation: {value: true, min: 8, message: 'Min 8 Karakter'},
              }}
              isError={setIsError}
            />
            <Input
              id="confirm-new-password"
              label="Konfirmasi Kata Sandi Baru"
              type="password"
              onChange={setConfirmPassword}
              error={!isPasswordSame}
              isError={setIsError}
            />

            <Button className="ml-auto px-8" type={isLoading ? 'processing' : isDisabled ? 'disabled' : 'submit'}>
              Simpan
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  )
}
