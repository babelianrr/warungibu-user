import Image from 'next/image'
import Link from 'next/link'
import {LocationMarkerIcon, MailIcon, PhoneIcon, ChevronRightIcon} from '@heroicons/react/outline'
// import dnrLogo from './../../public/assets/dnr_logo.svg'
import dnrLogo from './../../public/assets/bicart-ic.png'

export default function Footer() {
  return (
    <>
      <footer className="hidden sm:block">
        <section className="bg-white py-10">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <Image src={dnrLogo} alt="DNR Logo" width={72} height={72} />
              <span className="text-gray-900 text-base font-light leading-8 tracking-wide">Level up your business</span>
            </div>
            <div className="border-b border-gray-200 mb-8 h-1"></div>
            <div className="flex justify-between">
              <div className="space-y-3">
                <div className="flex items-start space-x-4 text-gray-500">
                  <LocationMarkerIcon className="w-5 h-5 svg-width-custom" />
                  <span className="text-sm font-light">
                    RUKO BARCELONA NO 32, 
                    <br /> 
                    Jl. Palem Raja Raya, Desa/Kelurahan Panunggangan Barat, 
                    <br /> 
                    Kec. Cibodas, Kota Tangerang, Provinsi Banten, Kode Pos: 15810
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-gray-500">
                  <MailIcon className="w-5 h-5 svg-width-custom" />
                  <span className="text-sm font-light">support@warungibu.co.id</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-500">
                  <PhoneIcon className="w-5 h-5 svg-width-custom" />
                  <span className="text-sm font-light">(021) - 2788-3900</span>
                </div>
              </div>
              <div className="flex-1 max-w-sm mx-auto grid grid-rows-1 grid-cols-2 gap-5">
                <div>
                  {/* <h3 className="text-base text-blue-100">dnrplusdotcom</h3> */}
                  <ul className="mb-4 space-y-4 text-sm text-gray-500 font-extralight">
                    <li>
                      <Link href="/news">
                        <a className="hover:underline">Berita</a>
                      </Link>
                    </li>
                    <li>
                      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}users/download_form`} className=" hover:text-blue-500">
                        Download Document Pendaftaran
                      </a>
                    </li>
                    <li>
                      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}users/download_apk`} className=" hover:text-blue-500">
                        Download Aplikasi
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <div>
                  <h3 className="text-base text-blue-100">Pembeli</h3>
                  <ul className="mt-4 space-y-4 text-sm text-blue-50 font-extralight">
                    <li>
                      <a href="#" className="hover:text-blue-500">
                        Cara Belanja
                      </a>
                    </li>
                    <li>
                      <a href="#" className=" hover:text-blue-500">
                        Syarat & Ketentuan
                      </a>
                    </li>
                    <li>
                      <a href="#" className=" hover:text-blue-500">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="text-gray-500 flex space-x-3">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-dnr-gray p-6">
          <p className="text-sm text-gray-500 text-center font-light">&copy; 2022 All rights reserved. BIG.</p>
        </section>
      </footer>

      <footer className="block sm:hidden bg-white pt-6 sm:pt-2">
        <section>
          {/* <ul className="p-4 divide-y divide-opacity-30 divide-dnr-dark-orange text-sm font-light text-gray-600 mb-6">
            <li className="flex justify-between py-4 px-2 text-gray-700 text-sm">
              <p>Tentang Kami</p>
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li className="flex justify-between py-4 px-2 text-gray-700 text-sm">
              <p>Keunggulan</p>
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li className="flex justify-between py-4 px-2 text-gray-700 text-sm">
              <p>Informasi</p>
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li className="flex justify-between py-4 px-2 text-gray-700 text-sm">
              <p>Kebijakan Privasi</p>
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li className="flex justify-between py-4 px-2 text-gray-700 text-sm">
              <p>Hubungi Kami</p>
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li className="flex justify-between py-4 px-2 text-gray-700 text-sm">
              <p>Cara Belanja</p>
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li className="flex justify-between py-4 px-2 text-gray-700 text-sm">
              <p>Syarat dan Ketentuan</p>
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li className="flex justify-between py-4 px-2 text-gray-700 text-sm">
              <p>FAQ</p>
              <ChevronRightIcon className="w-4 h-4" />
            </li>
          </ul> */}
          <section>
            <div className="flex justify-center space-x-3">
              <div className="w-8 h-8 rounded-full border border-dnr-dark-turqoise text-dnr-dark-turqoise flex items-center justify-center hover:bg-dnr-dark-turqoise hover:text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 15.136 15.556">
                  <g id="Group_2120" data-name="Group 2120">
                    <path
                      id="Path_10669"
                      data-name="Path 10669"
                      d="M1146.823,107.237h-6.25a4.449,4.449,0,0,0-4.444,4.443v6.669a4.449,4.449,0,0,0,4.444,4.443h6.25a4.448,4.448,0,0,0,4.443-4.443V111.68A4.448,4.448,0,0,0,1146.823,107.237Zm3.3,11.112a3.307,3.307,0,0,1-3.3,3.3h-6.25a3.308,3.308,0,0,1-3.3-3.3V111.68a3.308,3.308,0,0,1,3.3-3.3h6.25a3.307,3.307,0,0,1,3.3,3.3Z"
                      transform="translate(-1136.13 -107.237)"
                    />
                    <path
                      id="Path_10670"
                      data-name="Path 10670"
                      d="M1246.016,218.713a3.951,3.951,0,0,0-2.886,1.134,4.2,4.2,0,0,0-1.267,3,4.137,4.137,0,0,0,4.133,4.133,4.068,4.068,0,0,0,2.909-1.213,4.235,4.235,0,0,0,1.224-2.9,4,4,0,0,0-1.024-2.893A4.278,4.278,0,0,0,1246.016,218.713Zm2.72,4.117h0a2.74,2.74,0,1,1-5.48.015,2.8,2.8,0,0,1,.844-2,2.571,2.571,0,0,1,1.8-.742h.075a2.928,2.928,0,0,1,2.112.814A2.639,2.639,0,0,1,1248.736,222.831Z"
                      transform="translate(-1238.428 -215.089)"
                    />
                    <circle
                      id="Ellipse_986"
                      data-name="Ellipse 986"
                      cx="0.964"
                      cy="0.964"
                      r="0.964"
                      transform="translate(10.542 2.985) rotate(-22.5)"
                    />
                  </g>
                </svg>
              </div>

              <div className="w-8 h-8 rounded-full border border-dnr-dark-turqoise text-dnr-dark-turqoise flex items-center justify-center hover:bg-dnr-dark-turqoise hover:text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 6.558 14.113">
                  <path
                    id="Path_10665"
                    data-name="Path 10665"
                    d="M234.71,96.047h-2.233V94.582a.6.6,0,0,1,.621-.678h1.576V91.485l-2.17-.008a2.749,2.749,0,0,0-2.958,2.958v1.612h-1.393v2.492h1.393v7.052h2.932V98.538h1.977Z"
                    transform="translate(-228.152 -91.477)"
                  />
                </svg>
              </div>
            </div>
            <section className=" text-center p-6 mb-16">
              <p className="text-xs text-dnr-turqoise text-center font-light">&copy; 2022 All rights reserved. BIG.</p>
            </section>
          </section>
        </section>
      </footer>
    </>
  )
}
