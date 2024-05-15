import currencyConverter from 'helpers/currencyConverter'
import { fetchAuthGet } from 'helpers/fetch'
import formatNumberToK from 'helpers/formatNumberToK'
import { authenticatedUser } from 'helpers/isAuthenticated'
import numberConverter from 'helpers/numberConverter'
import Image from 'next/image'
import BicartCoin from 'public/assets/bicart-coin.png'
import { useQuery } from 'react-query'

export default function BicartPoint({loanLimit}) {
    
    return(
        <div className="py-2 px-4 rounded-md">
            <div className="bg-wi-blue p-3 rounded-md flex items-center">
                <div className="bg-white p-2 rounded-md w-32 mr-4">
                    <p className="text-xs">Warung Ibu Point:</p>
                    <div className='flex'>
                        <div className='w-4 h-4 mr-1 mt-1'>
                            <Image src={BicartCoin} alt="bicart coin" />
                        </div>
                        <p>{numberConverter(loanLimit)}</p>
                    </div>
                </div>
                <h2 className='text-xl text-white font-light'>Selamat Datang di Warung Ibu!</h2>
            </div>
        </div>
    )
}