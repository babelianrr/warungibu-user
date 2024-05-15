import { Card, HorizontalDivider } from "@/components/base"
import { Button } from "@/components/button"
import ProtectedRoute from "@/components/HOC/ProtectedRoute"
import MainLayout from "@/components/layouts/MainLayout"
import { useState } from "react"
import LogoToken from 'public/assets/token-listrik.png'
import Download from 'public/assets/download.svg'
import Image from "next/image"

const DetailTransaksi = () => {
    const [isLoading, setLoading] = useState(false)

    const rincian = {
        image: LogoToken,
        name: 'Token Listrik',
        nominal: 'Rp50.000',
        price: 'Rp52.750',
        token: '7071 7401 0843 8224 9119'
    }

    return(
        <MainLayout footer={false} bottomMenu={false}>
            <section className="px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
                <div className="mt-6">
                    <h2 className="text-xl text-gray-900">Detail Transaksi</h2>
                </div>
                <Card className={'mt-2'}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 tracking-wide text-sm">Status Pesanan</span>
                        <div className="text-dnr-primary text-sm font-semibold leading-5 tracking-wide flex flex-row-reverse py-2 items-center">
                            Transaksi selesai
                        </div>
                    </div>
                    <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">No. Transaksi</span>
                        <div className="text-gray-900 font-semibold text-sm">AA0020</div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">No Meter</span>
                        <div className="text-gray-900 font-semibold text-sm">32129382918</div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Nama</span>
                        <div className="text-gray-900 font-semibold text-sm">
                            MR. FAIS***
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Tarif/Daya</span>
                        <div className="text-gray-900 font-semibold text-sm">
                            R1 /0000001300VA
                        </div>
                    </div>
                </Card>

                <Card className={'mt-2'}>
                    <p className="mb-4">Rincian Pesanan</p>
                    <Card className={'mb-6'}>
                        <div className="grid grid-cols-5 gap-4 items-center">
                            <Image src={LogoToken} />
                            <div className="col-span-3">
                                <p className="text-xs">{rincian.name}</p>
                                <p className="text-xs mb-4">{rincian.nominal}</p>
                                <p className="text-xs">Token: {rincian.token}</p>
                            </div>
                            <p className="text-xs font-semibold">{rincian.price}</p>
                        </div>
                    </Card>
                </Card>

                <Card className={'mt-2'}>
                    <p className="mb-4">Rincian Pesanan</p>
                    <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Total Belanja</span>
                        <div className="text-gray-900 font-semibold text-sm">Rp 52.750</div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 tracking-wide text-xs">Total Pembayaran</span>
                        <div className="text-gray-900 font-semibold text-sm">Rp 52.750</div>
                    </div>

                    <HorizontalDivider className="border-dashed mb-4" color="bg-gray-500" />

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <Button className={'w-full col-span-3'} type={isLoading ? 'disabled' : 'submit'}>Lihat Invoice</Button>
                        <Button className={'w-full'} bgHover={false} type={isLoading ? 'disabled' : 'border'}><Image src={Download} /></Button>
                    </div>
                </Card>
            </section>
        </MainLayout>
    )
}

export default ProtectedRoute(DetailTransaksi)