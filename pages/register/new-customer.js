import { useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/outline'
import { Card, HorizontalDivider } from '@/components/base'
import { Layout, FormInformation, FormOutlet, FormLicense, Verifikasi, CreateAddress } from '@/components/register'
import { fetchGet } from 'helpers/fetch'

export default function NewCustomerRegister({ outletTypes }) {
  const router = useRouter()
  const newCustomerStep = [
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
  const [stepNumber, setStepNumber] = useState(0)
  const [step, setStep] = useState(newCustomerStep[stepNumber])

  function toFinish() {
    router.push('/')
  }

  function goToNext() {
    const nextStep = stepNumber + 1
    setStepNumber(nextStep)
    setStep(newCustomerStep[nextStep])
  }

  const maxWidth = step.id === 4 ? 'p-4 w-full sm:max-w-4xl' : 'p-4 w-full sm:max-w-xl'

  return (
    <Layout>
      <section className={`${maxWidth} self-center flex-1 flex z-10`}>
        <div className="w-full">
          <div className="flex justify-between cursor-pointer">
            <h4 className="text-dnr-turqoise text-lg  mb-2">Daftar</h4>
            {step.id === 4 ? (
              <div className="text-sm text-gray-500 flex items-center space-x-2" onClick={goToNext}>
                <ArrowRightIcon className="w-4 h-4" />
                <span>Lewati</span>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <Card className="w-full mb-11">
              <h5 className="text-base tracking-wide  text-gray-900 text-center mb-4">{step.label}</h5>
              <NavProcessCard
                newCustomerStep={newCustomerStep}
                stepNumber={stepNumber}
                setStepNumber={setStepNumber}
                setStep={setStep}
              />
              <HorizontalDivider className="mb-4" />
              <step.Component
                toFinish={toFinish}
                goToNext={goToNext}
                goTo={(step) => {
                  setStepNumber(step)
                  setStep(newCustomerStep[step])
                }}
                goToPrev={() => {
                  const nextStep = stepNumber - 1
                  setStepNumber(nextStep)
                  setStep(newCustomerStep[nextStep])
                }}
                outletTypes={outletTypes}
              />
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function NavProcessCard({ newCustomerStep, stepNumber, setStepNumber, setStep }) {
  const moveStep = (index) => {
    setStepNumber(index)
    setStep(newCustomerStep[index])
  }

  return (
    <nav aria-label="Progress" className="flex justify-center mb-4">
      <ol role="list" className="flex items-center">
        {newCustomerStep.map((step, stepIdx) => (
          <li
            key={step.label + stepIdx}
            className={`relative ${stepIdx !== newCustomerStep.length - 1 && 'pr-8 sm:pr-20'}`}
          >
            {stepIdx < stepNumber ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-dnr-turqoise" />
                </div>
                <button
                  onClick={() => stepIdx < stepNumber && moveStep(step.id - 1)}
                  className="relative w-8 h-8 flex items-center justify-center bg-dnr-turqoise rounded-full hover:bg-dnr-dark-turqoise"
                >
                  <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.id}</span>
                </button>
              </>
            ) : stepIdx === stepNumber ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full border border-dashed border-gray-200" />
                </div>
                <button
                  onClick={() => stepIdx < stepNumber && moveStep(step.id - 1)}
                  className="relative w-8 h-8 flex items-center justify-center bg-white border-2  border-dnr-turqoise rounded-full"
                  aria-current="step"
                >
                  <span className="text-dnr-turqoise">{step.id}</span>
                </button>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full border border-dashed border-gray-200" />
                </div>
                <button
                  onClick={() => stepIdx < stepNumber && moveStep(step.id - 1)}
                  className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
                >
                  <span className="text-gray-300">{step.id}</span>
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export async function getStaticProps() {
  const outletTypes = await fetchGet('outlet_types')

  return {
    props: {
      outletTypes: outletTypes.map((outletType) => ({ ...outletType, value: outletType.name })),
    },
    revalidate: 10,
  }
}
