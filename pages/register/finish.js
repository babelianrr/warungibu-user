import Link from 'next/link'
import Image from 'next/image'
import {Layout} from '@/components/register'
import SuccessPeople from 'public/assets/success.svg'

export default function Finish() {
  return (
    <Layout finish={true}>
      <section className="max-w-md w-full self-center flex-1 flex items-center">
        <div className="text-center">
          <Image src={SuccessPeople} alt="DNR Logo" width={400} height={400} />
          <h4 className="text-dnr-dark-turqoise text-xl  mt-8">Pendaftaran Berhasil</h4>
          <p className="text-sm text-gray-700 mb-10">Selamat, proses pendaftaran anda telah berhasil.</p>
          <Link href="/">
            <a>
              <p className="relative z-10 text-sm text-dnr-dark-orange underline">Kembali ke Halaman Beranda</p>
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
