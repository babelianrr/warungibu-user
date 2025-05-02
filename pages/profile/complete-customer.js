import { Card } from '@/components/base'
import { Button } from '@/components/button'
import IsVerifiedRoute from '@/components/HOC/IsVerifiedRoute'
import Image from 'next/image'
import SuccesImage from 'public/assets/success-image.png'

function CompleteCustomer() {

  return (
    <>
      <main className="bg-radial-primary">

        <section className="flex flex-col h-screen">
          {/*<Header />*/}
          <section className="max-w-md w-full self-center flex-1 flex items-center z-10">
            <section className="p-4 sm:p-0 w-full -mt-8">
              <div className="bg-white rounded-md shadow-custom pb-2">
                <Card className="w-full shadow-none">
                  <div className='w-full flex flex-row justify-center mt-5 mb-6'>
                    <Image src={SuccesImage}/>
                  </div>
                  <p className='text-center text-gray-400 text-base mt-8'>Pembuatan PIN transaksi</p>
                  <p className='text-center text-gray-400 text-base'>anda berhasil, selamat berbelanja</p>
                  <Button 
                    className="w-full font-normal text-sm mt-20" 
                    onClick={() => {}}
                  >
                    Mulai Belanja
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

export default IsVerifiedRoute(CompleteCustomer)
