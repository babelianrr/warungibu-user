import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'

import { Card } from '@/components/base'
import { Layout, FormInformation, FormOutlet, FormLicense, Verifikasi, CreateAddress } from '@/components/register'

import { authenticatedUser } from 'helpers/isAuthenticated'
import { fetchAuthPost } from 'helpers/fetch'

export default function InclompleteCustomerRegister() {
  const { mutate } = useMutation('resend_email', (payload) => fetchAuthPost('users/resend_email_verification', payload))

  const incompleteCustomerStep = [
    {
      id: 1,
      label: 'Informasi Data Diri',
      Component: FormInformation,
    },
    {
      id: 2,
      label: 'Verifikasi',
      Component: Verifikasi,
    },
    {
      id: 3,
      label: 'Informasi Outlet',
      Component: FormOutlet,
    },
    {
      id: 4,
      label: 'Perijinan Outlet',
      Component: FormLicense,
    },
    {
      id: 5,
      label: 'Alamat Outlet',
      Component: CreateAddress,
    },
  ]

  // const startStep = typeof window !== 'undefined' && localStorage.need_verification ? 1 : 0
  const startStep = typeof window !== 'undefined' && localStorage.need_verification ? 1 : typeof window !== 'undefined' && localStorage.need_step_3 ? 2 : 0
  const [stepNumber, setStepNumber] = useState(startStep)
  // const [stepNumber, setStepNumber] = useState(4)
  const [step, setStep] = useState(() => incompleteCustomerStep[stepNumber])

  useEffect(() => {
    if (startStep === 1) {
      // user that didn't finish the registration flow will trigger resend email verification
      mutate({ email: authenticatedUser().email })
    }
  }, [])

  // if (!localStorage.test) {
  //   // setStepNumber(2)
  // }

  return (
    <Layout>
      <section className="p-4 w-full sm:max-w-xl self-center flex-1 flex z-10">
        <div className="w-full">
          <div className="flex justify-between cursor-pointer">
            <h4 className="text-dnr-turqoise text-lg  mb-2 tracking-wide">{step.label}</h4>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <Card className="w-full mb-11">
              <step.Component
                goToNext={() => {
                  const nextStep = stepNumber + 1
                  setStepNumber(nextStep)
                  setStep(incompleteCustomerStep[nextStep])
                }}
                goTo={(step) => {
                  setStepNumber(step)
                  setStep(incompleteCustomerStep[step])
                }}
              />
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  )
}
