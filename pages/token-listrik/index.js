import { Input, SelectInput } from "@/components/base"
import { Button } from "@/components/button"
import ProtectedRoute from "@/components/HOC/ProtectedRoute"
import MainLayout from "@/components/layouts/MainLayout"
import { fetchAuthGet } from "helpers/fetch"
import { useRouter } from "next/router"
import { useState } from "react"
import { useQuery } from "react-query"

const TokenListrik = () => {
    const route = useRouter()

    const {data, isLoading, refetch} = useQuery(['product'], () => fetchAuthGet(`ppob?category=Pulsa`), {
        retry: false,
        // onSuccess(response) {
            // setProduct(response)
            // setStockInfo(response.branches[0])
        //   },
        //   enabled: Boolean(slug) 
    })

    console.log('data :', data)

    return (
        <MainLayout footer={false} bottomMenu={false} heightScreen={'min-h-full'} >
            <section className="px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
                <div className="bg-white py-3 px-5 flex flex-col mt-6 rounded-md shadow-sm w-full">
                    <div className="my-4">
                        <SelectInput
                            data={[{id: 1, value: 'Token Listrik'}]}
                            placeholder="Jenis Produk Listrik"
                            id="nominal"
                            label="Jenis Produk Listrik"
                            // defaultValue={selectedProvince}
                            // onChange={(data) => setSelectedProvince(data)}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            id='meteran'
                            label="No. Meteran/ ID Pelanggan"
                            // onChange={setLabel}
                            // defaultValue={label}
                            // validation={{
                            // required: {value: true, message: 'No. Meteran/ ID Pelanggan Harus Diisi'},
                            // }}
                        />
                    </div>
                    <div className="mb-4 relative">
                        <SelectInput
                            data={[{id: 1, value: 'Rp 50.000'}]}
                            placeholder="Pilih Nominal"
                            id="nominal"
                            label="Nominal"
                            // defaultValue={selectedProvince}
                            // onChange={(data) => setSelectedProvince(data)}
                        />
                    </div>
                    <div className="py-2 px-4 mb-5 rounded-md shadow-sm" style={{backgroundColor: '#EEE5C3', padding: '15px 30px'}}>
                        <ol className="list-decimal text-xs font-light">
                            <li>Transaksi Produk Listrik PLN yang dilakukan pukul 23:40 - 00:20 WIB akan <span className="font-semibold">mulai diproses pada pukul 00:20 WIB</span> Sesuai kebijakan pihak PLN</li>
                            <li>Proses verifikasi transaksi <span className="font-semibold">maksimal 2x24 jam hari kerja.</span></li>
                            <li>Harap <span className="font-semibold">cek limit kWh</span> anda sebelum membeli token listrik</li>
                        </ol>
                    </div>

                    <div className="mb-3">
                        <Button className={'w-full'} type={isLoading ? 'disabled' : 'submit'} onClick={() => route.push('/token-listrik/pembayaran')}>Lanjut</Button>
                    </div>
                </div>

            </section>
        
        </MainLayout>
    )
}

export default ProtectedRoute(TokenListrik)