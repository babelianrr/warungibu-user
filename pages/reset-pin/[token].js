import { Card, HorizontalDivider, Input } from '@/components/base'
import { Button } from '@/components/button'
import IsVerifiedRoute from '@/components/HOC/IsVerifiedRoute'
import { fetchPost } from 'helpers/fetch'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from 'public/assets/bicart-lg.png'
import BackSpace from 'public/assets/back-space.png'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'

function CustomerPin() {
  const router = useRouter()
  const [hidden, setHidden] = useState(true)
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [pin3, setPin3] = useState('')
  const [pin4, setPin4] = useState('')
  const [pin5, setPin5] = useState('')
  const [pin6, setPin6] = useState('')

  function handleSubmitPin() {
    localStorage.pin = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`
    router.push(`/reset-pin/confirm/${router.query.token}`)
  }

  const handlePin = (number) => {
    if(pin1 === '') {setPin1(number)}
    else if(pin2 === '') {setPin2(number)}
    else if(pin3 === '') {setPin3(number)}
    else if(pin4 === '') {setPin4(number)}
    else if(pin5 === '') {setPin5(number)}
    else if(pin6 === '') {setPin6(number)}
  }

  const backSpace = () => {
    if(pin6 !== '') {setPin6('')}
    else if(pin5 !== '') {setPin5('')}
    else if(pin4 !== '') {setPin4('')}
    else if(pin3 !== '') {setPin3('')}
    else if(pin2 !== '') {setPin2('')}
    else if(pin1 !== '') {setPin1('')}
  }

  const Pin = ({number, hidden}) => {
    return (
      <>
        {
          hidden ?
            ( number !== '' ? <div className='w-4 h-4 rounded-full bg-gray-600'/> : <div className='w-4 h-4 rounded-full bg-gray-300'/>)
          :
          number !== '' ?
          <div className='text-gray-600 text-xl text-center'>{number}</div>
          :
          <div className='w-4 border border-gray-300 bg-gray-300'/>
        }
      </>
    )
  }

  const ButtonNumber = ({number, onClick}) => {
    return (
      <div className='border-2 border-wi-blue bg-gray-300 rounded-full w-14 h-14 flex justify-center items-center cursor-pointer' onClick={() => onClick(number)}>
        <span className='text-base text-wi-blue'>{number}</span>
      </div>
    )
  }



  return (
    <>
      <main className="bg-radial-primary">

        <section className="flex flex-col h-screen">
          {/*<Header />*/}
          <section className="max-w-md w-full self-center flex-1 flex items-center z-10">
            <section className="p-4 sm:p-0 w-full -mt-8">
              <div className="bg-white rounded-md shadow-custom pb-2">
                <div className="px-4 pt-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg -mt-0.5 font-medium">Masukan PIN Transaksi Baru</h4>
                  </div>
                  <HorizontalDivider className="border-2"  color="border-gray-600 bg-gray-600 mt-3 mb-2" />
                </div>
                <Card className="w-full shadow-none">
                  <div className='flex flex-row justify-center items-center mb-3 px-8'>
                    <div className='w-full flex flex-row items-center justify-between'>
                      {/* <div className='w-4 h-4 rounded-full bg-gray-300'/> */}
                      <Pin hidden={hidden} number={pin1}/>
                      <Pin hidden={hidden} number={pin2}/>
                      <Pin hidden={hidden} number={pin3}/>
                      <Pin hidden={hidden} number={pin4}/>
                      <Pin hidden={hidden} number={pin5}/>
                      <Pin hidden={hidden} number={pin6}/>
                    </div>
                  </div>
                  <div className='flex flex-row justify-center items-center my-6'>
                    <div className='px-4  border-2 border-wi-blue bg-gray-300 rounded-xl cursor-pointer' onClick={() => setHidden(!hidden)}>
                      <span className='text-sm text-wi-blue'>{hidden ? 'LIHAT' : 'SEMBUNYIKAN'}</span>
                    </div>
                  </div>
                  <div className='px-8 flex flex-row justify-between'>
                    <ButtonNumber number={1} onClick={(number) => handlePin(number)}/>
                    <ButtonNumber number={2} onClick={(number) => handlePin(number)}/>
                    <ButtonNumber number={3} onClick={(number) => handlePin(number)}/>
                  </div>
                  <div className='px-8 flex flex-row justify-between mt-5'>
                    <ButtonNumber number={4} onClick={(number) => handlePin(number)}/>
                    <ButtonNumber number={5} onClick={(number) => handlePin(number)}/>
                    <ButtonNumber number={6} onClick={(number) => handlePin(number)}/>
                  </div>
                  <div className='px-8 flex flex-row justify-between mt-5'>
                    <ButtonNumber number={7} onClick={(number) => handlePin(number)}/>
                    <ButtonNumber number={8} onClick={(number) => handlePin(number)}/>
                    <ButtonNumber number={9} onClick={(number) => handlePin(number)}/>
                  </div>
                  <div className='px-8 flex flex-row justify-between mt-5'>
                    <div className='w-14 h-14'/>
                    <ButtonNumber number={0} onClick={(number) => handlePin(number)}/>
                    <div className='border-2 border-wi-blue bg-gray-300 rounded-full w-14 h-14 flex justify-center items-center cursor-pointer' onClick={() => backSpace()}>
                      <Image src={BackSpace}/>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full font-normal text-sm mt-8" 
                    type={(pin1 && pin2 && pin3 && pin4 && pin5 && pin6) ? 'submit' : 'disabled'}
                    bg={(pin1 && pin2 && pin3 && pin4 && pin5 && pin6) ? 'bg-wi-blue' : 'bg-gray-300'}
                    onClick={() => handleSubmitPin()}
                  >
                    Berikutnya
                  </Button>
                </Card>
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  )
}

export default IsVerifiedRoute(CustomerPin)
