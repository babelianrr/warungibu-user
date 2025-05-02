import { Input, SelectInput } from "@/components/base"
import { Button } from "@/components/button"
import ProtectedRoute from "@/components/HOC/ProtectedRoute"
import MainLayout from "@/components/layouts/MainLayout"
import { fetchAuthGet, fetchAuthPost } from "helpers/fetch"
import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"

const TokenListrik = () => {
    const route = useRouter()
    const [errorMessage, setErrorMessage] = useState(false)
    const [productData, setProductData] = useState([])
    const [idPelanggan, setIdPelanggan] = useState('')
    const [selectedProduct, setSelectedProduct] = useState('')

    const {data, isLoading, refetch} = useQuery(['product'], () => fetchAuthGet(`ppob/PLN`), {
        onSuccess(response) {
            const products = response.data.map((product) => {
                return {
                    id:product.ppob_buyer_sku_code,
                    value:product.ppob_product_name,
                }
            })
            setProductData(products)
        },
        retry: false,
    })


    const {isLoading:isLoadingCheckout, mutate:mutateCheckout, error:errorCheckout} = useMutation(['detail-checkout'], (payload) => fetchAuthPost(`ppob/checkout`, payload), {
        onSuccess() {
            route.push(`/token-listrik/pembayaran/${selectedProduct.id}-${idPelanggan}`)
        },
        onError(){
            setErrorMessage('Pelanggan tidak ditemukan')
        },
        retry: false,
    })

    const checkout  = () => {
        // if(idPelanggan && selectedProduct){
        //     route.push(`/token-listrik/pembayaran/${selectedProduct.id}-${idPelanggan}`)
        // }
        mutateCheckout({
            customer_no: idPelanggan,
            buyer_sku_code: selectedProduct.id
        })
    }

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
                            disabled={true}
                            defaultValue={{id: 1, value: 'Token Listrik'}}
                            // onChange={(data) => setSelectedProvince(data)}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            id='meteran'
                            label="No. Meteran/ ID Pelanggan"
                            type="number"
                            onChange={setIdPelanggan}
                            defaultValue={idPelanggan}
                            validation={{
                            required: {value: true, message: 'No. Meteran/ ID Pelanggan Harus Diisi'},
                            }}
                        />
                        {
                            errorMessage && (
                                <p className="text-sm text-red-500 mt-3">{errorMessage}</p>
                            )
                        }
                    </div>
                    <div className="mb-4 relative">
                        <SelectInput
                            data={productData}
                            placeholder="Pilih Nominal"
                            id="nominal"
                            label="Nominal"
                            defaultValue={selectedProduct}
                            onChange={(data) => setSelectedProduct(data)}
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
                        <Button className={'w-full'} type={isLoadingCheckout ? 'disabled' : 'submit'} onClick={() => checkout()}>Lanjut</Button>
                    </div>
                </div>

            </section>
        
        </MainLayout>
    )
}

export default ProtectedRoute(TokenListrik)