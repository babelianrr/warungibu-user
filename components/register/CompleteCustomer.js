import { Card, HorizontalDivider, Input } from '@/components/base'
import { Button } from '@/components/button'
import IsVerifiedRoute from '@/components/HOC/IsVerifiedRoute'
import { fetchPost } from 'helpers/fetch'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from 'public/assets/bicart-lg.png'
import SuccesImage from 'public/assets/success-image.png'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'

function CompleteCustomer() {
  const router = useRouter()

  function handleGoToHome() {
    const user = JSON.parse(localStorage.user)
    user.is_email_verified = true
    localStorage.user = JSON.stringify(user, null, 2)
    localStorage.log_pass = true
    router.push('/')
  }

  return (
    <>
      <div className="space-y-4">
        <Card className="w-full shadow-none">
          <div className='w-full flex flex-row justify-center mt-5 mb-6'>
            <Image src={SuccesImage} alt=""/>
          </div>
          {/* <p className='text-center text-gray-400 text-base mt-8'>Verifikasi</p> */}
          <p className='text-center text-gray-400 text-base'>Verifikasi anda berhasil, selamat berbelanja</p>
          <Button 
            className="w-full font-normal text-sm mt-20" 
            onClick={() => handleGoToHome()}
          >
            Mulai Belanja
          </Button>
        </Card>
      </div>        
    </>
  )
}

export default IsVerifiedRoute(CompleteCustomer)
