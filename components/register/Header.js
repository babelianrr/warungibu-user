import Link from 'next/link'
import Image from 'next/image'
import dnrLogo from 'public/assets/dnr_logo.svg'
import Logo from 'public/assets/bicart-lg.png'

export default function Nav() {
  return (
    <nav className="flex justify-between items-center p-4 z-10">
      <Link href="/">
        <a>
          <Image src={Logo} alt="DNR Logo" width={65} height={65} />
        </a>
      </Link>
      <div className="flex space-x-3">
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
    </nav>
  )
}
